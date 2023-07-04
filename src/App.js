import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddOrder from './components/AddOrder';
import Orders from './components/Orders';
import Menu from './components/Menu';


const App = () => {
  return (
    <div>
      <Navbar />
      
        <ToastContainer  position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/> {/* Add the ToastContainer component */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/add_order/:id" element={<AddOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      
    </div>
  );
};

export default App;
