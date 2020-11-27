import React, { useState, useEffect } from 'react';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';

import Banner from '../components/Home/Banner';
// import Manufacturer from '../components/SideBar/Manufacturer';
// import Category from '../components/SideBar/Category';
import Promotion from '../components/Home/Promotion';
import TipBar from '../components/TipBar/TipBar';
import Release from '../components/Home/Release';
import BestSeller from '../components/Home/BestSeller';
import BannerAD from '../components/Home/BannerAD';
import OwnBrand from '../components/Home/OwnBrand';

import Modal from "react-bootstrap/Modal";
import { disconnect, setItemSession, getItemSession } from '../utils';
import { resetCart } from '../services/cart-api';
import * as CartActions from '../store/actions/cart'
import { connect } from 'react-redux';
import { fetchProductsByTagHome } from '../services/products-api';

const Home = ({ refreshCartFn }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFull, setIsOpenFull] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [releases, setReleases] = useState([]);
    const [ownBrands, setOwnBrands] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setReadMessage();
        setIsOpen(false);
    };

    const handleClearCart = () => {
        setIsOpenFull(true);
        setIsOpen(false);

        resetCart()
            .then(result => {
                setDados(result.data.Data.Pedido.ukPedido);

                const newStorage = {
                    "QuantidadeRegistrosTotal": 0,
                    "QuantidadeRegistrosRetornados": 0,
                    "Paginas": 1,
                    "ResultadosPorPagina": 0,
                    "Dados": []
                }
                setItemSession('_carrinho', JSON.stringify(newStorage))
                refreshCartFn(newStorage);

                setReadMessage();
                setIsOpenFull(false);
            })
            .catch(reject => {
                disconnect();
            })
    }

    useEffect(() => {
        const readMessage = getItemSession('_home_message');
        const numeroItens = getNumeroItens();

        if (numeroItens > 0 && readMessage !== "true") {
            showModal()
        }
    }, [])

    useEffect(() => {
        fetchProductsByTagHome('Promocao', 4)
            .then(result => {
                if (result.data.Data) {
                    setPromotions(result.data.Data.Dados)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
        fetchProductsByTagHome('Lancamento', 4)
            .then(result => {
                if (result.data.Data) {
                    setReleases(result.data.Data.Dados)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
        fetchProductsByTagHome('MarcaPropria', 4)
            .then(result => {
                if (result.data.Data) {
                    setOwnBrands(result.data.Data.Dados)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
        fetchProductsByTagHome('Revista', 4)
            .then(result => {
                if (result.data.Data) {
                    setBestSellers(result.data.Data.Dados)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }, [])

    const getNumeroItens = () => {
        const get = getItemSession('_dados');
        const dados = JSON.parse(get);
        return dados.NumeroItens;
    }

    const setDados = (novoUkPedido) => {
        setItemSession('_pedido', novoUkPedido);
    }

    const setReadMessage = () => {
        setItemSession('_home_message', true);
    }

    return (
        <>
            <Header />
            <Banner />
            <TipBar />
            <section className="conteudo_interno container">
                {/* <div className="filtro-sticky d-none d-lg-block">
                    <Manufacturer />
                    <Category />
                </div> */}
                <div className="cards-container">
                    <Promotion destaque={promotions} />
                    <Release destaque={releases} />
                    <BannerAD />
                    <BestSeller destaque={bestSellers} />
                    <OwnBrand destaque={ownBrands} />
                </div>
            </section>

            {/* <!-- Modal --> */}
            <Modal show={isOpen} className="modal modal-boleto fade">
                <Modal.Header>
                    <div className="modal-header_container">
                        {/* <h2 className="titulo h2">Existe(m) produto(s) em seu carrinho!</h2> */}
                        <h2 className="titulo h2">Seu carrinho está com produto(s)!</h2>
                    </div>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                        <i className="icon icon-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p>Deseja mantê-lo e continuar incluindo itens nele?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-primary btn-sm btn-modal-home" onClick={hideModal}>Sim, MANTER</button>{' '}
                    <button className="btn-warning btn-sm btn-modal-home" onClick={handleClearCart}>Não, ESVAZIAR</button>
                </Modal.Footer>
            </Modal>

            <Modal show={isOpenFull} className="modal">
                <Modal.Body>
                    <div className="text-center">
                        <h3>Esvaziando carrinho!</h3>
                        <p>Por favor, aguarde...</p>
                        <div>
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Footer />
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect('', mapDispatchToProps)(Home);