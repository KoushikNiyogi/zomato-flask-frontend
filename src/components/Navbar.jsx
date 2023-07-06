import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className="nav-link" activeClassName="active">
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="nav-link" activeClassName="active">
            Orders
          </NavLink>
        </li>
        <li>
          <button onClick={()=>{
            localStorage.removeItem("role");
            localStorage.removeItem("user");
          }}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
