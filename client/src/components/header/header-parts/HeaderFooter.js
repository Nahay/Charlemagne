import React from 'react';
import { Link } from 'react-router-dom';

import SocialMediaList from '../SocialMediaList';


const HeaderFooter = ({admin, toggle}) => {    

    
    return (    
        <div className = "header__footer">

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