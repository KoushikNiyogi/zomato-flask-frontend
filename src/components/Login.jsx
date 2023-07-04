import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'admin@gmail.com' && password === 'admin') {
      // Store 'admin' in local storage key
      localStorage.setItem('role', 'admin');
      navigate('/menu');
      toast.success('Admin login successful');
    } else {
      // Store 'user' in local storage key
      localStorage.setItem('role', 'user');
      navigate('/menu');
      toast.success('User login successful');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
