import React from 'react';
import { Link } from 'react-router-dom';

import { faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SocialMediaList from '../SocialMediaList';


const HeaderFooter = ({admin, toggle}) => {    

    const onClickLight = () => {
        
    }

    const onClickDark = () => {

    }

    
    return (    
        <div className = "header__footer">

            <div className="theme-icons">
                <FontAwesomeIcon icon={faLightbulb} size="lg" onClick={onClickLight} />
                <p className='light__message'>Thème clair</p>
                <FontAwesomeIcon icon={faMoon} size="lg" onClick={onClickDark} />
                <p className='dark__message'>Thème sombre</p>
            </div>

            <SocialMediaList/>

            {/* actuellement en visibility hidden */}
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