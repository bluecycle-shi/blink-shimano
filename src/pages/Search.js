import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';

import Manufacturer from '../components/SideBar/Manufacturer';
import Category from '../components/SideBar/Category';

import ProductCard from '../components/Product/ProductCard';
import { Loader } from '../components/Loader/Loader';
import { scrollToTop, disconnect, arrayStringToArrayInt, clearSubCategorias } from '../utils';
import { fetchProductsSearch } from '../services/products-api';
import { arrOrigin } from '../constants';
import { getCategoryById, getAllCategories } from '../containers/CategoriesContainer';
import { getManufacturerById } from '../containers/ManufacturersContainer';

const Search = () => {
    const [isLoading, setLoading] = useState(true);
    const [qtd, setQtd] = useState(0);
    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [manufacturer, setManufacturer] = useState([]);

    let search = window.location.search;
    let params = new URLSearchParams(search);

    const term = params.get('t') || '';
    const fornecedores = params.get('f') || '';
    let arrFornecedores = fornecedores ? arrayStringToArrayInt(fornecedores) : [];
    const categorias = params.get('c') || '';
    let arrCategorias = categorias ? arrayStringToArrayInt(categorias) : [];
    const subCategorias = params.get('s') || '';
    let arrSubCategorias = subCategorias ? arrayStringToArrayInt(subCategorias) : [];

    const filterHierarquia = (idList) => {
        let posArrHierarquia;
        
        let arr = idList;

        for (let a in arr) {
            posArrHierarquia = getCategoryById(arr[a]);
            arr[a] = posArrHierarquia.Hierarquia
        }

        return arr;
    }

    let arrHierarquia = null;
    let arrClearSubCategorias = null;
    let xArrClearSubCategorias = null;

    if (subCategorias) {
        xArrClearSubCategorias = clearSubCategorias(arrSubCategorias, arrCategorias, getAllCategories(0));

        arrClearSubCategorias = clearSubCategorias(arrSubCategorias, arrCategorias, getAllCategories(0));
        arrHierarquia = filterHierarquia(arrClearSubCategorias);
    }

    if (categorias && (arrHierarquia === null || arrHierarquia.length === 0)) {
        arrHierarquia = filterHierarquia(arrayStringToArrayInt(categorias))
    }


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
        if (term === '' && fornecedores === '' && categorias === '') {
            window.location.href = '/';
            return null;
        }

        if (arrFornecedores.length === 1) {
            const listManufacturer = getManufacturerById(arrFornecedores);
            setManufacturer(listManufacturer);
        }

        if (arrCategorias.length === 1) {
            setCategory(listCategory => getCategoryById(arrCategorias));
        }

        if (xArrClearSubCategorias && xArrClearSubCategorias.length === 1 && arrCategorias.length > 0) {
            setSubCategory(listCategory => getCategoryById(xArrClearSubCategorias));
        }

        fetchProductsSearch(term === '' ? null : term, fornecedores === '' ? null : fornecedores, categorias === '' ? null : arrHierarquia, currentPage, recordPerPage)
            .then(result => {
                setProducts(result.data.Data.Dados)
                setQtd(result.data.Data.QuantidadeRegistrosTotal)
            })
            .then(result => setLoading(false))
            .catch(reject => {
                disconnect();
            })
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
                        <h4 className="titulo h2">
                            {arrFornecedores.length > 1 && <small className="text-muted">Fornecedor(es)</small>}{' '}
                            {manufacturer && manufacturer.Nome}{' '}
                            {arrCategorias.length > 1 && <small className="text-muted">Categoria(s)</small>}{' '}
                            {category && category.Descricao}{' '}
                            {arrSubCategorias.length > 1 && <small className="text-muted">Subcategoria(s)</small>}{' '}
                            {subCategory && subCategory.Descricao}{' '}
                            {term && `Busca ${term}`}
                        </h4>
                        <p className="total-itens">Total de Itens: <span className="total-itens_numero">{qtd}</span></p>
                    </div>
                    <div className="cards cards-produto">
                        {!isLoading ? (
                            products.length > 0
                                ? products.map(product =>
                                    <ProductCard
                                        key={`search-card-${product.idProduto}`}
                                        product={product}
                                        origin={arrOrigin['pagina_busca']}
                                    />
                                )
                                : 'Nenhum produto encontrado'
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

export default Search;