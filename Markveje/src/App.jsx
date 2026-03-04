import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import BookDetail from './Bookdetail'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Shop from './Shop'
import Login from './Login'
import Signup from './Signup'
import SignupSuccess from './SignupSuccess'
import Cart from './Cart'
import About from './About'


function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-success" element={<SignupSuccess />} />
      <Route path="/basket" element={<Cart />} />
      <Route path="/about" element={<About />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
