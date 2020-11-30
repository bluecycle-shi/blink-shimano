import React, { useState, useRef, useEffect, createElement } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Manufacturer from '../components/SideBar/Manufacturer';
import Category from '../components/SideBar/Category';
import { formatMoney, disconnect, setItemSession, getItemSession } from '../utils';
import {
    fetchProductsById,
    fetchProductsBySuggestion
} from '../services/products-api';
import { Loader } from '../components/Loader/Loader';
import ProductCard from '../components/Product/ProductCard';
import { arrOrigin } from '../constants';
import { addToCart, fetchCartItems, updateCart } from '../services/cart-api';
import * as CartActions from '../store/actions/cart'
import { connect } from 'react-redux';
const Swal = require('sweetalert2');

const Product = ({ match, origin, refreshCartFn }) => {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSuggestion, setLoadingSuggestion] = useState(true);
    const [product, setProduct] = useState('');
    const [productsSuggestion, setProdutosSuggestion] = useState([]);
    const [adding, setAdding] = useState(false)

    // Props
    const idProduto = match.params.id;

    const [quantity, setQuantity] = useState(1)

    const decrement = () => setQuantity(q => isNaN(q) || q < 2 ? 1 : q - 1);
    const increment = () => setQuantity(q => q >= 0 ? q + 1 : 1);

    const handleChange = (e) => {
        if (parseInt(e.target.value) > 0) {
            setQuantity(parseInt(e.target.value));
        } else {
            setQuantity();
        }
    }

    // Load Data
    useEffect(() => {
        fetchProductsById(idProduto)
            .then(result => {
                setProduct(result.data.Data.Dados[0])
            })
            .then(result => setLoading(false))
            .catch(reject => {
                disconnect();
            })
    }, [])

    useEffect(() => {
        fetchProductsBySuggestion(4)
            .then(result => {
                setProdutosSuggestion(result.data.Data.Dados)
            })
            .then(result => setLoadingSuggestion(false))
            .catch(reject => {
                disconnect();
            })
    }, [])

    const handleAddToCart = (e) => {
        e.preventDefault();
        document.getElementById("botaoRoxoPrincipal").setAttribute("disabled","disabled");;
        const intQuantity = parseInt(quantity);

        if (isNaN(intQuantity) || intQuantity < 1) {
            alert("Insira uma quantidade válida para o produto!");
            return false;
        }

        setAdding(true);

        buttonActionDisabled(e);

        // filtro para ver se produto já está no carrinho
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
                    } else {
                        fetchCartItems()
                            .then(result => {
                                if (result.data.Data.Dados.length > 0) {
                                    setItemSession('_carrinho', JSON.stringify(result.data.Data))
                                    refreshCartFn(result.data.Data)
                                }   
								setAdding(false);
                            })
                            .catch(reject => {
                                disconnect();
                            })

                    }
                })
                .catch(reject => {
                    disconnect();
                })

        } else {
            addToCart(product.idProduto, intQuantity, arrOrigin['pagina_produto'])
                .then(resultAdd => {
                    if (resultAdd.data.Codigo === 500) {
                        if (resultAdd.data.CodigoInterno == 4) {
                            disconnect()
                        } else {
                            alert(resultAdd.data.Status);
							setAdding(false);
                            time = 0;
                        }
                    } else {
                        fetchCartItems()
                            .then(result => {
                                if (result.data.Data.Dados.length > 0) {
                                    setItemSession('_carrinho', JSON.stringify(result.data.Data))
                                    refreshCartFn(result.data.Data)                                    
                                }
								setAdding(false);
                            })
                            .catch(reject => {
                                disconnect();
                            })
                    }
                })
                .catch(reject => {
                    disconnect();
                })
        }


        buttonActionEnabled(e);
    }

    const buttonActionDisabled = (e) => {
        e.target.disabled = true;
    }
    const buttonActionEnabled = (e) => {
        e.target.disabled = false;
    }

    return (
        <>
            <Header />
            <section className="conteudo_interno conteudo_padrao container produtos-detalhe">
                <div className="filtro-sticky d-none d-lg-block">
                    <Manufacturer />
                    <Category />
                </div>
                <div className="produtos-detalhe--wrapper">
                    {!isLoading ? (
                        <>
                            <div className="sect-header">
                                <h4 className="titulo h2">Produtos - {product.Descricao}</h4>
                                <hr />
                            </div>

                            <div className="produtos-detalhe--conteudo">
                                <div className="produtos-detalhe--img">
                                    <img src={product.LinkImagemDetalhe} alt="" />
                                </div>
                                <div className="produtos-detalhe--body">
                                    <h4 className="titulo h4">{product.Descricao}</h4>
                                    <p className="produtos-detalhe--codigo">EAN: {product.EAN}</p>
                                    <p className="produtos-detalhe--codigo">Código: {product.CodigoProduto}</p>
                                    <div className="produtos-detalhe--info">
                                        <div className="misc">
                                            <p>Embalagem</p>
                                            <p>{product.Embalagem}</p>
                                        </div>
                                        <div className="misc">
                                            <p>Unidade(s)</p>
                                            <p>{product.UnidadesPorCaixa}</p>
                                        </div>
                                    </div>
                                    {product.PossuiPrecoPromocional
                                        ?
                                        <>
                                            <p className="produtos-detalhe--valor--de"><strike>R$ {formatMoney(product.PrecoUnitario, 2, ',', '.')}</strike> <small>unidade</small></p>
                                            <p className="produtos-detalhe--valor--por">R$ {formatMoney(product.PrecoPromocionalUnitario, 2, ',', '.')} <small>unidade</small></p>
                                            <p className="produtos-detalhe--valor-total"><b>Total: de <strike>R$ {formatMoney(product.Preco, 2, ',', '.')}</strike> por R$ {formatMoney(product.PrecoPromocional, 2, ',', '.')}</b></p>
                                        </>
                                        :
                                        <>
                                            <p className="produtos-detalhe--valor">R$ {formatMoney(product.PrecoUnitario, 2, ',', '.')} <small>unidade</small></p>
                                            <p className="produtos-detalhe--valor-total"><b>Total R$ {formatMoney(product.Preco, 2, ',', '.')}</b></p>
                                        </>
                                    }
                                    <div className="produtos-detalhe--estoque">{product.Estoque > 0 ? `${product.Estoque} disponíveis` : <span className="badge badge-black-white">Produto indisponível</span>}</div>
                                    <hr />
                                    {product.Estoque > 0 &&
                                        <form className="form-adicionar">
                                            <button type="button" name="btn-item" className="btn form-adicionar--btn" onClick={decrement}>-</button>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={quantity}
                                                className="card-item--counter"
                                                onChange={handleChange}
                                                maxLength={4}
                                            />
                                            <button type="button" name="btn-item" className="btn form-adicionar--btn" onClick={increment}>+</button>
                                            <button
                                                type="button"
                                                onClick={handleAddToCart}
                                                class={`btn btn--sm btn--roxo btn--bold ${adding && 'active'}`}
                                                id="botaoRoxoPrincipal"
                                            >
                                                {adding
                                                    ? <><div className="spinner-border spinner-border-sm text-light"></div> Adicionando</>
                                                    : 'Adicionar'
                                                }
                                            </button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </>
                    ) : (
                            <Loader short="false" />
                        )}

                    <h4 className="titulo h4 mais-produtos-titulo">Produtos para incrementar seu pedido</h4>
                    <div className="cards-container">
                        <div className="overflow-auto">
                            <div className="cards cards-produto mais-produtos-4-cards cards-produto-width-4">
                                {!isLoadingSuggestion ? (
                                    productsSuggestion.map(product =>
                                        <ProductCard
                                            key={`product-detail-card-${product.idProduto}`}
                                            product={product}
                                            origin={arrOrigin['pagina_produto_incrementar']}
                                        />
                                    )
                                ) : (
                                        <Loader short="false" />
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="sect-footer align-items-start">
                        {createElement('a', { href: '/', className: 'btn btn--cinza btn--block btn-full btn--bold' }, "Voltar")}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect('', mapDispatchToProps)(Product); 