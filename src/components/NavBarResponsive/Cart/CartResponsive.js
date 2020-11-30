import React, { createElement } from 'react';
import { formatMoney } from '../../../utils';
import { Link } from 'react-router-dom';

const CartResponsive = ({ items, amount }) => {
    return (
        <>
            <h4 className="titulo h4">Seu carrinho</h4>
            {items.length > 0 &&
                <>
                    <div className="cart_list">
                        <ul className="list-unstyled mb-0">
                            {items.map((item, index) => (
                                <li key={`cart-dropdown-resp-item-${index}`} className="cart_list_item">
                                    {createElement('a', { href: `/produto/${item.idProduto}`, className: 'dropdown-menu_link' }, item.Descricao)}
                                    <div className="cart_list_item_footer">
                                        <p>Quantidade: {item.Quantidade}</p>
                                        <p>R$ {formatMoney(item.ValorTotalFinal, 2, ',', '.')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="header_nav_cont_footer">
                        <p className="mb-0 fs-12">Subtotal:</p>
                        <p className="c-laranja fs-18 mb-0"><b>R$ {formatMoney(amount, 2, ',', '.')}</b></p>
                        {/* <Link to="/carrinho" className="btn btn--laranja btn--full mt-3">Fechar pedido</Link> */}
                        {createElement('a', { href: '/carrinho', className: 'btn btn--laranja btn--full mt-3' }, 'Fechar pedido')}
                    </div>
                </>
            }
            {!items.length &&
                <div className="cart_list">
                    Carrinho vazio
                </div>
            }

        </>
    )
}

export default CartResponsive;