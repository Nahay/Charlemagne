import React from 'react';

import HeaderTop from './header-parts/HeaderTop';
import HeaderBody from './header-parts/HeaderBody';
import HeaderFooter from './header-parts/HeaderFooter';
import AdminHeaderBody from './header-parts/AdminHeaderBody';


const SideNavbar = ({admin, switchTheme}) => {

    return (
        <header className = "header">
            <HeaderTop admin={admin}/>
            {admin ? <AdminHeaderBody/> : <HeaderBody/>}
            <HeaderFooter switchTheme={switchTheme} admin={admin}/>
        </header>
    );
}
 
export default SideNavbar;