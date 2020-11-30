import React, { useState, useEffect, createElement } from 'react';
import { getAllCategories } from '../../../containers/CategoriesContainer';

const CategoryResponsive = () => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        setAllCategories(getAllCategories());
    }, [])

    return (
        <>
            <div className="header_nav_cont right sub-menu" id="categorias">
                <div className="header_nav_breadcrumb">
                    <a href="#menuPrincipal" role="button" className="header_nav_breadcrumb_link">
                        <span className="fas fa-chevron-left"></span>
                        <span>Menu Principal</span>
                    </a>
                </div>
                <h4 className="titulo h4">Todas as Categorias</h4>
                <nav className="nav">
                    <ul className="list-unstyled mb-0">
                        {allCategories
                            .filter(newarr => newarr.idClassificacaoNivelAnterior == 0)
                            .map(category => (
                                <li key={category.idClassificacaoNivel} className="nav-item"><a href={`#${category.Codigo}`} className="nav-link nav-dropdown">{category.Descricao}<span className="fa fa-chevron-right"></span></a></li>
                            ))}
                    </ul>
                </nav>
            </div>

            {allCategories
                .filter(newarr => newarr.idClassificacaoNivelAnterior == 0)
                .map(category => (
                    <div key={category.idClassificacaoNivel} className="header_nav_cont right sub-menu" id={category.Codigo}>
                        <div className="header_nav_breadcrumb">
                            <a href="#categorias" role="button" className="header_nav_breadcrumb_link">
                                <span className="fas fa-chevron-left"></span>
                                <span>Todas as categorias</span>
                            </a>
                        </div>
                        <h4 className="titulo h4">{category.Descricao}</h4>
                        <nav className="nav">
                            <ul className="list-unstyled mb-0">
                                {allCategories
                                    .filter(newarr => newarr.idClassificacaoNivelAnterior == category.idClassificacaoNivel)
                                    .map(subCategory => (
                                        <li key={subCategory.idClassificacaoNivel} className="nav-item">
                                            {createElement('a', { href: `/busca?c=${subCategory.idClassificacaoNivelAnterior}&s=${subCategory.idClassificacaoNivel}`, className: "nav-link" }, subCategory.Descricao)}
                                        </li>
                                    ))}
                            </ul>
                        </nav>
                    </div>
                ))}
        </>
    )
}

export default CategoryResponsive;