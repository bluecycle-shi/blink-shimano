import React from 'react';
import Logo from './Logo/LogoResponsive';
import SearchBar from './SearchBar/SearchBarResponsive';
import DropdownCart from './DropdownCart/DropdownCartResponsive';

export default function HeaderResponsive() {
    return (
        <header className="header mobile">
        <div className="container header__topo d-lg-none">
            <div className="row align-items-center">
                <div className="col-2">
                    <button className="btn btn--icon btn-menu">
                        <span></span><span></span><span></span>
                    </button>
                </div>
                <div className="col-8">
                    <Logo />
                </div>

                <div className="col-2">
                    <DropdownCart />
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-12">
                    <SearchBar />
                </div>
            </div>
        </div>
    </header>
    )
}