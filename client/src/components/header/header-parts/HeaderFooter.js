import React from 'react';
import SocialMediaList from '../SocialMediaList';
import { Link } from 'react-router-dom';

const HeaderFooter = ({admin, toggle}) => {

    return (
        <div className = "header__footer">
            <SocialMediaList/>
            <div className = "footer__cg">
                <Link
                    to="/mentions-legales"
                    onClick={toggle}
                    rel={admin? "noopener noreferrer" : ""}
                    target={admin ? "_blank" : ""}
                >
                    Mentions légales
                </Link>
                <Link
                    to="/cgu-cgv"
                    onClick={toggle}
                    rel={admin? "noopener noreferrer" : ""}
                    target={admin ? "_blank" : ""}
                >
                    CGU/CGV
                </Link>
            </div>
        </div>
    );
}
 
export default HeaderFooter;