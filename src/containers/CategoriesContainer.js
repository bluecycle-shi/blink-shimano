// import React from 'react';
// import { fetchCategories } from '../services/categories-api';
// import { dynamicSort } from '../utils';
import { getItemSession } from '../utils';

export const getAllCategories = (filtro) => {
    let categories = getItemSession('_categorias');

    // if ( ! categories) {
    //     fetchCategories()
    //         .then(res => {
    //             categories = res.data.Data.Dados;

    //             categories = filtrar(categories.Data.Dados, 0);

    //             categories.sort(dynamicSort("Descricao"));

    //             localStorage.setItem('_categorias', JSON.stringify(categories))
    //         })
    //         .catch(error => {
    //             console.log('Erro ao carregar Categorias', error)
    //         })
    // }

    return JSON.parse(categories);
}

// const filtrar = (array, value) => {
//     return array.filter(function (newarr) {
//         return newarr.idClassificacaoNivelAnterior === value;
//     });
// }

export const getCategoryById = (id) => {
    let selected = getAllCategories().filter(category => parseInt(category.idClassificacaoNivel) === parseInt(id));
    return JSON.parse(JSON.stringify(selected[0]));
}
