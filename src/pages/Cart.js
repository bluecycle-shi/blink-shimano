import React, { useState, useEffect, createElement } from 'react';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';

import Modal from "react-bootstrap/Modal";
import { Loader } from '../components/Loader/Loader';
import { formatMoney, disconnect, scrollToTop } from '../utils';
import { fetchCartItems, removeFromCart, updateCart } from '../services/cart-api';
import { fetchProductsBySuggestion } from '../services/products-api';
import ProductCard from '../components/Product/ProductCard';
import { arrOrigin } from '../constants';
import * as CartActions from '../store/actions/cart'
import { connect } from 'react-redux';
import { setItemSession } from '../utils';

const Swal = require('sweetalert2');


const Cart = ({ cartItems, refreshCartFn }) => {
    const [productsSuggestion, setProdutosSuggestion] = useState([]);
    const [isLoadingSuggestion, setLoadingSuggestion] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState({});

    // modal
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };
    // modal

    const [qtd, setQtd] = useState(0);
    const [amount, setAmount] = useState(0);
    const [items, setItems] = useState([]);
    const [itemsUnavailable, setItemsUnavailable] = useState([]);

    const decrement = (idProduto, item, quantity) => {
        if (quantity > 1) {
            update(idProduto, item, quantity - 1);
        }
    }

    const increment = (idProduto, item, quantity) => {
        update(idProduto, item, quantity + 1);
    }

    const handleChange = (e) => {
        setInputValue({ [e.target.name]: e.target.value });
    }

    const handleBlur = (idProduto, item, e) => {
        e.preventDefault();

        let quantity = inputValue[e.target.name];

        if (parseInt(quantity) > 0) {
            update(idProduto, item, quantity);
        }
    }

    const update = (idProduto, item, quantity) => {
        setLoading(true);
        setAmount(0);
        setQtd(0);

        updateCart(idProduto, item, quantity)
            .then(resultUpdate => {
                if (resultUpdate.data.Codigo === 500) {
                    if (resultUpdate.data.CodigoInterno === 4) {
                        disconnect()
                        return
                    } else {
                        alert(resultUpdate.data.Status);
                    }
                }

                localFetchItem()
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }

    // Scroll
    useEffect(() => scrollToTop(), [isLoading]);

    const removeItem = (idProduto, item) => {
        setLoading(true);
        setAmount(0);
        setQtd(0);

        removeFromCart(idProduto, item)
            .then(result => {
                localFetchItem()
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }

    // Load Data
    useEffect(() => {
        scrollToTop();

        setLoading(true);

        fetchCartItems()
            .then(result => {
                setItems(result.data.Data.Dados)
                setQtd(result.data.Data.QuantidadeRegistrosTotal)

                //
                const total = result.data.Data.Dados.reduce((acc, curr) => acc + curr.ValorTotalFinal, 0);
                setAmount(total)

                //
                const unavailable = result.data.Data.Dados.filter(newarr => newarr.Estoque === 0);
                if (unavailable.length < 0) {
                    showModal()
                }
                setItemsUnavailable(unavailable);

                setLoading(false);

                //
                let inputArray = [];
                result.data.Data.Dados.map(item => inputArray.push(item.Quantidade));
                setInputValue(inputArray);
            })
            .catch(reject => {
                disconnect();
            })

        fetchProductsBySuggestion(5)
            .then(result => {
                if (result.data.Data) {
                    setProdutosSuggestion(result.data.Data.Dados)
                }
            })
            .then(result => setLoadingSuggestion(false))
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })

    }, [cartItems]);

    const localFetchItem = () => {
        fetchCartItems()
            .then(result => {
                setItemSession('_carrinho', JSON.stringify(result.data.Data))
                refreshCartFn(result.data.Data)
            })
            .then(result => setLoading(false))
            .catch(reject => {
                disconnect();
            })
    }

    return (
        <>
            <Header />
            <section className="meu-carrinho container">
                <div className="sect-header">
                    <div className="sect-titulo">
                        <h2 className="titulo h2">Meu carrinho</h2>
                        <h6 className="titulo h6">({qtd} Itens)</h6>
                    </div>
                </div>
                <div className="tabela-items--wrapper">
                    {!isLoading ? (
                        items.length > 0 ? (
                            <table className="tabela tabela-items">
                                <thead>
                                    <tr>
                                        <th>Imagem</th>
                                        <th>Nome do produto</th>
                                        <th>Quantidade</th>
                                        <th>Valor Unitário</th>
                                        <th>Valor Total</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={`cart-item-${index}`} className={`${item.Estoque < 1 && 'indisponivel'}`}>
                                            <td className="card-item--header">
                                                <img src={item.LinkImagemLista} alt="" className="img-card-produto" />
                                            </td>
                                            <td>
                                                <p>{item.Descricao}</p>
                                                <p>EAN: {item.EAN}</p>
                                                <p className="tabela-items--estoque">
                                                    {item.Estoque < 1
                                                        ? 'produto indisponível'
                                                        : `${item.Estoque} disponíveis`
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <form className="form-adicionar">
                                                    <button
                                                        type="button"
                                                        disabled={`${item.Estoque < 1 ? 'disabled' : ''}`}
                                                        name="btn-item"
                                                        className="btn form-adicionar--btn"
                                                        onClick={() => decrement(item.idProduto, item.Item, item.Quantidade)}>-</button>
                                                    <input
                                                        type="number"
                                                        disabled={`${item.Estoque < 1 ? 'disabled' : ''}`}
                                                        name={`quantity-${item.Item}`}
                                                        // usado o inputValue e nao o item.Quantidade para poder pegar valor do useState
                                                        value={inputValue[index]}
                                                        className="card-item--counter"
                                                        maxLength={4}
                                                        onChange={handleChange}
                                                        onBlur={(e) => handleBlur(item.idProduto, item.Item, e)}
                                                        // enter: e.which == 13
                                                        onKeyPress={(e) => e.which == 13 ? handleBlur(item.idProduto, item.Item, e) : ''}
                                                    />
                                                    <button
                                                        type="button"
                                                        disabled={`${item.Estoque < 1 ? 'disabled' : ''}`}
                                                        name="btn-item"
                                                        className="btn form-adicionar--btn"
                                                        onClick={() => increment(item.idProduto, item.Item, item.Quantidade)}>+</button>
                                                </form>
                                            </td>
                                            <td>R$ {formatMoney(item.ValorFinal, 2, ',', '.')}</td>
                                            <td>R$ {formatMoney(item.ValorTotalFinal, 2, ',', '.')}</td>
                                            <td className="text-center">
                                                <button type="button" onClick={() => { if (window.confirm('Deseja excluir esse item?')) removeItem(item.idProduto, item.Item) }} className="btn btn--icon tabela-items--delete"><span className="icon icon-trash"></span></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                                <span>Carrinho vazio!</span>
                            )
                    ) : (
                            <Loader short="false" />
                        )}
                </div>
                <div className="sect-footer">
                    {items.length > 0 &&
                        <h3 className="titulo h3">Valor Total <span className="c-laranja arial-bold"> R$ {formatMoney(amount, 2, ',', '.')} </span></h3>
                    }
                    <div className="sect-btn">
                        {items.length > 0 &&
                            createElement('a', { href: "/checkout", className: "btn btn--laranja btn--block btn--full btn--bold" }, "Ir para o fechamento")
                        }
                        {createElement('a', { href: "/", className: "btn btn-link btn--bold" }, "Continuar Comprando")}
                        {/* <a href="/" className="btn btn-link btn--bold">Continuar Comprando</a> */}
                    </div>
                </div>

                <h4 className="titulo h4 mais-produtos-titulo">Produtos para incrementar seu pedido</h4>
                <div className="conteudo_interno">
                    <div className="cards-container">
                        <div className="overflow-auto">
                            <div className="cards cards-produto cards-produto-width-5 mais-produtos-cards">
                                {!isLoadingSuggestion ? (
                                    productsSuggestion.map(product =>
                                        <ProductCard
                                            key={`cart-card-${product.idProduto}`}
                                            product={product}
                                            origin={arrOrigin['pagina_carrinho_incrementar']}
                                        />
                                    )
                                ) : (
                                        <Loader short="false" />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Modal --> */}
            <Modal show={isOpen} className="modal modal-boleto fade">
                <Modal.Header>
                    <div className="modal-header_container">
                        <img src="./img/img-modal-indisponivel.png" alt="Imagem representativa de ma folha de papel" />
                        <h2 className="titulo h2">Produto Indisponível</h2>
                        <p>Desculpe, o(s) produto(s) acabaram nos nossos estoques.</p>
                    </div>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                        <i className="icon icon-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <ol className="lista-modal">
                        {itemsUnavailable.map(product => (
                            <li key={`unavailable-${product.idProduto}`} className="lista-modal_item">{product.Descricao}</li>
                        ))}
                    </ol>
                </Modal.Body>
            </Modal>

            <Footer />
        </>
    )
}


const mapStateToProps = state => ({
    cartItems: state.cart.items
})

const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);