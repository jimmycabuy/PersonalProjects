import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">

        <nav className='navbar'>
          <div className='blocnavbar1'>
            <p style={{fontSize:'25px', fontWeight:500}}>Jimmy Cabuy</p>
          </div>
          <div className='blocnavbar2'>
            <a className='linkNavBar' href="/">Home</a>
            <a className='linkNavBar' href="/#about">About me</a>
            <a className='linkNavBar' href="/#services">Services</a>
            <a className='linkNavBar' href="/#projects">Projects</a>
          </div>
          <div className='blocnavbar3'>
            <img src="../images/mail-outline.svg" alt="mail" style={{width:'20px', height:'20px'}} />
            <a className='navbarEmail' href="mailto:jimmycabuy@hotmail.com">jimmycabuy@hotmail.com</a>
          </div>
        </nav>

        <div id='home'></div>
        <div id='about'></div>
        <div id='services'></div>
        <div id='projects'></div>

    </div>
  );
}

export default App;
