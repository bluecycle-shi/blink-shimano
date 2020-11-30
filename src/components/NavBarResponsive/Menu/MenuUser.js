import React, { createElement } from 'react';
// import { Link } from 'react-router-dom';

const MenuUser = () => {
    return (
        <div className="header_nav_holder">
            <div className="header_nav_cont center">
                <h4 className="titulo h4">Seu menu pessoal</h4>
                <nav className="nav">
                    <ul className="list-unstyled mb-0">
                        <li className="nav-item">
                            {createElement('a', { href: '/minha-conta', className: "nav-link" }, "Minha conta")}
                        </li>
                        <li className="nav-item">
                            {createElement('a', { href: '/pedidos', className: "nav-link" }, "Pedidos")}
                        </li>
                        <li className="nav-item">
                            {createElement('a', { href: process.env.REACT_APP_URL_CLIENTE_EM_FOCO, target: '_blank', className: "nav-link" }, "Cliente em Foco")}
                        </li>
                        {/* <li className="nav-item">
                            {createElement('a', { href: '/fale-conosco', className: "nav-link" }, "Fale Conosco")}
                        </li> */}
                        <li className="nav-item nav-item--separado">
                            {createElement('a', { href: '/logout', className: "nav-link" }, "Sair")}
                        </li>
                    </ul>
                </nav>
                {/* <div className="header_nav_cont_footer">
                    <a href="/" className="btn btn--laranja btn--full align-self-end">Sugestão de Compra</a>
                </div> */}
            </div>
        </div>
    )
}

export default MenuUser;