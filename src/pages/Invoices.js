import React, { useState, useEffect, createElement, useRef } from 'react';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAllInvoices } from '../services/invoices-api';
import { formatMoney, disconnect, formatDateToView, formatDateToDatabase, setItemSession } from '../utils';
import { Loader } from '../components/Loader/Loader';
import { postDuplicateCart, fetchCartItems } from '../services/cart-api';
import { trackingIcons } from '../constants/'
import * as CartActions from '../store/actions/cart'
import { connect } from 'react-redux';
const Swal = require('sweetalert2');

const Invoices = ({ refreshCartFn }) => {
    const [isLoading, setLoading] = useState(true);
    const [qtd, setQtd] = useState(0);
    const [invoices, setInvoices] = useState([]);

    const [inputs, setInputs] = useState({
        numeroPedido: ''
    });

    const fetchLocal = (numeroPedido = null, dataInicial = null, dataFinal = null) => {
        setLoading(true);

        fetchAllInvoices(numeroPedido, dataInicial, dataFinal)
            .then(result => {
                setInvoices(result.data.Data.Dados)
                setQtd(result.data.Data.QuantidadeRegistrosTotal)
                setLoading(false)
            })
            .catch(reject => {
                disconnect();
            })
    }

    useEffect(() => {
        fetchLocal();
    }, [])

    const handleDuplicateInvoice = (idPedido) => {
        postDuplicateCart(idPedido)
            .then(resultDup => {
                if (resultDup.data.Codigo === 200) {
                    fetchCartItems()
                        .then(result => {
                            if (result.data.Data.Dados.length > 0) {
                                setItemSession('_carrinho', JSON.stringify(result.data.Data))
                                refreshCartFn(result.data.Data);
                                window.location = '/carrinho';
                            }
                        })
                        .catch(reject => {
                            disconnect();
                        })
                } else {
                    console.debug('Error')
                }
            })
    }

    const inputDate = useRef(null);

    const onInputChange = event => {
        const { name, value } = event.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let inputValue = inputDate.current.value;
        let dates = inputValue.split(" a ");

        const dataInicial = formatDateToDatabase(dates[0]);
        const dataFinal = formatDateToDatabase(dates[1]);

        fetchLocal(inputs.numeroPedido, dataInicial, dataFinal);
    }

    return (
        <>
            <Header />
            <section className="pedidos container">
                <div className="sect-header">
                    <div className="sect-titulo justify-content-between">
                        <h2 className="titulo h2">Pedidos</h2>
                        <h6 className="titulo h6">Total de Pedidos: <span className="arial-bold">{qtd}</span></h6>
                    </div>
                    <hr />
                </div>

                <h4 className="titulo h4">Pesquisar</h4>
                <form className="form-pedidos" onSubmit={handleSubmit}>
                    <fieldset className="form-pedidos--wrapper">
                        <label className="input-label" htmlFor="pedido-numero">Número do pedido</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Preencha com número do pedido"
                            name="numeroPedido"
                            onChange={onInputChange}
                        />
                    </fieldset>
                    <fieldset className="form-pedidos--wrapper">
                        <label className="input-label" htmlFor="pedido-periodo">Data do pedido</label>
                        <label htmlFor="pedido-periodo" className="label-daterangepicker">
                            <span className="icon icon-calendar"></span>
                            <span>De</span>
                            <input
                                ref={inputDate}
                                type="text"
                                className="input-daterangepicker"
                                name="daterange"
                                id="pedido-periodo"
                                readOnly="True"
                            />
                        </label>
                    </fieldset>
                    <button type="submit" className="btn btn--lg btn--laranja btn--full">Filtrar</button>
                </form>

                <h2 className="titulo h2 pedidos-titulo">Últimos Pedidos</h2>
                <div className="tabela-overflow">
                    {!isLoading ? (
                        invoices.length > 0 ? (

                            <table className="tabela tabela-listrada">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>N. Pedido ERP</th>
                                        <th>N. Pedido WEB</th>
                                        <th width="160">Data de Emissão</th>
                                        <th width="200">Data de Entrega Prevista</th>
                                        <th width="175">Valor</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((invoice, index) =>
                                        <tr key={index}>
                                            <td>
                                                <span className="position-relative">
                                                    <span className={`icon ${trackingIcons[invoice.CodigoStatusPedido]}`} title={invoice.Status}></span>
                                                    {/* <span className="tag--table tag--table-roxo">!</span> */}
                                                </span>
                                            </td>
                                            <td>{invoice.NumeroPedidoERP ? 'Em processamento': ''}</td>
                                            <td>{invoice.NumeroPedido}</td>
                                            <td>{formatDateToView(invoice.DataEmissao)}</td>
                                            <td>
                                                {!invoice.DataEntrega
                                                    ? 'Em definição'
                                                    : formatDateToView(invoice.DataEntrega) + '-' + invoice.PeriodoEntrega}
                                            </td>
                                            <td>R$ {formatMoney(invoice.Valor, 2, ',', '.')}</td>
                                            <td>
                                                {/* <a href="/" className="btn btn-link c-roxo">Ver pedido</a>  */}
                                                {createElement('a', { href: `/pedido/${invoice.idPedido}`, className: "c-roxo btn btn--link" }, <span className="fas fa-eye"></span>)}
                                                <button data-toggle="tooltip" data-placement="top" title="Repetir Pedido" className="c-roxo btn btn--link" onClick={() => { if (window.confirm('Deseja repetir esse pedido?')) handleDuplicateInvoice(invoice.idPedido) }}><span className="fa fa-refresh"></span></button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                                <div className="alert alert-warning" role="alert">
                                    Nenhum pedido encontrado
                                </div>
                            )

                    ) : (
                            <Loader short="false" />
                        )}

                </div>

                <div className="sect-footer align-items-start">
                    {/* <a href="/" className="btn btn--cinza btn--block btn-full btn--bold">Voltar</a> */}
                    {createElement('a', { href: '/', className: "btn btn--cinza btn--block btn-full btn--bold" }, "Voltar")}
                </div>
            </section>
            <Footer />
        </>
    );
}

const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect('', mapDispatchToProps)(Invoices);