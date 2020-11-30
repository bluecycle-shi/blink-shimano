import React, { useState, useEffect, createElement } from 'react';
import { getAllCategories } from '../../../containers/CategoriesContainer';
// import { Link } from 'react-router-dom';

const Category = () => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        setAllCategories(getAllCategories());
        // allCategories
        //     .filter(newarr => newarr.idClassificacaoNivelAnterior == 0)
        //     .map(category => {
        //         console.info('Categoria', category.idClassificacaoNivel + ' - ' + category.Descricao)
        //         allCategories
        //             .filter(newarr => newarr.idClassificacaoNivelAnterior == category.idClassificacaoNivel)
        //             .map(subCategory => {
        //                 console.debug(subCategory.Descricao)
        //             })
        //     });
    }, [])

    return (
        <>
            <a role="button" href="#" className="nav-link nav-dropdown">Categorias<span className="icon icon-caret-down"></span></a>
            <ul className="list-unstyled mb-0 nav_sub-menu">
                {allCategories
                    .slice(0, 10)
                    .filter(newarr => newarr.idClassificacaoNivelAnterior === 0)
                    .map(category => (
                        <li key={category.idClassificacaoNivel} className="nav_sub-menu_item">
                            <a href="#" className="nav_sub-menu_link nav-dropdown"><span>{category.Descricao}</span> <span className="fa fa-chevron-right"></span></a>
                            <ul className="list-unstyled mb-0 nav_sub-menu nav_sub-menu--interno">
                                {allCategories
                                    .filter(newarr => newarr.idClassificacaoNivelAnterior === category.idClassificacaoNivel)
                                    .map(subCategory => (
                                        <li key={subCategory.idClassificacaoNivel} className="nav_sub-menu_item">
                                            {createElement('a', { href: `/busca?c=${subCategory.idClassificacaoNivelAnterior}&s=${subCategory.idClassificacaoNivel}`, className: "nav_sub-menu_link" }, subCategory.Descricao)}
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                <li className="nav_sub-menu_item todas-categorias">
                    <a href="#" className="nav_sub-menu_link nav-dropdown"><span>Todas as categorias</span> <span className="fa fa-chevron-right"></span></a>
                    <ul className="list-unstyled mb-0 nav_sub-menu nav_sub-menu--interno">
                        {allCategories
                            .filter(newarr => newarr.idClassificacaoNivelAnterior === 0)
                            .map(category => (
                                <li key={`todas-${category.idClassificacaoNivel}`} className="nav_sub-menu_item">
                                    {createElement('a', { href: `/busca?c=${category.idClassificacaoNivel}`, className: "nav_sub-menu_link" }, category.Descricao)}
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default Category;