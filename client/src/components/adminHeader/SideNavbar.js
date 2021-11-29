import React from 'react';
import HeaderTop from './header-parts/HeaderTop';
import HeaderBody from './header-parts/HeaderBody';
import HeaderFooter from './header-parts/HeaderFooter';

const SideNavbar = () => {

    return (
        <header className = "header">
            <HeaderTop/>
            <HeaderBody/>
            <HeaderFooter/>
        </header>
    );
}
 
export default SideNavbar;