import React, { useState, useEffect, createElement } from 'react';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Modal from "react-bootstrap/Modal";
// default
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchClient } from '../services/client-api';
import { fetchCart, fetchPaymentTerms, postSelectedPaymentTerm, postEndCart, postSurveyRate } from '../services/cart-api';
import { fetchDeliveryDate } from '../services/invoices-api';
import { formatMoney, disconnect, formatDateToView, scrollToTop, setItemSession, getItemSession } from '../utils';
import * as CartActions from '../store/actions/cart'
import { connect } from 'react-redux';
import { Loader } from '../components/Loader/Loader';
const Swal = require('sweetalert2');

const Checkout = ({ refreshCartFn }) => {
    const [client, setClient] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [lastPaymentTerm, setLastPaymentTerm] = useState([]);
    const [confirmScreen, setConfirmScreen] = useState(false);
    const [inputs, setInputs] = useState({ idCondicaoPagamento: '' });
    const [deliveryDate, setDeliveryDate] = useState('');
    const [errors, setErrors] = useState([]);

    const [ratingOldInvoice, setRatingOldInvoice] = useState(null);
    const [rating, setRating] = useState(0);
    const [ratingObs, setRatingObs] = useState(null);

    // modal
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };
    // modal

    const getDados = getItemSession('_dados');
    const dados = JSON.parse(getDados);

    const pedido = getItemSession('_pedido');

    useEffect(() => {
        fetchClient(dados.idCliente)
            .then(result => {
                setClient(result.data.Data.Dados[0])
            });
    }, [])

    useEffect(() => {
        fetchCart(pedido)
            .then(result => {
                setInvoice(result.data.Data.Dados[0])
                if (result.data.Data.Dados[0].NumeroItens === 0) {
                    window.location.href = process.env.REACT_APP_BASE_URL
                }

                if (result.data.Data.Dados[0].idCondicaoPagamento > 0) {
                    setInputs({
                        ...inputs,
                        ['idCondicaoPagamento']: result.data.Data.Dados[0].idCondicaoPagamento
                    });
                }

                setRatingOldInvoice(pedido)
            })
            .catch(reject => {
                disconnect();
            })

    }, [])

    useEffect(() => {
        fetchPaymentTerms()
            .then(result => {
                setPaymentTerms(result.data.Data.Dados)

                const last = result.data.Data.Dados.filter(paymentTerm => paymentTerm.UltimaUtilizada === true)

                setLastPaymentTerm(last[0])
            })
    }, [])

    useEffect(() => {
        fetchDeliveryDate()
            .then(result => {
                setDeliveryDate(result.data.Data.Dados[0])
            })
            /* Deixado somente 1 disconnect */
            // .catch(reject => {
            //     disconnect();
            // })
    }, [])

    const handlePaymentTerm = (e) => {
        e.preventDefault();

        scrollToTop();

        setLoading(true);

        postEndCart()
            .then(resultEndCart => {
                if (resultEndCart.data.Codigo === 400 && resultEndCart.data.CodigoInterno === 18) {
                    setErrors(resultEndCart.data.Data.Resultados);
                    setLoading(false);
                } else {                    
                    setItemSession('_pedido', resultEndCart.data.Data.Pedido.ukPedido);

                    const newStorage = {
                        "QuantidadeRegistrosTotal": 0,
                        "QuantidadeRegistrosRetornados": 0,
                        "Paginas": 1,
                        "ResultadosPorPagina": 0,
                        "Dados": []
                    }
                    setItemSession('_carrinho', JSON.stringify(newStorage));
                    refreshCartFn(newStorage);

                    setLoading(false);
                    setConfirmScreen(true);

                    if (invoice.RealizarPesquisaSatisfacao) {
                        showModal();
                    }
                }
            })
            .catch(reject => {
                disconnect();
            })
    }

    const onInputChange = event => {
        const { name, value } = event.target;

        setInputs({
            ...inputs,
            [name]: value
        });

        postSelectedPaymentTerm(value);
    };

    const handleRate = ({ rating }) => {
        setRating(rating)
    }

    const onTextareaRateChange = event => {
        setRatingObs(event.target.value);
    };

    const handleSubmitRate = (e) => {
        e.preventDefault();
        postSurveyRate(ratingOldInvoice, rating, ratingObs)
            .then(result => {
                hideModal()
            })
            .catch(reject => {
                disconnect();
            })
    }

    return (
        <>
            <Header />
            <section className="container checkout">
                <h2 className="titulo h2">Fechamento do Pedido</h2>
                <div className="checkout--container">
                    {!isLoading ? (
                        !confirmScreen &&
                        <div className="checkout--wrapper">
                            {errors.length > 0 &&
                                <div class="alert alert-danger" role="alert">
                                    <h4 class="alert-heading">Atenção, seu pedido não foi gerado!</h4>
                                    <p>Verifique o(s) erro(s) listado(s) abaixo:</p>
                                    <hr />
                                    <ul>
                                        {errors.map(error => (<li class="mb-0">{error.Mensagem}</li>))}
                                    </ul>
                                    {createElement('a', { href: '/carrinho', className: 'link-texto' }, 'Voltar para o carrinho')}
                                </div>
                            }

                            <div className="checkout--campo">
                                <h4 className="titulo h4">Faturamento</h4>
                                <p className="checkout--texto">Faturar para {client.RazaoSocial}</p>
                            </div>
                            <div className="checkout--campo">
                                <h4 className="titulo h4">Entrega</h4>
                                <p className="checkout--texto">Endereço de Entrega</p>
                                <p className="checkout--texto mt-0 checkout--max_width">{client.EnderecoCompleto}</p>
                                <p className="checkout--texto titulo--bold">Data de entrega prevista: {' '}
                                    {!deliveryDate.DataEntrega
                                        ? 'Em definição'
                                        : formatDateToView(deliveryDate.DataEntrega)}
                                </p>
                            </div>
                            <div className="checkout--campo">
                                <h4 className="titulo h4">Pagamento</h4>
                                <form action="">
                                    <fieldset className="form-group">
                                        <label className="checkout--label" htmlFor="select-checkout">Condição de pagamento</label>                                        
                                            <select class="form-control" onChange={onInputChange} required name="idCondicaoPagamento" id="select-checkout">
                                                <option value="">Escolha o número de parcelas</option>
                                                {paymentTerms.map((paymentTerm, index) => (
                                                    <option
                                                        key={`payment-${index}`}
                                                        value={paymentTerm.idCondicaoPagamento}
                                                        selected={paymentTerm.idCondicaoPagamento === inputs.idCondicaoPagamento}
                                                    >{paymentTerm.nParcelas}x ({paymentTerm.Descricao})</option>
                                                ))}
                                            </select>
                                    </fieldset>
                                </form>
                                <p className="checkout--texto checkout--texto-icon">
                                    {lastPaymentTerm &&
                                        <>
                                            <img src="./img/icone-info.svg" alt="" />
                                            <span>Última condição utilizada | <b>{lastPaymentTerm.Descricao}</b></span>
                                        </>
                                    }
                                </p>
                                <p className="checkout--texto">Taxa de Juros: 0%</p>
                                <p className="checkout--texto mt-2">Encargos: R$ {invoice.ValorTotalImposto ? formatMoney(invoice.ValorTotalImposto, 2, ',', '.') : '0,00'}</p>
                            </div>
                            <div className="checkout--campo">
                                <h4 className="titulo h4">Fechamento</h4>
                                <div className="checkout--container_valor">
                                    <p className="checkout--texto_valor">Valor Total <span className="checkout--valor">R$ {formatMoney(invoice.Valor, 2, ',', '.')}</span></p>
                                    {inputs.idCondicaoPagamento > 0
                                        ? <button data-toggle="modal" data-target="#modalCheckout" className="btn btn--laranja">Finalizar Pedido</button>
                                        : <button onClick={() =>  alert("Selecione a Condição de Pagamento")} className="btn btn--laranja">Finalizar Pedido</button>
                                    }
                                </div>
                            </div>
                        </div>

                    ) : (
                            <Loader short="false" />
                        )}

                    {confirmScreen &&
                        <div className="checkout--sucesso">
                            <span className="icobutton">
                                <span className="icon icon-check"></span>
                            </span>

                            <h2 className="titulo h2 text-center">Seu pedido foi concluído <br /> com sucesso!</h2>

                            {createElement('a', { href: '/pedidos', className: 'btn btn--lg btn--roxo btn--bold' }, 'Ver todos os seus pedidos')}
                        </div>
                    }
                </div>
                <div className="text-center">
                    {createElement('a', { href: '/carrinho', className: 'link-texto' }, 'Voltar para o carrinho')}
                </div>
            </section>

            {/* <!-- Modal --> */}
            <Modal show={isOpen} className="modal modal-rate fade">
                <Modal.Body>
                    <div className="text-center">
                        <form onSubmit={handleSubmitRate}>
                            <h4>Qual o seu nível de satisfação com a experiência de compra?</h4>
                            <Rater
                                total={5}
                                rating={rating}
                                onRate={handleRate}
                            />
                            <br /><br />
                            Para qualquer observação, preencha o campo abaixo <small>(opcional)</small>:
                            <textarea onChange={onTextareaRateChange} required name="obs" className="input textarea" id="obs" rows="3"></textarea>
                            <br />
                            <button type="submit" className="btn btn--laranja btn--full">Enviar</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            <div className="modal modal-checkout fade" id="modalCheckout" tabIndex="-1" role="dialog" aria-labelledby="modalCheckout" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span className="icon icon-times"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className="titulo h2 text-center">Finalizar Pedido?</h2>
                            <p>Deseja finalizar seu pedido de número - {invoice.NumeroPedido}?</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handlePaymentTerm} name="btn-checkout" data-dismiss="modal" aria-label="Close" className="btn btn--lg btn--laranja btn--bold">Sim, Finalizar!</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect('', mapDispatchToProps)(Checkout);