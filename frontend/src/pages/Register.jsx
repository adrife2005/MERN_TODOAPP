import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import '../css/components/login.css'
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const API_URI = 'http://localhost:5000/api/users';

  const fetchUsers = async (newUser) => {
    try {
      const response = axios.post(API_URI, newUser)
      localStorage.setItem('user', JSON.stringify((await response).data))
      navigate('/')
      toast.success(`Welcome to the dashboard ${(await response).data.name}`)
    } catch (error) {
      toast.error('Put the correct information')
    }
  }

  const loginSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password
    }

    fetchUsers(newUser)
  }

  return (
    <>
      <div className="container">
        <section className="formLogin">
          <div className="formLogin__logo">
            <h1 className="formLogin__title">Register</h1>
            <p className="formLogin__description">Fill out all the fields with the correct information</p>
          </div>
          <div className="formLogin__container">
            <form onSubmit={loginSubmit} className="formLogin__form">
              <div className="formLogin__controller">
                <input type="text" className="formLogin__controller__name" id="name" name="name" value={name} placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} autoComplete="off"/>
              </div>
              <div className="formLogin__controller">
                <input type="email" className="formLogin__controller__email" id="email" name="email" value={email} placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
              </div>
              <div className="formLogin__controller">
                <input type="password" className="formLogin__controller__password" id="password" name="password" value={password} placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
                <p className="note"><span>Note:</span> If you already have an account you can Login <Link className="note__register" to='/login'>here</Link></p>
              </div>
              <div className="formLogin__controller">
                  <button className="btn " type="submit">Submit</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Register