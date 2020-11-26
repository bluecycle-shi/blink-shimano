import React, { useState, useEffect, createElement } from 'react';
// import { Link } from 'react-router-dom';
import Select from 'react-select';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';

import { filtersLimitWord } from '../utils';
import { Loader } from '../components/Loader/Loader';
import { getAllManufacturers } from '../containers/ManufacturersContainer';

const Manufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectManufacturers, setSelectManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);

    useEffect(() => {
        const allManufacturers = getAllManufacturers();
        setManufacturers(allManufacturers);

        let arrManufacturers = [];

        allManufacturers.map(manufacturer => {
            arrManufacturers.push({
                value: manufacturer.idFornecedor,
                label: manufacturer.Nome
            })
        });

        setSelectManufacturers(arrManufacturers);

        setLoading(false);
    }, [])


    const handleChange = (values) => {
        setSelectedManufacturer(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let fornecedores = '';

        selectedManufacturer.forEach(item =>
            fornecedores = fornecedores + item.value + ','
        );

        window.location.href = `/busca?f=${fornecedores}`
    }

    return (
        <>
            <Header />
            <section className="fornecedores container">
                <div className="sect-header">
                    <div className="sect-titulo">
                        <h2 className="titulo h2">Fornecedores</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group form-row">
                            <div className="col-12 col-md-8 col-lg-9 mb-3 mb-md-0">
                                <Select
                                    options={selectManufacturers}
                                    isMulti={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-4 col-lg-3">
                                <button type="submit" className="btn btn-block btn--laranja btn--full-height" id="btn-buscar">Buscar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <section className="fornecedores--conteudo container fornecedores-height">
                <div className="sect-header">
                    <div className="h4 titulo">Fornecedores de A a Z</div>
                    <hr />
                </div>
                {!isLoading ? (
                    <ListAll manufacturers={manufacturers} />
                ) : (
                        <Loader />
                    )}
            </section>
            <Footer />
        </>
    )
}

const ListAll = (props) => {
    const { manufacturers } = props;
    return (
        <ul className="list-unstyled fornecedores--lista">
            {manufacturers.map((manufacturer, index) => (
                <li key={`manufacturer-field-${index}`}>
                    {/* <Link to={`/busca?f=${manufacturer.idFornecedor}`}> {filtersLimitWord(manufacturer.Nome)}</Link> */}
                    {createElement('a', { href: `/busca?f=${manufacturer.idFornecedor}` }, filtersLimitWord(manufacturer.Nome))}
                </li>
            ))}
        </ul>
    )
}

export default Manufacturers;