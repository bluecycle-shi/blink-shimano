// import React from 'react';
// import { fetchManufacturers } from '../services/manufacturers-api';
import { getItemSession } from '../utils';

export const getAllManufacturers = () => {
    let manufacturers = getItemSession('_fornecedores');

    // if (!manufacturers) {
    //     console.debug('Nova busca de Fornecedores')
    //     fetchManufacturers()
    //         .then(res => {
    //             manufacturers = res.data.Data.Dados;
    //             localStorage.setItem('_fornecedores', JSON.stringify(manufacturers))
    //         })
    //         .catch(error => {
    //             console.log('Erro ao carregar Fornecedores', error)
    //         })
    // }

    return JSON.parse(manufacturers);
}

export const getManufacturerById = (id) => {
    let selected = getAllManufacturers().filter(manufacturer => parseInt(manufacturer.idFornecedor) === parseInt(id));
   
    return JSON.parse(JSON.stringify(selected[0]));
}
