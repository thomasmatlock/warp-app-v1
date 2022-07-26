import { Fragment } from 'react';
import NavLogoImg from '../../../assets/Nav/008-blackhole_lunacy.svg';
import navLogoText from '../../../assets/Nav/logo_lowercase_extrabold.svg';
import  './Nav.scss';

const Nav = () => {
    return  (
        <Fragment>
        <div className="navMain">
            <div className="logoContainer">
            <a className="navLogo">
             <img className="navLogoImg" alt="icon" src={NavLogoImg} />
             <img className="navLogoText" alt="icon" src={navLogoText} />
            </a>
            </div>
            <div className="buttonContainer">
            <a className="navMainBtn" >Audio</a>
            <a className="navMainBtn" >Video</a>
            <a className="navMainBtn" >Warpstagram</a>
            {/* <a className="navMainBtn" >Morph</a> */}
            </div>
            <div className="logoContainer">
            <p className="navVersion">version 2.1.3.</p>
            </div>
        </div>
    </Fragment>
        );
}
export default Nav;