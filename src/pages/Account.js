import React, { useState, useEffect, createElement } from 'react';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';

import { fetchClient, fetchSeller } from '../services/client-api';
import { disconnect, getItemSession } from '../utils';

const Account = () => {
    const [client, setClient] = useState([]);
    const [seller, setSeller] = useState([]);

    const dados = JSON.parse(getItemSession('_dados'))
    const idCliente = dados.idCliente;

    // Load Data
    useEffect(() => {
        fetchClient(idCliente)
            .then(result => {
                if (result.data.Data) {
                    setClient(result.data.Data.Dados[0])
                }
            })
            .catch(reject => {
                disconnect();
            })
    }, [])

    //
    useEffect(() => {
        fetchSeller(idCliente)
            .then(result => {
                if (result.data.Data) {
                    setSeller(result.data.Data.Dados[0])
                }
            })
        /* Deixado somente 1 disconnect */
        // .catch(reject => {
        //     disconnect();
        // })
    }, [])

    return (
        <>
            <Header />
            <section className="minha-conta container">
                <div className="minha-conta--wrapper">
                    <div className="sect-header">
                        <div className="sect-titulo">
                            <h2 className="titulo h2">Minha Conta</h2>
                        </div>
                        <hr />
                    </div>
                    <div className="minha-conta--conteudo">
                        <h4 className="titulo h4">{client.RazaoSocial}</h4>
                        <p className="sect-texto">{client.EnderecoCompleto}</p>
                        <h4 className="titulo h4">Meu Consultor</h4>
                        <h5 className="titulo h5">{seller.Nome}</h5>
                        <p className="sect-texto">{seller.Email}</p>
                        <p className="sect-texto">{seller.Telefone}</p>
                    </div>
                </div>
                <div className="sect-footer align-items-start">
                    {createElement('a', { href: '/', className: 'btn btn--cinza btn--block btn-full btn--bold' }, "Voltar")}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Account;