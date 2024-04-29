import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ChatPage from './pages/ChatPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import LandingPage from './pages/LandingPage'


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/signin' element={<SignInPage/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App
