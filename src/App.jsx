
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {
  

  return (
    <>
    <AuthProvider>
    <Navbar/>
    <main className='min-h-screen  max-w-2x1 mx-auto px-4 py-6 font-primary'>
     <Outlet/>
     </main>
     <Footer/>
     </AuthProvider>
    </>
  )
}

export default App
