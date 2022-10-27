import React , {useState} from 'react'
import './navbar-style.css'
import shape from '../../assets/assets_Homework_Front-End_02/shape.png';
import path from '../../assets/assets_Homework_Front-End_02/path@2x.png';
const Navbar = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleChange = event => {
    if (event.target.checked) {
      document.getElementById('menu').style.left='-100%';
      document.getElementById('searchIcon').style.display='block';
      document.getElementById('searchInput').style.display='block';
      
    } else {
      const menu= document.getElementById('menu')
      menu.style.left='0';
      document.getElementById('searchIcon').style.display='none';
      document.getElementById('searchInput').style.display='none';
      
    }
    setIsSubscribed(current => !current);
  };




  return (
    <nav className="navbar">
      
      <ul id="menu">
        <li><div className='link'>SO FUNKTIONIERT'S</div></li>
        <li><div className='link'>SONDERANGEBOTE</div></li>


          <div className='dropdown'> 
        <li> 
        <div className='link'>
        <img src={shape} className="icon" />
        MEIN BEREICH</div>
       
        <div className="dropdown-content">
       
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
         </li>
        </div>
      
      
      
     
      </ul>
      <input type='checkbox' id="check"  onChange={handleChange}  value={isSubscribed}/>
      <label htmlFor='check' className='checkbtn'>
        <img src={path} />
      </label>

    </nav>

    )
}

export default Navbar