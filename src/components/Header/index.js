import React from 'react';
import Logo from './Logo/Logo';
import Search from './SearchBar/SearchBar';
import DropdownUser from './DropdownUser/DropdownUser';
import DropdownCart from './DropdownCart/DropdownCart';
import NavBar from '../NavBar';
import HeaderResponsive from '../HeaderResponsive';
import NavBarResponsive from '../NavBarResponsive';
import { getItemSession } from '../../utils';
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

            <div className="col-6">
              <Search />
            </div>

            {getItemSession('_token') && [
              <>
              <div className="col-2">
                <DropdownUser />
              </div>
              <div className="col-2">
                <DropdownCart />
              </div>
              </>,
            ]}

            {!getItemSession('_token') && [
              <>
                <div className="col-2">
                    <a href="/login" className="header__link">
                        Login
                    </a>
                </div>
              </>,
            ]}

          </div>
        </div>
        <HeaderResponsive />
        <NavBar />
      </header>
      <NavBarResponsive />
    </>
  );
}
