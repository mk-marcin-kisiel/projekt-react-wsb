import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import Login from './pages/login'
import Logout from './pages/logout'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Main from './pages/main'
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import {ReactComponent as LoginComponent} from './login.svg'
import {ReactComponent as ProfileComponent} from './profile.svg'
import {ReactComponent as LogoutComponent} from './logout.svg'
import './theme/navbar.css'

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selected, setSelected] = useState('regular');

  function LogoutItem(props){
    return (
        <li className="nav-item">
            <a href={props.reflink} className="icon-button" onClick={() => {localStorage.clear(); setloggedIn(false)}}>
            {props.icon}
            </a>
        </li>
    );

  }
  
  function NavBarComponent(props){
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul> 
        </nav>
      );
  }

  function NavItem(props){
  const [open, setOpen] = useState(false);
  return (
      <li className="nav-item">
          <a href={props.reflink} className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
          </a>
          {open && props.children}
      </li>
  );
  }

  useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt_decode(token);
			if (!user) {
				localStorage.removeItem('token')
                setloggedIn(false);
			} else {
                setloggedIn(true);
                setUsername(user.username);
			}
		}
	}, [selected, username, loggedIn])

  return (
    <div>
      <NavBarComponent>
        <a href="/memes" className='Page-title'>Memes.setType('IT')</a>
        <button onClick={()=>setSelected('regular')} className={selected==='regular' ? 'Pick-btn Pick-btn-selected' : 'Pick-btn'} type="button">Regular</button>
        <button onClick={()=>setSelected('hot')} className={selected==='hot' ? 'Pick-btn Pick-btn-selected' : 'Pick-btn'} type="button">Hot</button>

        {loggedIn && <a href="/memes/dashboard" className='navbar-username'>{username}</a>}
        {loggedIn && <NavItem reflink="/memes/dashboard"icon={<ProfileComponent/>}/> }
        {loggedIn ? (<LogoutItem reflink="/memes" icon={<LogoutComponent/>}/>) : (<NavItem reflink="/memes/login" icon={<LoginComponent/>}/>)}
      </NavBarComponent>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/memes" />} />
        <Route path="/memes" element={<Main selected={selected}/>} />
        <Route path="/memes/login" element={<Login onLogin={setloggedIn}/>} />
        <Route path="/memes/logout" element={<Logout/>} />
        <Route path="/memes/register" element={<Register/>} />
        <Route path="/memes/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  </div>
    
  );
}





export default App;
