import axios from 'axios'
import '../css/components/login.css'
import '../css/components/goal.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [text, setText] = useState('')
  const [goals, setGoal] = useState([]);

  const navigate = useNavigate();

  // get token from localStorage
  const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem('user'))
    const conf = {
      headers: {
        Authorization: `Bearer ${userToken.token}`
      }
    }

    return conf;
  }


  const API_GOALS = 'http://localhost:5000/api/goals/'

  // Post a goal
  const newGoal = async (goalData) => {
    try {
      await axios.post(API_GOALS, goalData, getToken());
      toast.success('You create your first goal successfully');
    } catch (error) {
      toast.error('Something went wrong, please wain a second')
    }
  }

  // Form
  const postGoal = (e) => {
    e.preventDefault()

    const goalData = {
      text
    }

    newGoal(goalData);
    setText('');
  }

  // Get all Goals
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      return navigate('/login')
    }

    const goals = async () => {
      try {
        const res = await axios.get(API_GOALS, getToken())
        setGoal(res.data)
      } catch (error) {
        toast.error('Something went wrong')
      }
    }

    goals()
  }, [navigate, text, goals])

  // DeleteGoal
  const deleteGoal = async (id) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('user'))
      const conf = {
        headers: {
          Authorization: `Bearer ${userToken.token}`
        }
      }
      await axios.delete(API_GOALS + id, conf)
      toast.success('Deleted successfully')
      location.replace(location.href)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <div className="container">
        <section className="formLogin">
            <div className="formLogin__logo">
            <h1 className="formLogin__title">Welcome</h1>
              <p className="formLogin__description">Goals Dashboard</p>
            </div>
            <div className="formLogin__container">
              <form onSubmit={postGoal} className="formLogin__form">
                <div className="formLogin__controller">
                  <input type="text" className="formLogin__controller__password" id="text" name="text" value={text} placeholder="Enter your goal" required onChange={(e) => setText(e.target.value)} autoComplete='off'/>
                  <p className="note"><span>Phrase:</span>The only thing that separates winners from the losers is discipline.</p>
                </div>
                <div className="formLogin__controller">
                    <button className="btn" type="submit">Submit</button>
                </div>
              </form>
            </div>
        </section>
        <section className="goal">
          <div className="goal__container">
            <ul className="goal__list">
              {
                goals.length > 0 ? (
                  goals.map((goal) =>
                    <li key={goal._id} className="goal__item">
                        {goal.text}
                        <button className='goal__item__close' onClick={() => deleteGoal(goal._id)}> x </button>
                    </li>
                  )
                ) : (
                    <p>There are not goals yet</p>
                )
              }
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage