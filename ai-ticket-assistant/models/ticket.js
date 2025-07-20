import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    
    title:String,
    description:String,
    status:{type:String,default:"Todo",enum:["Todo","processing","assigned"]},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        default:null,
    },
    priority:String,
    deadline:Date,
    helpfulNotes:String,
    relatedSkill:[String],
},{timestamps:true})

export default mongoose.model("Ticket", ticketSchema); 