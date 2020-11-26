import React, { createElement } from 'react';
// import { Link } from 'react-router-dom';
import logo from './logo-colorida.png'

const LogoResponsive = () => {
    return (
        // <Link to="/" tabIndex="0" className="logo" aria-label="Logo da página, clique para redirecionar para a página inicial">
        //     <img src={logo} alt="Logo da " />
        // </Link>
        createElement('a', { href: "/", tabIndex: 0, className: "logo", "aria-label": "Logo da página, clique para redirecionar para a página inicial" },
            createElement('img', { src: logo, alt: "Shimano" })
        )
    )
}

export default LogoResponsive;