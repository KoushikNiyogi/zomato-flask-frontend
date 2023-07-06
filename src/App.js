import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddOrder from './components/AddOrder';
import Orders from './components/Orders';
import Menu from './components/Menu';
import OrderStatusUpdate from './components/example';
import PrivateRoute from './components/PrivateRoute';


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
          pauseOnHover/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
          <Route path="/add_order/:id" element={<PrivateRoute><AddOrder /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>}/>
        </Routes>
        
      
    </div>
  );
};

export default App;
