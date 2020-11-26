import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';

import Manufacturer from '../components/SideBar/Manufacturer';
import Category from '../components/SideBar/Category';

import ProductCard from '../components/Product/ProductCard';
import { Loader } from '../components/Loader/Loader';
import { scrollToTop, disconnect } from '../utils';
import { fetchProductsByTag } from '../services/products-api';
import { arrHighlights, arrOrigin } from '../constants'
import BannerInterno from '../components/Highlights/BannerInterno';

const Highlights = ({ match }) => {
    const [isLoading, setLoading] = useState(true);
    const [qtd, setQtd] = useState(0);
    const [products, setProducts] = useState([]);

    const [highlight, setHighlight] = useState('');

    // Props
    const nameHighlight = match.params.name;

    // Paginate
    const [currentPage, setCurrentPage] = useState(1);
    const totalRecords = qtd;
    const recordPerPage = process.env.REACT_APP_PAGINATION_RECORD_PER_PAGE;
    const pageRange = process.env.REACT_APP_PAGINATION_PAGE_RANGE;

    const handlePageChange = pageNumber => {
        if (currentPage !== pageNumber) {
            setLoading(true)
            setCurrentPage(pageNumber);
        }
    }

    // Scroll
    useEffect(() => scrollToTop(), [isLoading]);

    // Load Data
    useEffect(() => {
        setHighlight(arrHighlights[nameHighlight]);

        fetchProductsByTag(nameHighlight, currentPage, recordPerPage)
            .then(result => {
                if (result.data.Data) {
                    setProducts(result.data.Data.Dados)
                    setQtd(result.data.Data.QuantidadeRegistrosTotal)
                }
            })
            .then(result => setLoading(false))
            /* Deixado somente 1 disconnect */
            // .catch(reject => {
            //     disconnect();
            // })
    }, [currentPage])

    return (
        <>
            <Header />
            <section className="conteudo_interno conteudo_padrao container">
                <div className="filtro-sticky d-none d-lg-block">
                    <Manufacturer />
                    <Category />
                </div>
                <div className="cards-container">
                    <div className="titulo-container">
                        <h4 className="titulo h2">{highlight.titulo}</h4>
                        <p className="total-itens">Total de Itens: <span className="total-itens_numero">{qtd}</span></p>
                    </div>

                    <BannerInterno nameHighlight={nameHighlight} />

                    <div className="cards cards-produto">
                        {!isLoading ? (
                            products.map( product =>
                                <ProductCard
                                    key={`highlight-card-${product.idProduto}`}
                                    product={product}
                                    origin={arrOrigin[`pagina_${nameHighlight}`]}
                                />
                            )
                        ) : (
                                <Loader short="false" />
                            )}
                    </div>
                    <nav aria-label="paginacao-promocoes">
                        {!isLoading &&
                            <Pagination
                                hideFirstLastPages
                                activePage={currentPage}
                                itemsCountPerPage={parseInt(recordPerPage)}
                                totalItemsCount={totalRecords}
                                pageRangeDisplayed={parseInt(pageRange)}
                                onChange={handlePageChange}
                                innerClass="pagination justify-content-end"
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        }
                    </nav>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Highlights;