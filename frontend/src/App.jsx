import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register'
import Layout from './layout/layout'
import Error404 from './pages/Error404';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error404 />} />
      </Route>
    )
  )

  return < RouterProvider router={router}/>
}

export default App
