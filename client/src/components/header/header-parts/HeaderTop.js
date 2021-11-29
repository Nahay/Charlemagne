import React from 'react';
import Logo from '../../generic/Logo';
import { Link } from 'react-router-dom';

const HeaderTop = ({toggle}) => {

    return (
        <div className = "header__top">
            <Link to = "/" onClick={toggle}>
                <Logo/>
            </Link>
            <Link to = "/" onClick={toggle}>
            <span>Le Charlemagne</span>
            </Link>
        </div>
    );
}
 
export default HeaderTop;