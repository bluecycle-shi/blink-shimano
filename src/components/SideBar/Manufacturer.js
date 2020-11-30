import React, { useState, useEffect, createElement } from 'react';
import { filtersLimitWord, arrayStringToArrayInt } from '../../utils';
import { getAllManufacturers } from '../../containers/ManufacturersContainer';
import { Loader } from '../Loader/Loader';

const Manufacturer = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const allManufacturers = getAllManufacturers();
        setManufacturers(allManufacturers);
        setLoading(false);
    }, [])

    const url = '/busca';
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const termo = params.get('t') || '';
    const fornecedores = params.get('f') || '';
    let arrFornecedores = fornecedores ? arrayStringToArrayInt(fornecedores) : [];
    const categorias = params.get('c') || '';
    const subCategorias = params.get('s') || '';

    const handleCheck = (e) => {
        e.preventDefault();
        
        if (!e.target.checked) {
            arrFornecedores = arrFornecedores.filter(arr => { return arr != e.target.value })
        } else {
            arrFornecedores.push(parseInt(e.target.value))
        }

        window.location.href = url
            + '?t=' + termo
            + '&c=' + categorias
            + '&s=' + subCategorias
            + '&f=' + arrFornecedores.toString()
    }

    return (
        <form className="form-sticky">
            <div className="form-sticky_titulos titulofornecedores">
                <h6 className="titulo h6">Fornecedores</h6>
                {/* {createElement('a', { href: `/busca?t=${termo}&c=${categorias}&s=${subCategorias}`, className: "limpar-filtro" }, 'Limpar')} */}
                {createElement('a', { href: `/`, className: "limpar-filtro" }, 'Limpar')}
            </div>
            <div className="form-filtro-holder">
                {!isLoading ? (
                    manufacturers.map((manufacturer, index) => (
                        <fieldset key={`manufacturer-field-${index}`} className={index < 10 ? 'form-group' : 'form-group hidden'}>
                            <input 
                                type="checkbox" 
                                name={manufacturer.idFornecedor} 
                                value={manufacturer.idFornecedor} 
                                id={`manufacturer-${manufacturer.idFornecedor}`} 
                                className="checkbox" 
                                onClick={handleCheck} 
                                checked={arrFornecedores.find(v => v === manufacturer.idFornecedor)} 
                            />
                            <label htmlFor={`manufacturer-${manufacturer.idFornecedor}`} title={manufacturer.Nome}>{filtersLimitWord(manufacturer.Nome)}</label>
                        </fieldset>
                    ))
                ) : (
                        <Loader short="true" />
                    )}
            </div>
            <fieldset className="form-group">
                <button className="btn btn-link link-texto--laranja btn-verMais">Ver mais</button>
            </fieldset>
        </form>
    );
}

export default Manufacturer;