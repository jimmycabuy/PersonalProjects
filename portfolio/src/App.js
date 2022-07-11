import React, { useRef } from 'react';
import './App.css';
import './queries.css';
import Typed from "react-typed";
import { FaGithub, FaTiktok, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaPinterestP, FaTelegramPlane } from "react-icons/fa";

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
            <p className='myNameLogo' style={{fontSize:'25px', color:'#FF4848', cursor:'pointer'}} onClick={() => scrollToSection(scrollHome)}>Jimmy Cabuy</p>
          </div>
            <input type="checkbox" id='toggler'/>
            <label htmlFor="toggler"><img className='burgerMenuImg' src="../images/menu.png" alt="burgermenu" style={{height:'20px', width:'20px'}} /></label>
          <div className='blocnavbar2'>
            <ul className='list'>
              <li><button className='linkNavBar' onClick={() => scrollToSection(scrollHome)}>Home</button></li>
              <li><button className='linkNavBar' onClick={() => scrollToSection(scrollAbout)}>About</button></li>
              <li><button className='linkNavBar' onClick={() => scrollToSection(scrollServices)}>Services</button></li>
              <li><button className='linkNavBar' onClick={() => scrollToSection(scrollProjects)}>Projects</button></li>
              <li><a className='navbarEmail' href="mailto:jimmycabuy@hotmail.com"><button className='linkNavBar'>Contact</button></a></li>
            </ul>
          </div>
          {/* <div className='blocnavbar3'>
            <img src="../images/mail-outline.png" alt="mail" style={{width:'20px', height:'20px'}} />
            <a className='navbarEmail' href="mailto:jimmycabuy@hotmail.com">jimmycabuy@hotmail.com</a>
          </div> */}
        </nav>

        <div id='home'>
          <div className='containerHome'>
            <p className="text-banner">Hello, I'm Jimmy,<br></br>
            {/* <p className='text-banner-contour'>web developer</p>
            <p className='text-banner-contour'>web design</p>
            <p className='text-banner-contour'>photographer</p>
            <p className='text-banner-contour'>content creator</p> */}

              <Typed
                strings={[
                  "web developer.",
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
            <img className='memoji-home' src="../images/memoji-3.webp" alt="memoji-3" style={{width:'400px', height:'400px'}}/>
            <div className='scroll-down'>
              <span className='mouse'>
                <span className='mouse-wheel'></span>
              </span>
              <p className='text-scroll'>Scroll me</p>
            </div>
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
              <div className="div-text-about" style={{width:'90%'}}>
                <p className='text-about'>
                  Hello 👋🏼, I’m Jimmy, full stack web/mobile developer, web designer and photographer.
                  <br></br><br></br>
                  After obtaining my bachelor's degree in e-business at the EPHEC, I worked for 2 years and a half in digital marketing as a content creator and social ads expert.
                  I followed then an intensive coding bootcamp at La Capsule in order to become a junior web developer  {/*I'm now looking for opportunities in web and mobile development.*/}
                  <br></br><br></br>
                  Curious and passionate, I’m always looking for new opportunities, keeping myself up-to-date with the latest trends in the tech industry.
                  <br></br><br></br>
                  Being a developer as well as a designer helps me to build the perfect website/mobile app for my clients’ needs 👨🏽‍💻🚀
                  <br></br><br></br>
                  Feel free to <a href='mailto:jimmycabuy@hotmail.com' style={{color:'black', textDecoration:'none', fontWeight:'500'}}>contact me</a> for any project, I will be happy to help you 🙏🏼😊
                  <br></br><br></br>
                  I hope to see you soon! 🙋🏽‍♂️
                  <br></br><br></br>
                  <a href="/document/Resume_Jimmy_Cabuy.pdf" target="_blank" rel='noreferrer' className='bouton_cv'>Find my resume here</a>
                  <br></br><br></br>

                </p>
              </div>
              <div>
                <div className='cardPhoto'>
                  {/* <img src="../images/jimmyy.jpg" alt="jimmy" className='photoprofil'/>
                  <h4>This is me!</h4>
                  <p className='text-service'>25 years old guy from Brussels.</p> */}
                  <img src="../images/portrait.webp" alt="portrait" style={{overflow:'hidden'}}/>
                </div>
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
              {/* <a className='cardProject' href='https://youtu.be/pDvhGFhw3gk' target="_blank" rel='noreferrer'>
                <img className='logo-project' src="../images/uwork.jpg" alt="uwork"/>
                <h4>Uwork</h4>
                <h6 className='project-detail'>Graphic design - Web Design - Development</h6>
                <p className='text-project'>Uwork is a mobile application that connects jobseekers with companies looking for employees. This application aims to totally democratize and review the hiring system with a simple and easy to use application.</p>
              </a> */}
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

              <div className="card">
                <ul className="ul">
                  <li>
                    <img style={{height:'35px', width:'35px'}} src="../images/expo.png" alt="expo"/>
                  </li>
                  <li>
                    <img style={{height:'35px', width:'35px'}} src="../images/react.png" alt="react"/>
                  </li>
                  <li>
                    <img style={{height:'35px', width:'35px'}} src="../images/node.png" alt="node"/>
                  </li>
                  <li>
                    <img style={{height:'35px', width:'35px'}} src="../images/mongodb.png" alt="mongodb"/>
                  </li>
                </ul>
                <img src="../images/uwork4.webp" alt="uwork"/>
                <div className="con-text">
                  <h2>Uwork</h2>
                  <h5>Graphic Design - Web Design - Development</h5>
                  <p>Uwork is a mobile application that connects jobseekers with companies looking for employees. This application aims to totally democratize and review the hiring system with a simple and easy to use application.
                    <a href="https://youtu.be/pDvhGFhw3gk" className="button" target="_blank" rel='noreferrer'>Learn more</a>
                  </p>
                </div>
              </div>

              <div className="card">
                <img src="../images/cabine.jpg" alt="uwork"/>
                <div className="con-text">
                  <h2>thedailyjim</h2>
                  <h5>Photography</h5>
                  <p>During my free time, I have another passion besides coding, it's photography. I've been passionate about the world of photography since I was young and I love to get out of my house and capture the life and the nature around us.
                    <a href="https://www.instagram.com/thedailyjim/" className="button" target="_blank" rel='noreferrer'>Learn more</a>
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
        <footer>
          <div className='container-social-icons'>
            {/* <a href='https://www.linkedin.com/in/jimmycabuy/' target="_blank" rel='noreferrer'>
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
            </a> */}
            <a href='https://www.linkedin.com/in/jimmycabuy/' target="_blank" rel='noreferrer'><FaLinkedinIn className='linkedin'/></a>
            <a href='https://www.instagram.com/jimmycabuy/' target="_blank" rel='noreferrer'><FaInstagram className='instagram'/></a>
            <a href='https://facebook.com/jimmy.cabuy' target="_blank" rel='noreferrer'><FaFacebookF className='facebook'/></a>
            <a href='https://github.com/jimmycabuy/' target="_blank" rel='noreferrer'><FaGithub className='github'/></a>
            <a href='https://wa.me/32474917815' target="_blank" rel='noreferrer'><FaWhatsapp className='whatsapp'/></a>
            <a href='https://www.tiktok.com/@thedailyjim' target="_blank" rel='noreferrer'><FaTiktok className='tiktok'/></a>
            <a href='https://www.pinterest.com/jimmycabuy' target="_blank" rel='noreferrer'><FaPinterestP className='pinterest'/></a>
            <a href='https://t.me/+32474917815' target="_blank" rel='noreferrer'><FaTelegramPlane className='telegram'/></a>
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
