import { Fragment } from 'react';
import classes from './Nav.module.scss';
import NavLogoImg from '../../assets//3rdparty/flaticon/4927615-space/svg/008-blackhole_lunacy.svg';
import NavLogoText from '../../assets/public/sections/nav/logo_lowercase_extrabold.svg';
const Nav = (props) => {
    return <Fragment>
        <div className={classes.navMain}>
            <div className={classes.logoContainer}>
                <a className={classes.navLogo}>
                    <img className={classes.navLogoImg} src={NavLogoImg} />
                    <img className={classes.navLogoText} src={NavLogoText} />
                </a>
            </div>
            <div className={classes.buttonContainer}>
                <a className={classes.navMainBtn} >Audio</a>
                <a className={classes.navMainBtn} >Video</a>
                <a className={classes.navMainBtn} >Warpstagram</a>
            </div>
            <div className={classes.logoContainer}>
                <p className={classes.navVersion}>version 2.1.3.</p>
            </div>
        </div>
    </Fragment>
}
export default Nav;