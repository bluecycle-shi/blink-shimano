import React from 'react';

import Logo from './Logo/LogoResponsive';
import SearchBar from './SearchBar/SearchBarResponsive';
import DropdownUser from './DropdownUser/DropdownUserResponsive';
import DropdownCart from './DropdownCart/DropdownCartResponsive';

export default function HeaderResponsive() {
    return (
        <div className="container header_topo d-lg-none">
            <button className="btn btn--icon btn-menu">
                <span></span><span></span><span></span>
            </button>
            <Logo />
            <DropdownUser />
            <SearchBar />
            <DropdownCart />
        </div>
    )
}