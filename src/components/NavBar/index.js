import React, { createElement } from 'react';
// import { Link } from 'react-router-dom';
import Category from './Category/Category';

const NavBar = () => {

    const TituloLancamento = () => {
        return (
            <>
                Lançamentos
                <span className="badge badge-laranja">!</span>
            </>
        )
    }

    return (
        <div className="header_nav d-none d-lg-block">
            <nav className="container nav">
                <ul className="list-unstyled mb-0">
                    <li className="nav-item">
                        {/* <Link to="/fornecedores" className="nav-link">Fornecedores</Link> */}
                        {/* <a href="/fornecedores" className="nav-link">Fornecedores</a> */}
                        {createElement('a', { href: "/fornecedores", className: "nav-link" }, "Fornecedores")}
                    </li>
                    <li className="nav-item">
                        <Category />
                    </li>
                    <li className="nav-item">
                        {/* <Link to="/destaque/promocao" className="nav-link">Promoções</Link> */}
                        {createElement('a', { href: "/destaque/promocao", className: "nav-link" }, "Ofertas do mês")}
                    </li>
                    <li className="nav-item">
                        {/* <Link to="/destaque/lancamento" className="nav-link">Lançamentos <span className="badge badge-laranja">!</span></Link> */}
                        {createElement('a', { href: "/destaque/lancamento", className: "nav-link" }, <TituloLancamento />)}
                        {/* <span className="badge badge-laranja">!</span> */}
                    </li>
                    <li className="nav-item">
                        {/* <Link to="/destaque/revista" className="nav-link">Queima de Estoque</Link> */}
                        {createElement('a', { href: "/destaque/revista", className: "nav-link" }, "Itens mais vendidos")}
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/destaque/queimaestoque" className="nav-link">Queima de Estoque</Link>
                        {createElement('a', { href: "/destaque/queimaestoque", className: "nav-link" }, "Queima de Estoque")}
                    </li> */}
                    <li className="nav-item">
                        {/* <Link to="/destaque/marcapropria" className="nav-link">Marca Própria</Link> */}
                        {createElement('a', { href: "/destaque/marcapropria", className: "nav-link" }, "Marca Própria")}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;