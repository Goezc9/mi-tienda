import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/acerca-de" element={<About />} />
        </Routes>
      </main>
    </>
  )
}




export default App


