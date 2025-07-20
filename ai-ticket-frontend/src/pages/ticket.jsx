import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TicketDetailsPages = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [ticket, setTicket] = useState({})
  useEffect(() => {
    const getDetails = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/ticket/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + token,
        },
      });
      const newTicket = await res.json();
      setTicket(newTicket);
    }
    getDetails()
  }, [])
  return (
    <div className='border-2 border-white w-[50%] m-10 p-3 rounded-2xl'>
      <div className='border-b-2 p-3'>Title : {ticket.title}</div>
      <div className='border-b-2 p-3'>Description : {ticket.description}</div>
      <div>Status : {ticket.status}</div>
      <div className='font-bold'>Assigned To : {ticket?.assignedTo?.email || "Unassigned"}</div>
      <div>Priority : {ticket.priority}</div>
      <div className='bg-gray-800'>Helpful Notes : {ticket.helpfulNotes}</div>
    </div>
  )
}

export default TicketDetailsPages