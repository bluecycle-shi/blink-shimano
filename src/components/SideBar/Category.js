import React, { useState, useEffect, createElement } from 'react';
import { filtersLimitWord, arrayStringToArrayInt, clearSubCategorias } from '../../utils';
import { getAllCategories } from '../../containers/CategoriesContainer';
import { Loader } from '../Loader/Loader';
import SubCategory from './SubCategory'

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const url = '/busca';
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const termo = params.get('t') || '';
    const fornecedores = params.get('f') || '';
    const categorias = params.get('c') || '';
    let arrCategorias = categorias ? arrayStringToArrayInt(categorias) : [];
    const subCategorias = params.get('s') || '';
    let arrSubCategorias = subCategorias ? arrayStringToArrayInt(subCategorias) : [];

    arrSubCategorias = clearSubCategorias(arrSubCategorias, arrCategorias, getAllCategories(0));
    
    const handleCheck = (e) => {
        e.preventDefault();

        if (!e.target.checked) {
            arrCategorias = arrCategorias.filter(arr => { return arr != e.target.value })
        } else {
            arrCategorias.push(parseInt(e.target.value))
        }

        window.location.href = url
            + '?t=' + termo
            + '&c=' + arrCategorias.toString()
            + '&s=' + arrSubCategorias.toString()
            + '&f=' + fornecedores
    }

    useEffect(() => {
        const allCategories = getAllCategories(0);
        const groups = allCategories.filter(function (newarr) {
            return newarr.idClassificacaoNivelAnterior == 0;
        });
        setCategorySelected(arrCategorias)
        setCategories(groups);
        setLoading(false);
    }, [])

    return (
        <>
            <form className="form-sticky">
                <div className="form-sticky_titulos">
                    <h6 className="titulo h6">Categorias</h6>
                    {/* {createElement('a', { href: `/busca?t=${termo}&f=${fornecedores}`, className: "limpar-filtro" }, 'Limpar')} */}
                </div>
                {!isLoading ? (
                    categories.map((category, index) => (
                        <fieldset key={`field-${index}`} className="form-group">
                            <input 
                                type="checkbox" 
                                name={`cat-${category.idClassificacaoNivel}`} 
                                value={category.idClassificacaoNivel} 
                                id={`filter-${category.idClassificacaoNivel}`} 
                                className="checkbox" 
                                onChange={handleCheck} 
                                checked={arrCategorias.find(v => v === category.idClassificacaoNivel)} 
                            />
                            <label htmlFor={`filter-${category.idClassificacaoNivel}`} title={category.Nome}>{filtersLimitWord(category.Descricao)}</label>
                        </fieldset>
                    ))
                ) : (
                        <Loader short="true" />
                    )}
            </form>
            {categorySelected > 0 &&
                <SubCategory />
            }
        </>
    )
}

export default Category;