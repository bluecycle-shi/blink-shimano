import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';
import { arrayStringToArrayInt } from '../utils';

//
export const fetchProductsByManufacturerId = (idFornecedor, page, recordPerPage) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Produto",
        "Parametros": [
            {
                "Nome": "idFornecedor",
                "Valor": parseInt(idFornecedor)
            },
            {
                "Nome": "PaginaSQL",
                "Valor": parseInt(page)
            },
            {
                "Nome": "ResultadosPorPaginaSQL",
                "Valor": parseInt(recordPerPage)
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}


//
export const fetchProductsSearch = (term, idFornecedor, hierarquia, page, recordPerPage) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Produto",
        "Parametros": [
            {
                "Nome": "PaginaSQL",
                "Valor": parseInt(page)
            },
            {
                "Nome": "ResultadosPorPaginaSQL",
                "Valor": parseInt(recordPerPage)
            }
        ]
    }

    if (term) {
        options.Parametros.push({ "Nome": "Busca", "Valor": term })
    }

    if (idFornecedor) {
        options.Parametros.push({ "Nome": "idFornecedor", "Valor": arrayStringToArrayInt(idFornecedor) })
    }

    if (hierarquia) {
        options.Parametros.push({ "Nome": "HierarquiaProduto", "Valor": hierarquia })
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}


//
export const fetchProductsByCategoryId = (hierarchy, page, recordPerPage) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Produto",
        "Parametros": [
            {
                "Nome": "HierarquiaProduto",
                "Valor": hierarchy
            },
            {
                "Nome": "PaginaSQL",
                "Valor": parseInt(page)
            },
            {
                "Nome": "ResultadosPorPaginaSQL",
                "Valor": parseInt(recordPerPage)
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const fetchProductsByTagHome = (value, total, tokenLogin = null) => {
    
    var options;
    if(value === 'Promocao'){
        options = {
            "Token": tokenLogin ?? HTTP_TOKEN,
            "Esquema": "web",
            "Tabela": "Produto",
            "Parametros": [
                {
                    "Nome": "Tag",
                    "Valor": value
                },
                {
                    "Nome": "LimiteSQL",
                    "Valor": parseInt(total)
                },
                {
                    "Nome": "MaisRentavelPrimeiro",
                    "Valor": true
                },
                {
                    "Nome": "AgruparPorClassificacao",
                    "Valor": true
                },
                {
                    "Nome": "ProdutosMaisVendidos",
                    "Valor": true
                }
            ]
        }
    }else{
        options = {
            "Token": tokenLogin ?? HTTP_TOKEN,
            "Esquema": "web",
            "Tabela": "Produto",
            "Parametros": [
                {
                    "Nome": "Tag",
                    "Valor": value
                },
                {
                    "Nome": "LimiteSQL",
                    "Valor": parseInt(total)
                },
                {
                    "Nome": "MaisRentavelPrimeiro",
                    "Valor": true
                },
                {
                    "Nome": "AgruparPorClassificacao",
                    "Valor": true
                },
            ]
        }
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options);

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const fetchProductsByTag = (nameHighlight, page, recordPerPage) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Produto",
        "Parametros": [
            {
                "Nome": "Tag",
                "Valor": nameHighlight
            },
            {
                "Nome": "PaginaSQL",
                "Valor": parseInt(page)
            },
            {
                "Nome": "ResultadosPorPaginaSQL",
                "Valor": parseInt(recordPerPage)
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const fetchProductsById = (idProduto) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Produto",
        "Parametros": [
            {
                "Nome": "idProduto",
                "Valor": parseInt(idProduto)
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const fetchProductsBySuggestion = (total) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Produto",
        "Parametros": [
            {
                "Nome": "ProdutosMaisVendidos",
                "Valor": true
            },
            {
                "Nome": "LimiteSQL",
                "Valor": parseInt(total)
            },
            {
                "Nome": "ApenasRegistrosPedido",
                "Valor": true
            },
            {
                "Nome": "MaisRentavelPrimeiro",
                "Valor": true
            },
            {
                "Nome": "AgruparPorClassificacao",
                "Valor": true
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}