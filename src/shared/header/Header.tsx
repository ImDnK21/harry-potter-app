import Button from '@mui/material/Button';

import './Header.css'


export const Header = () => {
  return (
    <>
      <div className="main-content-header">
        <div className="header-title">The Enchanted Editorial</div>
        <div className="header-routes">
          <span className="active">HOME</span>
          <span>CHARACTERS</span>
          <span>SPELLS</span>
          <span>HOUSES</span>
        </div>
        <div className="header-logon">
          <Button className="" variant="contained">Login</Button>
        </div>
      </div>
    </>
  )
}