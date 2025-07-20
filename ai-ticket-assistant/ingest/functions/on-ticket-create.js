import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js"
import User from "../..//models/user.js"
import { sendMail } from "../../utils/mailer.js";
import { NonRetriableError } from "inngest";
import analyzeTicket from "../../utils/ai.js"
export const onTicketCreated = inngest.createFunction(
    { id: "on-ticket-created", retries: 2 },
    { event: "ticket/created" },
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;
            console.log(ticketId);
            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId);
                if (!ticketObject) {
                    throw new NonRetriableError("Ticket not found")
                }
                return ticketObject
            })
            console.log(ticket);
            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, {
                    status: "Todo"
                })
            })
            const aiResponse = await analyzeTicket(ticket)
            console.log("Response : ",aiResponse)
            const relatedSkills = await step.run("ai-processing", async () => {
                let skills = [];
                if (aiResponse) {
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: !["low", "medium", "high"].includes(aiResponse.priority) ? "medium" : aiResponse.priority,
                        helpfulNotes: aiResponse.helpfulNotes,
                        status: "IN_PROGRESS",
                        relatedSkill: aiResponse.relatedSkills
                    })
                    skills = aiResponse.relatedSkills
                }
                return skills
            })
            const moderator = await step.run("assign-moderator", async () => {
                let user = await User.findOne({
                    role: "moderator",
                    skills: {
                        $elemMatch: {
                            $regex: relatedSkills.join("|"),
                            $options: "i"
                        }
                    }
                })
                if (!user) {
                    user = await User.findOne({
                        role: "admin"
                    })
                }
                await Ticket.findByIdAndUpdate(ticket._id, {
                    assignedTo: user?._id || null,
                    status:"done"
                })
                return user;
            })
            await step.run("send-email-notification",async()=>{
                if(moderator){
                    const finalTicket = await Ticket.findById(ticket._id);
                    await sendMail(moderator.email,"Ticket Assigned",`A new Ticket is assigned to you ${finalTicket.title}`)
                }
            })
            return {success:true};
        } catch (error) {
            console.error("Error running step");
            return {success:false};
        }
    }
)
