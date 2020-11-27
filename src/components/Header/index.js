import React from 'react';
import Logo from './Logo/Logo';
import Search from './SearchBar/SearchBar';
import DropdownUser from './DropdownUser/DropdownUser';
import DropdownCart from './DropdownCart/DropdownCart';
import NavBar from '../NavBar';
import HeaderResponsive from '../HeaderResponsive';
import NavBarResponsive from '../NavBarResponsive';
import '../../scss/common.scss';

export default function Header() {
  return (
    <>
      <header className="header desktop">
        <div className="container header__topo d-none d-lg-flex">
          <div className="row align-items-center">
            <div className="col-2">
              <Logo />
            </div>

            <div className="col-5">
              <Search />
            </div>
            <div className="col-3">
                <DropdownUser />
              </div>
              <div className="col-2">
                <DropdownCart />
              </div>
          </div>
        </div>
        <HeaderResponsive />
        <NavBar />
      </header>
      <NavBarResponsive />
    </>
  );
}
