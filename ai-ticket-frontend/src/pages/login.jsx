import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [form, setform] = useState({ email: "maitreyavaidyam@gmail.com", password: "" });
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoding(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      console.log(data);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
        const id = data.user._id;
        console.log("Hola login",id);
        navigate(`/`);
      }
      else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      alert("Login - Something went wrong", error);
    }
    finally {
      setLoding(false);
    }
  }

  if (!loading) {
    return (

      <div>
        <form onSubmit={handleSignup}>
          <div>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" value={form.email} onChange={e=>setform(form=>({...form,email:e.target.value}))}placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">Enter valid email address</div>
          </div>
          <div>

            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                // minLength="8"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={form.password}
                onChange={e=>setform(form=>({...form,password:e.target.value}))}
                autoComplete='on'
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
          </div>

          {/* <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Role</legend>
              <select className="select select-bordered validator" required>
                <option value="" disabled selected>
                  Select a Role
                </option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
            </fieldset>

            <p className="validator-hint text-red-500 text-sm mt-1">Required</p>
          </div> */}
          <button className="btn" type="submit">Submit form</button>
        </form>
      </div>)
  }
  return (
    <>
      <div className='flex h-screen w-full justify-center items-center'>
        <span className='text-3xl'>Loading..</span>
        <span className="loading loading-spinner loading-xl text-white"></span>
      </div>
    </>)
}

export default Login