import React, { useRef } from 'react';
import './App.css';
import './queries.css';
import Typed from "react-typed";

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
            <p style={{fontSize:'25px', color:'#FF4848', cursor:'pointer'}} onClick={() => scrollToSection(scrollHome)}>Jimmy Cabuy</p>
          </div>
          <div className='blocnavbar2'>  
            <button className='linkNavBar' onClick={() => scrollToSection(scrollHome)}>Home</button>
            <button className='linkNavBar' onClick={() => scrollToSection(scrollAbout)}>About</button>
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
            <img className='memoji-home' src="../images/memoji-3.png" alt="memoji-3" style={{width:'400px', height:'400px'}}/>
          </div>
        </div>
        <div id='about' ref={scrollAbout}>
        <div className='containerAbout'>
            <h1 className='subtitle'>About me</h1>
            {/* <Typed
              strings={[
                "About me",
              ]}
              typeSpeed={100}
              backSpeed={100}
              loop
              className='subtitle'
            /> */}
            <div className='subcontainerAbout'>
              <div className="div-text-about" style={{width:'75%'}}>
                <p className='text-about'>
                  Hello 👋🏼, I’m Jimmy, full stack web/mobile developer, web designer and photographer.
                  <br></br><br></br>
                  Curious and passionate, I’m always looking for new opportunities, keeping myself up-to-date with the latest trends in the tech industry.
                  <br></br><br></br>
                  Being a developer as well as a designer helps me to build the perfect website/mobile app for my clients’ needs 👨🏽‍💻🚀
                  <br></br><br></br>
                  Feel free to <a href='mailto:jimmycabuy@hotmail.com' style={{color:'black', textDecoration:'none', fontWeight:'500'}}>contact me</a> for any project, I will be happy to help you 🙏🏼😊
                  <br></br><br></br>
                  I hope to see you soon! 🙋🏽‍♂️
                </p>
              </div>
              <div className='cardPhoto'>
                <img src="../images/jimmyy.jpg" alt="jimmy" className='photoprofil'/>
                <h4>This is me!</h4>
                <p className='text-service'>25 years old guy from Brussels.</p>
              </div>
            </div>
          </div>
        </div>
        <div id='services' ref={scrollServices}>
          <div className='containerServices'>
            <h1 className='subtitle'>Services</h1>

            <div className='allCardServices'>
              <div className='cardService'>
                <img className='memoji-service' src="../images/memoji-6.png" alt="memoji-6"/>
                <h4>Web Design</h4>
                <p className='text-service'>Creation and design of the web interface: interactional architecture, page organization and navigation.</p>
              </div>
              <div className='cardService'>
                <img className='memoji-service' src="../images/memoji-1.png" alt="memoji-1"/>
                <h4>Development</h4>
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
            <h1 className='subtitle'>Projects</h1>
            <div className='allCardProjects'>
              <a className='cardProject' href='https://youtu.be/pDvhGFhw3gk' target="_blank" rel='noreferrer'>
                <img className='logo-project' src="../images/uwork.jpg" alt="uwork"/>
                <h4>Uwork</h4>
                <h6 className='project-detail'>Graphic design - Web Design - Development</h6>
                <p className='text-project'>Uwork is a mobile application that connects jobseekers with companies looking for employees. This application aims to totally democratize and review the hiring system with a simple and easy to use application.</p>
              </a>
              {/* <a className='cardProject' href='https://youtu.be/pDvhGFhw3gk' target="_blank" rel='noreferrer'>
                <img className='logo-project' src="../images/uwork.jpg" alt="uwork"/>
                <h4>Uwork</h4>
                <h6 className='project-detail'>Graphic design - Web Design - Development</h6>
                <p className='text-project'>Uwork is a mobile application that connects jobseekers with companies looking for employees. This application aims to totally democratize and review the hiring system with a simple and easy to use application.</p>
              </a>
              <a className='cardProject' href='https://youtu.be/pDvhGFhw3gk' target="_blank" rel='noreferrer'>
                <img className='logo-project' src="../images/uwork.jpg" alt="uwork"/>
                <h4>Uwork</h4>
                <h6 className='project-detail'>Graphic design - Web Design - Development</h6>
                <p className='text-project'>Uwork is a mobile application that connects jobseekers with companies looking for employees. This application aims to totally democratize and review the hiring system with a simple and easy to use application.</p>
              </a>
              <a className='cardProject' href='https://youtu.be/pDvhGFhw3gk' target="_blank" rel='noreferrer'>
                <img className='logo-project' src="../images/uwork.jpg" alt="uwork"/>
                <h4>Uwork</h4>
                <h6 className='project-detail'>Graphic design - Web Design - Development</h6>
                <p className='text-project'>Uwork is a mobile application that connects jobseekers with companies looking for employees. This application aims to totally democratize and review the hiring system with a simple and easy to use application.</p>
              </a> */}
            </div>
          </div>
        </div>
        <footer>
          <div className='container-social-icons'>
            <a href='https://www.linkedin.com/in/jimmycabuy/' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/linkedin.png" alt="linkedin"/>
            </a>
            <a href='https://www.instagram.com/jimmycabuy/' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/instagram.png" alt="instagram"/>
            </a>
            <a href='https://facebook.com/jimmy.cabuy' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/facebook.png" alt="facebook"/>
            </a>
            <a href='https://github.com/jimmycabuy/' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/github.png" alt="github"/>
            </a>
            <a href='https://fr.malt.be/profile/jimmycabuy' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/malt.png" alt="malt"/>
            </a>
            <a href='https://wa.me/32474917815' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/whatsapp.png" alt="whatsapp"/>
            </a>
            <a href='https://www.tiktok.com/@thedailyjim' target="_blank" rel='noreferrer'>
              <img className='social-icon' src="../images/tiktok.png" alt="tiktok"/>
            </a>
          </div>
          <div>
            <p style={{width:'180px'}}>©2022 by Jimmy Cabuy</p>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', width:'180px'}}>
            <img className='arrow-icon' src="../images/arrow.png" alt="arrow"/>
            <p className='gototop' style={{textAlign:'right', cursor:'pointer'}} onClick={() => scrollToSection(scrollHome)}>Go to top</p>
          </div>
        </footer>
    </div>
  );
}

export default App;
