import React, { createElement } from 'react';
import ProductCard from '../Product/ProductCard';
import { arrOrigin } from '../../constants';

const Release = ({ destaque }) => {
    return (
        <>
        <div className="box">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="">
                            <h4 className="titulo h4">Lançamentos</h4>
                            {/* <a href="/destaque/lancamento" className="link-texto text-decoration-none mr-md-3">ver todo</a> */}
                            {createElement('a', { href: "/destaque/lancamento", className: "link-texto text-decoration-none mr-md-3" }, "ver todo")}
                        </div>

                        <div className="cards cards-produto cards-produto-width-1">
                        {destaque.map(product =>
                            <ProductCard
                                key={`release-card-${product.idProduto}`}
                                product={product}
                                origin={arrOrigin['home_lancamento']}
                            />
                        )}
                     </div>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}

export default Release;