import React, { useRef } from 'react';
import './App.css';


function App() {

  const scrollAbout = useRef(null);
  const scrollServices = useRef(null);
  const scrollProjects = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div className="App">

        <nav className='navbar'>
          <div className='blocnavbar1'>
            <p style={{fontSize:'25px'}}>Jimmy Cabuy</p>
          </div>
          <div className='blocnavbar2'>  
            <a className='linkNavBar' href='/#'>Home</a>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollAbout)}>About me</button>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollServices)}>Services</button>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollProjects)}>Projects</button>
          </div>
          <div className='blocnavbar3'>
            <img src="../images/mail-outline.svg" alt="mail" style={{width:'20px', height:'20px'}} />
            <a className='navbarEmail' href="mailto:jimmycabuy@hotmail.com">jimmycabuy@hotmail.com</a>
          </div>
        </nav>

        <div id='home'>
          <div className='containerHome'>
            <p class="line-1 anim-typewriter">Hello, I'm Jimmy, <br></br>full stack developer <br></br>and web designer.</p>
            <img src="../images/memoji-3.png" alt="memoji-3" style={{width:'400px', height:'400px'}}/>
          </div>
        </div>
        <div id='about' ref={scrollAbout}>
          About me
        </div>
        <div id='services' ref={scrollServices}>
          Services
        </div>
        <div id='projects' ref={scrollProjects}>
          Projects
        </div>

    </div>
  );
}

export default App;
