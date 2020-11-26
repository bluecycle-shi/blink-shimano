import React from 'react';
import { fetchProductsByManufacturerId } from '../services/products-api';

export const productByManufacturerId = (id) => {
    let products = '';
    fetchProductsByManufacturerId(id)
        .then(res => {
            products = JSON.stringify(res.data.Data.Dados);
        })
        .catch(error => {
            console.debug('Erro ao carregar Produtos por Fornecedor', error)
        })

    return JSON.parse(products);
}