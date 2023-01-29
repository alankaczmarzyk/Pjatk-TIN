import React, { useState } from "react"
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer'
import {Routes, Route } from 'react-router-dom';
import CourierList from './components/courier/CourierList'
import CourierDetails from './components/courier/CourierDetails'
import CourierForm from './components/courier/CourierForm'

import OrderList from './components/order/OrderList'
import OrderDetails from './components/order/OrderDetails'
import OrderForm from './components/order/OrderForm'

import CustomerList from './components/customer/CustomerList'
import CustomerDetails from './components/customer/CustomerDetails'
import CustomerForm from './components/customer/CustomerForm'
import LoginForm from './components/other/LoginForm'
import ProtectedRoute from './components/other/ProtectedRoute'
import CourierAccessDenied from './components/courier/CourierAccessDenied'

function App() {
  const [user, setUser] = useState()

  const handleLogin = (user) => {
    localStorage.setItem('user', user)
    setUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  return (
    <>
      <Header />
      <Navigation handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<MainContent />} />
          <Route path="couriers">
            <Route index={true} element={<CourierList />} />
            <Route path="details/:courId" element={<CourierDetails />} />
            <Route path="add" element={<ProtectedRoute><CourierForm /></ProtectedRoute>} />
            <Route path="edit/:courId" element={<CourierForm />} />
          </Route>

          <Route path="orders">
            <Route index={true} element={<OrderList />} />
            <Route path="details/:ordId" element={<OrderDetails />} />
            <Route path="add" element={<OrderForm />} />
            <Route path="edit/:ordId" element={<OrderForm />} />
          </Route>

          <Route path="customers">
            <Route index={true} element={<CustomerList />} />
            <Route path="details/:custId" element={<CustomerDetails />} />
            <Route path="add" element={<CustomerForm />} />
            <Route path="edit/:custId" element={<CustomerForm />} />
          </Route>

          <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
          <Route path="/noaccess" element={<CourierAccessDenied />} />
      </Routes>  
      <Footer />
    </>
  );
}

export default App;