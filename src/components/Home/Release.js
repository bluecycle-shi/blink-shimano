import React, { createElement } from 'react';
import ProductCard from '../Product/ProductCard';
import { arrOrigin } from '../../constants';

const Release = ({ destaque }) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="titulo h4">Lançamentos</h4>
                {/* <a href="/destaque/lancamento" className="link-texto text-decoration-none mr-md-3">ver todas</a> */}
                {createElement('a', { href: "/destaque/lancamento", className: "link-texto text-decoration-none mr-md-3" }, "ver todas")}
            </div>
            <div className="overflow-auto">
                <div className="cards cards-produto cards-produto-width-4">
                    {destaque.map(product =>
                        <ProductCard
                            key={`release-card-${product.idProduto}`}
                            product={product}
                            origin={arrOrigin['home_lancamento']}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Release;