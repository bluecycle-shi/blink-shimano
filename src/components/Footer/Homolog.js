import React from 'react';
import './homolog.css';

const FooterHomolog = props => {
    let { flag } = props;
    
    if (flag !== "true") {
        return null;
    }

    return (
        <div className="homolog-bar">
            <span>Ambiente de Homologação</span> | <span>Versão: {props.version} / API {props.versionApi}</span>
        </div>
    )
}

export default FooterHomolog;