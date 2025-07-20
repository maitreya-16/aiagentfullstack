import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"
import ticketRoutes from "./routes/ticket.js"
import {serve} from "inngest/express"
import {inngest} from "./ingest/client.js"
import { onUserSignup } from "./ingest/functions/on-signup.js"
import { onTicketCreated } from "./ingest/functions/on-ticket-create.js"
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT||3000


app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoutes)
app.use("/api/ticket",ticketRoutes)

app.use("/app/ingest",
    serve({client:inngest,
        functions:[onUserSignup,onTicketCreated]
    }))

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to the DB!!")
        app.listen(PORT,()=>{
            console.log(`Server running at http://localhost:${PORT}`)
        })
    })
