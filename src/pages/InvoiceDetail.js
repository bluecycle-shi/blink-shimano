import React, { useState, useEffect, createElement } from 'react';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Loader } from '../components/Loader/Loader';
import { formatMoney, disconnect, formatDateToView, setItemSession } from '../utils';
import { fetchInvoice, fetchInvoiceItems, fetchTracking, fetchExcel, fetchNF } from '../services/invoices-api';
import { postDuplicateCart, fetchCartItems } from '../services/cart-api';
import { trackingIcons } from '../constants/'
import * as CartActions from '../store/actions/cart'
import { connect } from 'react-redux';

const Swal = require('sweetalert2');

const InvoiceDetail = ({ match, refreshCartFn }) => {
    const [isLoading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [trackings, setTracking] = useState([]);
    const [notasFiscais, setNotasFiscais] = useState([]);

    const idInvoice = match.params.id;

    useEffect(() => {
        fetchInvoice(idInvoice)
            .then(result => {
                setInvoice(result.data.Data.Dados[0])
                setLoading(false)
            })
            .catch(reject => {
                disconnect();
            })
    }, [])

    useEffect(() => {
        fetchInvoiceItems(idInvoice)
            .then(result => {
                if (result.data.Data) {
                    setInvoiceItems(result.data.Data.Dados)
                    setLoading(false)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }, [])

    useEffect(() => {
        fetchTracking(idInvoice)
            .then(result => {
                if (result.data.Data) {
                    setTracking(result.data.Data.Dados)
                    setLoading(false)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }, [])

    useEffect(() => {
        fetchNF(idInvoice)
            .then(result => {
                if (result.data.Data) {
                    setNotasFiscais(result.data.Data.Dados)
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }, [])

    const handleExcel = () => {
        fetchExcel(idInvoice)
            .then(result => {
                const data = result.data.Data.Arquivo;
                const arrayBuffer = base64ToArrayBuffer(data);
                createAndDownloadBlobFile(arrayBuffer, result.data.Data.NomeArquivo);
            })
            .catch(reject => {
                disconnect();
            })

    }

    const handleDuplicateInvoice = (idInvoice) => {
        postDuplicateCart(idInvoice)
            .then(result => {
                if (result.data.Codigo === 200) {
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

    function base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        return bytes.map((byte, i) => binaryString.charCodeAt(i));
    }

    function createAndDownloadBlobFile(body, filename) {
        const blob = new Blob([body]);
        const fileName = filename;
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            // Browsers that support HTML5 download attribute
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const ItemStatusIcon = invoiceItem => {
        const faturada = invoiceItem.invoiceItem.QuantidadeFaturada;
        const pedida = invoiceItem.invoiceItem.QuantidadePedida;

        if (faturada === 0) {
            return <span className="icon icon-times c-laranja"></span>
        }

        if (faturada === pedida) {
            return <span className="icon icon-check c-roxo"></span>
        }

        if (faturada < pedida) {
            return <span className="icon icon-brightness c-roxo"></span>
        }
    }

    const Tracking = () => {
        return trackings.map((tracking, index) => (
            <li key={`track-${index}`} className={tracking.Data ? "step step--active" : "step"}>
                <div className="step-icon"><span className={`icon ${trackingIcons[tracking.CodigoStatusPedido]}`}></span></div>
                <div className="step-conteudo">
                    <span className="step-data">{tracking.Data && formatDateToView(tracking.Data)}</span>
                    <h6 className="titulo h6">{tracking.Status}</h6>
                </div>
            </li>
        ))
    }

    return (
        <>
            <Header />
            <section className="pedidos-detalhe container">
                <div className="sect-header">
                    <ul className="breadcrumb list-unstyled">
                        <li>
                            {/* <a href="index.html">Página Principal</a> */}
                            {createElement('a', { href: '/' }, "Página Principal")}
                        </li>
                        <li>
                            {/* <a href="pedidos.html">Meus Pedidos</a> */}
                            {createElement('a', { href: '/pedidos' }, "Meus Pedidos")}
                        </li>
                        <li className="active">Detalhe do Pedido</li>
                    </ul>
                    <div className="sect-titulo">
                        <h2 className="titulo h2">Pedido <span className="c-laranja">{invoice.NumeroPedido}</span></h2>
                    </div>
                </div>
                <div className="row pedidos-detalhe--wrapper">
                    <div className="col-6 col-md-3 col-lg-2 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Status do pedido:</span>
                        <p className="pedidos-detalhe--item-conteudo"><b>{invoice.Status}</b></p>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Valor da compra:</span>
                        <p className="pedidos-detalhe--item-conteudo"><b>R$ {formatMoney(invoice.Valor, 2, ',', '.')}</b></p>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Condição de Pagamento</span>
                        <p className="pedidos-detalhe--item-conteudo"><b>{invoice.CondicaoPagamento}</b></p>
                    </div>
                    <div className="col-6 col-md-3 col-lg-3 col-xl-2 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Data da Entrega Prevista:</span>
                        <p className="pedidos-detalhe--item-conteudo"><b>
                            {!invoice.DataEntrega
                                ? 'Em definição'
                                : formatDateToView(invoice.DataEntrega) + '-' + invoice.PeriodoEntrega}</b>
                        </p>
                    </div>
                    <div className="col-lg-3 col-xl-4 pedidos-detalhe--item">
                        <button data-toggle="modal" data-target="#modalPedidosDetalhe" className="btn btn--lg btn--branco btn--full btn--bold"><span className="icon icon-bar-code"></span><span>Boleto de pagamento</span></button>
                    </div>
                </div>
                <div className="row pedidos-detalhe--wrapper">
                    <div className="col-md-5 col-lg-4 col-xl-3 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Endereço da Entrega</span>
                        <p className="pedidos-detalhe--item-conteudo">{invoice.EnderecoEntrega}</p>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Agendamento da Entrega:</span>
                        <p className="pedidos-detalhe--item-conteudo">Tempo estimado sujeito a mudanças</p>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2 pedidos-detalhe--item">
                        <span className="pedidos-detalhe--item-titulo">Data da Compra:</span>
                        <p className="pedidos-detalhe--item-conteudo"><b>{formatDateToView(invoice.DataEmissao)}</b></p>
                    </div>
                    <div className="col-lg-3 col-xl-4 pedidos-detalhe--item">
                        <button data-toggle="modal" data-target="#modalNotaFiscal" className="btn btn--lg btn--branco btn--full btn--bold"><span className="icon icon-invoice"></span><span>Nota Fiscal</span> <span className="badge badge-roxo">{notasFiscais.length}</span></button>
                    </div>
                </div>

                <div className="steps">
                    <ol className="steps-lista list-unstyled">
                        {!isLoading ? (
                            <Tracking />
                        ) : (
                                <Loader short="false" />
                            )}
                    </ol>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6 col-lg-6">
                        <h2 className="titulo h2 mb-0">Itens do pedido</h2>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <a onClick={handleExcel} className="btn btn--lg btn--branco btn--bold">
                            <i className="icon icon-doc-excel"></i>
                            <span>Download Excel</span>
                        </a>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <a onClick={() => { if (window.confirm('Deseja repetir esse pedido?')) handleDuplicateInvoice(invoice.idPedido) }} className="btn btn--lg btn--branco btn--bold">
                            <i className="fa fa-refresh"></i>
                            <span>Repetir Pedido</span>
                        </a>
                    </div>
                </div>

                <div className="tabela-overflow">
                    {!isLoading ? (
                        <table className="tabela tabela-listrada">
                            <thead>
                                <tr>
                                    <th width="40" className="text-center">Status</th>
                                    <th width="100" className="text-center">Qtd. Atendida</th>
                                    <th width="100" className="text-center">Quantidade</th>
                                    <th>Descrição</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceItems.map(invoiceItem =>
                                    <tr key={`invoice-item-${invoiceItem.Item}`}>
                                        <td className="text-center">
                                            <ItemStatusIcon invoiceItem={invoiceItem} />
                                        </td>
                                        <td className="text-center">{invoiceItem.QuantidadeFaturada}</td>
                                        <td className="text-center">{invoiceItem.QuantidadePedida}</td>
                                        <td>{invoiceItem.Descricao}</td>
                                        <td>
                                            {/* <a href="produtos-detalhe.html" className="link-texto link-texto--roxo font-weight-normal">Ver produto</a> */}
                                            {createElement('a', { href: `/produto/${invoiceItem.idProduto}`, target: "_blank", className: "link-texto link-texto--roxo font-weight-normal" }, "Ver produto")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                            <Loader short="false" />
                        )}
                </div>

                <div className="sect-footer align-items-start">
                    {createElement('a', { href: '/pedidos', className: "btn btn--cinza btn--block btn-full btn--bold" }, "Voltar")}
                </div>
            </section>
            <Footer />

            {/* <!-- Modal Boleto --> */}
            <div className="modal modal-boleto fade" id="modalPedidosDetalhe" tabIndex="-1" role="dialog" aria-labelledby="modalPedidosDetalhe" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-header_container">
                                <img src="../img/img-modal.png" alt="Imagem representativa de uma folha de papel" />
                                <h2 className="titulo h2">Seu boleto está disponível no portal Rede blink</h2>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i className="icon icon-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ol className="lista-modal">
                                <li className="lista-modal_item">Acesse o Portal</li>
                                <li className="lista-modal_item">Entre no item <span>"Central de Compras"</span> do menu</li>
                                {/* <li className="lista-modal_item">Lorem Ipsum</li> */}
                                {/* <li className="lista-modal_item">Ipsum Lorem dorime</li> */}
                            </ol>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* <!-- Modal NF --> */}
            <div className="modal modal-boleto modal-nota fade" id="modalNotaFiscal" tabIndex="-1" role="dialog" aria-labelledby="modalNotaFiscal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-header_container">
                                <h2 className="titulo h2">Notas Fiscais Disponíveis</h2>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i className="icon icon-times"></i>
                            </button>
                        </div>
                        <div className="modal-body px-0">
                            <table className="table table-borderless mb-0">
                                <thead>
                                    <tr>
                                        <th>Número Nota Fiscal</th>
                                        <th>Data</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notasFiscais.map(notaFiscal => (
                                        <tr>
                                            <td>{notaFiscal.NumeroNF}</td>
                                            <td>{formatDateToView(notaFiscal.DataEmissao)}</td>
                                            <td><a href={notaFiscal.Link} target="_blank" className="link-texto link-texto--roxo font-weight-normal">Ver Nota</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button data-dismiss="modal" aria-label="Close" className="btn btn--lg btn--roxo btn--bold">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapDispatchToProps = dispatch => ({
    refreshCartFn: (data) => dispatch(CartActions.refreshCart(data))
})

export default connect('', mapDispatchToProps)(InvoiceDetail);