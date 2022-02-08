import React from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "./Login";

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        {/* <AuthProvider> */}
            {/* <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} /> */}
        {/* </AuthProvider> */}
        <AuthProvider>
          <Routes>
             <Route path='/' element={<Login />}></Route>
             <Route path='/chats' element={<Chats />}></Route>
          </Routes>
        </AuthProvider>
        
      </Router>
    </div>
  )
}

export default App
