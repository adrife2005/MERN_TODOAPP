import '../css/components/header.css'
import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem('user');
    navigate('/register')
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="header__logo">
            <Link to='/' className='header__title'>GoalSetter</Link>
          </div>
          <nav className='nav'>
            <ul className='nav__parent'>
              {
                user ? (
              <li className='nav__child'>
                <button className='nav__child__child' onClick={onLogOut} >
                  <FaSignOutAlt />  LogOut
                </button>
              </li> ):(
                <>
              <li className='nav__child'>
                <Link className='nav__child__child' to='/login'>
                  <FaSignInAlt />  Login
                </Link>
              </li>
              <li className='nav__child'>
                <Link className='nav__child__child' to='/register'>
                  <FaUser />  Register
                </Link>
               </li>
                </>
            )}
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Header