import React from 'react';
import SocialMediaList from '../SocialMediaList';
import { Link } from 'react-router-dom';

const HeaderFooter = () => {

    return (
        <div className = "header__footer">
            <SocialMediaList/>
            <div className = "footer__cg">
                <Link to="/mentions-legales">Mentions légales</Link>
                <Link to="/cgu-cgv">CGU/CGV</Link>
            </div>
        </div>
    );
}
 
export default HeaderFooter;