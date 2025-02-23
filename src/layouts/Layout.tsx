
import { Outlet } from 'react-router-dom'
import '../App.css'
import Nav from '../components/Nav'

// Główny layout z Navbarem

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}
