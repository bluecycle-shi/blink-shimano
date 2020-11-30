import React, { createElement } from 'react';
import ProductCard from '../Product/ProductCard';
import { arrOrigin } from '../../constants';

const OwnBrand = ({ destaque }) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="titulo h4">Marca Própria</h4>
                {/* <a href="/destaque/marcapropria" className="link-texto text-decoration-none mr-md-3">ver todas</a> */}
                {createElement('a', { href: "/destaque/marcapropria", className: "link-texto text-decoration-none mr-md-3" }, "ver todas")}
            </div>
            <div className="overflow-auto">
                <div className="cards cards-produto cards-produto-width-4">
                    {destaque.map(product =>
                        <ProductCard
                            key={`own-brand-card-${product.idProduto}`}
                            product={product}
                            origin={arrOrigin['home_marcapropria']}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default OwnBrand;