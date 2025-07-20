import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Tickets = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [tickets, setTickets] = useState([])
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(typeof (user));
  useEffect(() => {
    const getAllTickets = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/ticket`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + token,
        },
      });
      const data = await res.json();
      console.log("Got this tickets", data)
      setTickets(data);
      setTicketSubmitted(false)
    }
    getAllTickets()

  }, [])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      console.log("frontend")
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/ticket/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (data) {
        setTickets([...tickets, data.ticket]);
        setTicketSubmitted(true);
        console.log("Request completed");
      }
    } catch (error) {
      // Handle fetch/network error
      console.error("Fetch error:", error.message);
    }
  };

  return (
    <>
      {user.role == 'user' &&
        <>
          <div className='font-bold text-4xl m-4'>Your Tickets</div>
          <form onSubmit={handleSubmit}>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input validator" placeholder="Type here" required />
              <p className="label validator-hint">Required</p>

            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea className="input validator textarea h-24" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
              <div className="label validator-hint">Required</div>
            </fieldset>
            <button className="btn btn-wide" type='submit'>Create Ticket</button>
          </form>
        </>}

      {user.role === 'moderator' && <div className='font-bold text-4xl m-4'>Tickets Assigned </div>}
      {user.role === 'admin' && <div className='font-bold text-4xl m-4'>Tickets</div>}

      <div>
        {tickets.map((ticket) => {
          let date = new Date(ticket.createdAt);
          return (
            <div onClick={() => { navigate(`/ticket/${ticket._id}`) }} key={ticket._id} className='flex flex-col gap-1.5 bg-gray-800 my-4 w-xl p-2'>
              <div className='text-xl font-bold'>{ticket.title}</div>
              <div className='text-sm'>{ticket.description}</div>
              <div className='text-xs text-gray-500'>Created At : {date.toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Tickets