import React, { useState, useEffect, createElement } from 'react';
import { filtersLimitWord, arrayStringToArrayInt, clearSubCategorias } from '../../utils';
import { getAllCategories } from '../../containers/CategoriesContainer';
import { Loader } from '../Loader/Loader';

const SubCategory = () => {
    const [subCategories, setSubCategories] = useState([]);
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
            arrSubCategorias = arrSubCategorias.filter(arr => { return arr != e.target.value })
        } else {
            arrSubCategorias.push(parseInt(e.target.value))
        }

        window.location.href = url
            + '?t=' + termo
            + '&c=' + categorias
            + '&s=' + arrSubCategorias.toString()
            + '&f=' + fornecedores
    }

    useEffect(() => {
        if (arrCategorias.length > 0) {
            const allCategories = getAllCategories(0);
            const sections = allCategories.filter(function (newarr) {
                return arrCategorias.indexOf(newarr.idClassificacaoNivelAnterior) > -1;
            });
            setSubCategories(sections);
        }
        setLoading(false);
    }, [])

    return (
        <form className="form-sticky">
            <div className="form-sticky_titulos">
                <h6 className="titulo h6">Subcategoria</h6>
                {/* {createElement('a', { href: `/busca?t=${termo}&c=${categorias}&f=${fornecedores}`, className: "limpar-filtro" }, 'Limpar')} */}
            </div>
            {!isLoading ? (
                subCategories.map((subCategory, index) => (
                    <fieldset key={`field-sub-${index}`} className="form-group">
                        <input
                            type="checkbox"
                            name={`sub-${subCategory.idClassificacaoNivel}`}
                            value={subCategory.idClassificacaoNivel}
                            id={`sub-${subCategory.idClassificacaoNivel}`}
                            className="checkbox"
                            onClick={handleCheck}
                            checked={arrSubCategorias.find(v => v === subCategory.idClassificacaoNivel)}
                        />
                        <label htmlFor={`sub-${subCategory.idClassificacaoNivel}`} title={subCategory.Descricao}>{filtersLimitWord(subCategory.Descricao)}</label>
                    </fieldset>
                ))
            ) : (
                    <Loader short="true" />
                )}
        </form>
    )
}

export default SubCategory;