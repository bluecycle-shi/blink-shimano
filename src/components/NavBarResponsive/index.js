import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import CategoryResponsive from './Category/CategoryResponsive'
import CartResponsive from './Cart/CartResponsive'
import MenuPrincipal from './Menu/MenuPrincipal';
import MenuUser from './Menu/MenuUser';
import { connect } from 'react-redux';

const NavBarResponsive = ({ items }) => {
    const [qtd, setQtd] = useState(0);
    const [amount, setAmount] = useState(0);

    // Load Data
    useEffect(() => {
        setQtd(items.QuantidadeRegistrosTotal)
        const total = items.Dados.reduce((acc, curr) => acc + curr.ValorTotalFinal, 0);
        setAmount(total)
    }, [items])

    return (
        <>
            <div className="header_nav nav--mobile d-lg-none">
                
                <button className="btn btn--roxo-escuro divisaomenu" type="button">
                
                    <span className="btn-user_img">
                        <span className="icon icon-user"></span>
                    </span>
                    <span className="btn-user_msg">Olá, </span>
                    <span className="icon icon-times fecharmenu btn-close"></span>
                </button>
                <div className="header_nav_holder">
                    <MenuPrincipal />
                    <CategoryResponsive />
                </div>
            </div>
            <div className="header_nav header_nav_right logado d-lg-none">
                <button className="btn btn-close btn--icon"><span className="icon icon-times fecharmenu2"></span></button>
                <div className="btn btn--roxo-escuro btn-user" type="button">
                    <span className="btn-user_img">
                        <span className="icon icon-user"></span>
                    </span>
                    <span className="btn-user_msg">Olá, </span>
                </div>
                <MenuUser />
            </div>
            <div className="header_nav header_nav_right cart d-lg-none">
                <button className="btn btn-close btn--icon"><span className="icon icon-times"></span></button>
                <button className="btn btn--roxo-escuro btn-user" type="button">
                    <span className="btn-user_img">
                        <span className="icon icon-user"></span>
                    </span>
                    <span className="btn-user_msg">Olá, </span>
                </button>
                <div className="header_nav_holder">
                    <div className="header_nav_cont center">
                        <CartResponsive items={items.Dados} amount={amount}  />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
   
    items: state.cart.items
})


export default connect(mapStateToProps)(NavBarResponsive);