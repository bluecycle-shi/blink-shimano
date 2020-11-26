import React, { createElement } from 'react';
// import { Link } from 'react-router-dom';

const MenuPrincipal = () => {
    return (
        <div className="header_nav_cont center" id="menuPrincipal">
            <h4 className="titulo h4">Menu principal</h4>
            <nav className="nav">
                <ul className="list-unstyled mb-0">
                    <li className="nav-item">
                        {/* <a href="/fornecedores" className="nav-link">Fornecedores</a> */}
                        {createElement('a', { href: "/fornecedores", className: "nav-link" }, "Fornecedores")}
                    </li>
                    <li className="nav-item">
                        <a role="button" href="#categorias" className="nav-link nav-dropdown">Categorias<span className="fa fa-chevron-right"></span></a>
                    </li>
                    <li className="nav-item">
                        {/* <a href="/destaque/promocao" className="nav-link">Promoções</a> */}
                        {createElement('a', { href: "/destaque/promocao", className: "nav-link" }, "Ofertas do mês")}
                    </li>
                    <li className="nav-item">
                        {/* <a href="/destaque/lancamento" className="nav-link">Lançamentos</a> */}
                        {createElement('a', { href: "/destaque/lancamento", className: "nav-link" }, "Lançamentos")} 
                    </li>
                    <li className="nav-item">
                        {/* <a href="/destaque/revista" className="nav-link">Queima de Estoque</a> */}
                        {createElement('a', { href: "/destaque/revista", className: "nav-link" }, "Itens mais vendidos")}
                    </li>
                    {/* <li className="nav-item">
                        <a href="/destaque/queimaestoque" className="nav-link">Queima de Estoque</a>
                        {createElement('a', { href: "/destaque/queimaestoque", className: "nav-link" }, "Queima de Estoque")}
                    </li> */}
                    <li className="nav-item">
                        {/* <a href="/destaque/marcapropria" className="nav-link">Marca Própria</a> */}
                        {createElement('a', { href: "/destaque/marcapropria", className: "nav-link" }, "Marca Própria")}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MenuPrincipal;