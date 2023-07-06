import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://zomato-flask-mongodb.onrender.com/users');
        console.log(response)
        setUsers(response.data.menu);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

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
      const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem('role', "user");
    localStorage.setItem("user",JSON.stringify(user));
    navigate('/menu');
    toast.success(`User login successful`);
  } else {
    const userWithEmail = users.find((user) => user.email === email);
    if (userWithEmail) {
      toast.error('Invalid password');
    } else {
      toast.error('Invalid email');
    }
  }
    }
  };
  console.log(users);
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
