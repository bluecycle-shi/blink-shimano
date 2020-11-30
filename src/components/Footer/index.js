import React, { useEffect, useState, createElement } from 'react';
// import { Link } from 'react-router-dom';
import FooterHomolog from './Homolog';
import { getItemSession } from '../../utils';

export default function Footer() {
    const [isHomolog, setIsHomolog] = useState(false);
    const [versionApi, setVersionApi] = useState('');

    useEffect(() => {
        const dadosHomolog = getItemSession('blink_homolog');
        setIsHomolog(dadosHomolog);

        const dadosVersion = getItemSession('blink_versao');
        setVersionApi(JSON.parse(dadosVersion));
    }, [])

    return (
        <footer className="footer">
            <div className="container">
                <div className="contato-container">
                    <nav className="nav-footer">
                        
                    </nav>
                </div>
                <div className="copyright">
                    <div className="copyright--container">
                        <p className="footer--texto">@{new Date().getFullYear()} Blink Systems - Todos os direitos reservados</p>
                        <div className="copyright--desenv">
                            <p className="footer--texto arial-bold mb-lg-0">Desenvolvido por Blink Systems Acessoria e Informática Ltda</p>
                            <p className="footer--texto arial-bold mb-0">Blink WebSales / Versão: {process.env.REACT_APP_VERSION} / API {versionApi}</p>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHomolog 
                flag={isHomolog}
                version={process.env.REACT_APP_VERSION}
                versionApi={versionApi}
            />
        </footer>
    )
}