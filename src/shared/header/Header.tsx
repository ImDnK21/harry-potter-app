import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import './Header.css'


export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="main-content-header">
        <div className="header-title">The Enchanted Editorial</div>
        <IconButton
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
          sx={{ color: '#4b0000' }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <div className="header-routes">
            <NavLink end to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink>
            <NavLink to="/characters" onClick={() => setMenuOpen(false)}>CHARACTERS</NavLink>
            <NavLink to="/spells" onClick={() => setMenuOpen(false)}>SPELLS</NavLink>
            <NavLink to="/houses" onClick={() => setMenuOpen(false)}>HOUSES</NavLink>
          </div>
          <div className="header-logon">
            <Button variant="contained">Login</Button>
          </div>
        </nav>
      </div>
    </>
  )
}
