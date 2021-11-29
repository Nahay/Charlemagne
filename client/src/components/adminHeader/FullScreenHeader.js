import React from 'react';
import HeaderTop from './header-parts/HeaderTop';
import HeaderBody from './header-parts/HeaderBody';
import HeaderFooter from './header-parts/HeaderFooter';

const FullScreenHeader = ({toggle}) => {

    return (
        <header className = "full-screen-header">
            <HeaderTop toggle = {toggle}/>
            <HeaderBody toggle = {toggle}/>
            <HeaderFooter/>
        </header>
    );
}

export default FullScreenHeader;