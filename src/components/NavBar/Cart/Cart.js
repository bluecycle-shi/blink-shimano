import React, { createElement } from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils';

const Cart = ({ items, amount }) => {
    return (
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="CartDropdown">
            {items.length > 0 &&
                <>
                    <div className="dropdown-menu_cont">
                        <ul className="list-unstyled mb-0">
                            {items.map((item, index) => (
                                <li key={`cart-dropdown-item-${index}`} className="dropdown_cart_item">
                                    {/* <a href="/" className="dropdown-menu_link">{item.Descricao}</a> */}
                                    {createElement('a', { href: `/produto/${item.idProduto}`, className: 'dropdown-menu_link' }, item.Descricao)}
                                    <div className="dropdown_cart_item_footer">
                                        <p>Quantidade: {item.Quantidade}</p>
                                        <p>R$ {formatMoney(item.ValorTotalFinal, 2, ',', '.')}</p>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    </div>
                    <div className="dropdown-menu_footer">
                        <div className="total">
                            <p>
                                Subtotal:
                                <b>R$ {formatMoney(amount, 2, ',', '.')}</b>
                            </p>
                        </div>
                        {/* <Link to="/carrinho" className="btn btn--laranja">Fechar pedido</Link> */}
                        {createElement('a', { href: '/carrinho', className: 'btn btn--laranja' }, 'Fechar pedido')}
                    </div>
                </>
            }
            {items.length === 0 &&
                <div className="dropdown-menu_cont text-center">
                    Carrinho vazio
                </div>
            }
        </div>
    )
}

export default Cart;