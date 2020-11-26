import React, { useState, useEffect } from 'react';
import Cart from '../../NavBar/Cart/Cart';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DropdownCart = ({ items }) => {
    const [qtd, setQtd] = useState(0);
    const [amount, setAmount] = useState(0);

    // Load Data
    useEffect(() => {
        setQtd(items.QuantidadeRegistrosTotal)
        const total = items.Dados.reduce((acc, curr) => acc + curr.ValorTotalFinal, 0);
        setAmount(total)
    }, [items])
    
    return (
        <div className="dropdown dropdown_cart" >
            <button className="btn btn--icon dropdown-toggle" type="button" id="CartDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="fas fa-shopping-cart"></span>
                <span className="dropdown_cart_number">({qtd > 0 ? qtd : 'vazio'})</span>
            </button>
            <Cart items={items.Dados} amount={amount} />
        </div>
    );
}

const mapStateToProps = state => ({
    items: state.cart.items
})

export default connect(mapStateToProps)(DropdownCart);