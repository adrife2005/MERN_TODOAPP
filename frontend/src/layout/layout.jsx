import { Outlet } from "react-router-dom"
import Header from '../components/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'


const layout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <ToastContainer/>
    </>
  )
}

export default layout