import React, { useRef } from 'react';
import './App.css';
import Typed from "react-typed"

function App() {

  const scrollHome = useRef(null);
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
    <div className="App" ref={scrollHome}>

        <nav className='navbar'>
          <div className='blocnavbar1'>
            <p style={{fontSize:'25px', color:'#FF4848'}}>Jimmy Cabuy</p>
          </div>
          <div className='blocnavbar2'>  
            <button className='linkNavBar' onClick={() => scrollToSection(scrollHome)}>Home</button>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollAbout)}>About me</button>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollServices)}>Services</button>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollProjects)}>Projects</button>
          </div>
          <div className='blocnavbar3'>
            <img src="../images/mail-outline.png" alt="mail" style={{width:'20px', height:'20px'}} />
            <a className='navbarEmail' href="mailto:jimmycabuy@hotmail.com">jimmycabuy@hotmail.com</a>
          </div>
        </nav>

        <div id='home'>
          <div className='containerHome'>
            <p class="text-banner">Hello, I'm Jimmy,<br></br>
              {/* <span className='text-banner-contour'> developer</span>
              <span> and</span>
              <span className='text-banner-contour'> web designer</span> */}
              <Typed
                strings={[
                  "full stack developer.",
                  "web designer.",
                  "photographer.",
                  "content creator.",
                ]}
                typeSpeed={100}
                backSpeed={50}
                loop
                className='text-banner-contour'
              />
            </p>
            <img src="../images/memoji-3.png" alt="memoji-3" style={{width:'400px', height:'400px'}}/>
          </div>
        </div>
        <div id='about' ref={scrollAbout}>
        <div className='containerAbout'>
            {/* <h2 className='titleAbout'>About me</h2> */}
            <Typed
              strings={[
                "About me",
              ]}
              typeSpeed={100}
              backSpeed={100}
              loop
              className='subtitle'
            />
            <div className='subcontainerAbout'>
              <p className='text-about'>
                Hello 👋🏼, I’m Jimmy, full stack web/mobile developer, web designer and photographer.
                <br></br><br></br>
                Curious and passionate, I’m always looking for new opportunities, keeping myself up-to-date with the latest trends in the tech industry.
                <br></br><br></br>
                Being a developer as well as a designer helps me to build the perfect website/mobile app for my clients’ needs 👨🏽‍💻🚀
                <br></br><br></br>
                Feel free to <a href='mailto:jimmycabuy@hotmail.com' style={{color:'black'}}>contact me</a> for any project, I will be happy to help you 🙏🏼😊
                <br></br><br></br>
                I hope to see you soon! 🙋🏽‍♂️
              </p>
              <img src="../images/jimmy.jpg" alt="jimmy" className='imageAbout'/>
            </div>
          </div>
        </div>
        <div id='services' ref={scrollServices}>
          <div className='containerServices'>
            <Typed
              strings={[
                "Services",
              ]}
              typeSpeed={100}
              backSpeed={100}
              loop
              className='subtitle'
            />
            <div className='allCardServices'>
              <div className='cardService'>
                <img className='memoji-service' src="../images/memoji-6.png" alt="memoji-6"/>
                <h4>Web Design</h4>
                <p className='text-service'>Creation and design of the web interface: interactional architecture, page organization and navigation.</p>
              </div>
              <div className='cardService'>
                <img className='memoji-service' src="../images/memoji-1.png" alt="memoji-1"/>
                <h4>Developement</h4>
                <p className='text-service'>Once your website is designed and validated, it is time to code it and host it to see it online.</p>
              </div>
              <div className='cardService'>
                <img className='memoji-service' src="../images/memoji-4.png" alt="memoji-4"/>
                <h4>Photography</h4>
                <p className='text-service'>The quality of the images on a website is a major element. Let's organize a photo shoot.</p>
              </div>
              <div className='cardService'>
                <img className='memoji-service' src="../images/memoji-7.png" alt="memoji-7"/>
                <h4>Content Creation</h4>
                <p className='text-service'>Need a logo, a photo montage or a little animation? No problem, your website will be even more beautiful.</p>
              </div>
            </div>
          </div>
        </div>

        <div id='projects' ref={scrollProjects}>
          <div className='containerProjects'>
            <Typed
                strings={[
                  "Projects",
                ]}
                typeSpeed={100}
                backSpeed={100}
                loop
                className='subtitle'
              />
          </div>
        </div>

    </div>
  );
}

export default App;
