import React, { createElement, useEffect } from 'react';

const Unauthorized = () => {
    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <>
            <section className="conteudo_interno container">
                <div className="text-center">
                    <h1 className="display-4">Oops!</h1>
                    <p>Desculpe, ocorreu um erro com a ação executada.</p>
                    <p>Dados informados para o login não conferem. Por favor, entre em contato com seu Consultor de Franquias ou registre uma solicitação na Central {createElement('a', { href: process.env.REACT_APP_URL_CLIENTE_EM_FOCO, className: "btn btn-link" }, "Cliente em Foco")}</p>

                    {process.env.REACT_APP_HOMOLOG === 'true' && createElement('a', { href: "/login", className: "mt-5 btn btn--laranja btn--block btn--full btn--bold" }, "Efetuar login")}
                </div>
            </section>
        </>
    )
}

export default Unauthorized;