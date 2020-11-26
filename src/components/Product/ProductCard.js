import React, { useState, createElement } from 'react';
// import { Link } from 'react-router-dom';
// import { formatMoney, disconnect } from '../../utils';
import { formatMoney } from '../../utils';
import { addToCart, fetchCartItems, updateCart } from '../../services/cart-api';
import * as CartActions from '../../store/actions/cart'
import { connect } from 'react-redux';
import { setItemSession, getItemSession } from '../../utils';

const Swal = require('sweetalert2');


const ProductCard = ({ product, origin, refreshCartFn }) => {
    const [quantity, setQuantity] = useState(0)
    const [adding, setAdding] = useState(false)

    const decrement = () => setQuantity(q => isNaN(q) || q < 2 ? 0 : q - 1);
    const increment = () => setQuantity(q => q >= 0 ? q + 1 : 1);

    const handleChange = (e) => {
        if (parseInt(e.target.value) > 0) {
            setQuantity(parseInt(e.target.value));
        } else {
            setQuantity();
        }
    }

    const handleAddToCart = (e) => {
        e.preventDefault();

        const intQuantity = parseInt(quantity);

        if (isNaN(intQuantity) || intQuantity < 1) {
            alert("Ingrese una cantidad válida para el producto");
            return false;
        }

        setAdding(true);

        buttonActionDisabled(e);

        const get = getItemSession('_carrinho');
        const cartItems = JSON.parse(get);

        const item = cartItems.Dados.filter(item => { return item.idProduto === product.idProduto })

        let time = 2000;

        if (item.length > 0) {
            const newQuantity = intQuantity + parseInt(item[0].Quantidade)

            updateCart(product.idProduto, item[0].Item, newQuantity)
                .then(resultUpdate => {
                    if (resultUpdate.data.Codigo === 500) {
                        alert(resultUpdate.data.Status);
						setAdding(false);
                        time = 0;
						buttonActionEnabled(e);
                    } else {
                        fetchCartItems()
                            .then(result => {
                                if (result.data.Data.Dados.length > 0) {

                                    setItemSession('_carrinho', JSON.stringify(result.data.Data))
                                    refreshCartFn(result.data.Data)
                                }
								buttonActionEnabled(e);
								setAdding(false);
                            })
                            // .catch(reject => {
                            //     disconnect();
							// 	buttonActionEnabled(e);
							// 	setAdding(false);
                            // })
                    }
                   
                })
                // .catch(reject => {
                //     disconnect();
				// 	buttonActionEnabled(e);
                // })
        } else {
            addToCart(product.idProduto, intQuantity, origin)
                .then(resultAdd => {
                    if (resultAdd.data.Codigo === 500) {
                        if (resultAdd.data.CodigoInterno === 4) {
                            // disconnect()
                        } else {
                            alert(resultAdd.data.Status);
							setAdding(false);
                            time = 0;
                        }
						buttonActionEnabled(e);
                    } else {
                        fetchCartItems()
                            .then(result => {
                                if (result.data.Data.Dados.length > 0) {
                                    setItemSession('_carrinho', JSON.stringify(result.data.Data))
                                    refreshCartFn(result.data.Data)
                                }
                            })
							.then(result => {
								buttonActionEnabled(e);
								setAdding(false);
							})
                            .catch(reject => {
                                // disconnect();
								buttonActionEnabled(e);
								setAdding(false);
                            })
                    }
                })
                .catch(reject => {
                    // disconnect();
					buttonActionEnabled(e);
                })
        }
       
    }

    const buttonActionDisabled = (e) => {
		e.persist();
        e.target.disabled = true;
    }
    const buttonActionEnabled = (e) => {
		e.persist();
        e.target.disabled = false;
    }

    return (
        <div className="card-item">
            <div className="card-item--header">
                {product.Lancamento === true && <span className="tag--card-item">Novedad</span>}
                {/* <img src={product.LinkImagemLista} alt="" className="img-card-produto" /> */}
                {createElement('a', { href: `/produto/${product.idProduto}`, className: 'link-item' }, <img src={product.LinkImagemLista} alt="" className="img-card-produto" />)}
            </div>
            <div className="card-item--body">
                {/* <p className="card-item--codigo">EAN: {product.EAN}</p> */}
                <h5 className="card-item--titulo">
                    {/* <Link to={`/produto/${product.idProduto}`}>{product.Descricao}</Link> */}
                    {createElement('a', { href: `/produto/${product.idProduto}` }, product.Descricao)}
                </h5>
                {product.PossuiPrecoPromocional
                    ?
                        <>
                            <p className="card-item--valor--de"><strike>R$ {formatMoney(product.PrecoUnitario, 2, ',', '.')}</strike></p>
                            <p className="card-item--valor--por">R$ {formatMoney(product.PrecoPromocionalUnitario, 2, ',', '.')} </p>
                            <p className="card-item--valor-total"><b>Total: de <strike>R$ {formatMoney(product.Preco, 2, ',', '.')}</strike> por R$ {formatMoney(product.PrecoPromocional, 2, ',', '.')}</b></p>
                        </>
                    :
                        <>
                            <p className="card-item--valor">R$ {formatMoney(product.PrecoUnitario, 2, ',', '.')}</p>
                            <p className="card-item--valor-total"><b>Total R$ {formatMoney(product.Preco, 2, ',', '.')}</b></p>
                        </>
                }
                {/* <p className="card-item--estoque">{product.Estoque > 0 ? `${product.Estoque} disponíveis` : <span className="no-stock">Producto no disponible</span>}</p> */}
                <p className="card-item--estoque">{product.Estoque > 0 ? `` : <span className="no-stock">Producto no disponible</span>}</p>
            </div>
            {product.Estoque > 0 &&
                <div className="card-item--footer">
                    <form className="form-adicionar">
                        <button
                            type="button"
                            name="btn-item"
                            className="btn form-adicionar--btn"
                            onClick={decrement}>-</button>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            className="card-item--counter"
                            onChange={handleChange}
                            maxLength={4}

                        />
                        <button
                            type="button"
                            name="btn-item"
                            className="btn form-adicionar--btn"
                            onClick={increment}>+</button>
                    </form>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className={`_button ${adding && 'active'}`}
                    >
                        {adding
                            ? <><div className="spinner-border spinner-border-sm text-light"></div> Agregando</>                            
                            : 'Agregar al carrito'
                        }
                        
                    </button>
                </div>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect('', mapDispatchToProps)(ProductCard);