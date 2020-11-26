import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

//
export const fetchCart = (ukPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Pedido",
        "Parametros": [
            // {
            //     "Nome": "ukPedido",
            //     "Valor": ukPedido
            // }
            {
                "Nome": "ApenasRegistrosPedido",
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

//
export const fetchCartItems = (tokenLogin) => {
    const options = {
        "Token": tokenLogin ?? HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "PedidoItem",
        "Parametros": [
            {
                "Nome": "ApenasRegistrosPedido",
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

//
export const addToCart = (idProduto, quantity, origin) => {
    const options = {
        "Token": HTTP_TOKEN,
        "idProduto": parseInt(idProduto),
        "Quantidade": parseInt(quantity),
        "QuantidadeBonificada": 0,
        "Origem": origin
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/AdicionarItem`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const updateCart = (idProduto, item, quantity) => {
    const options = {
        "Token": HTTP_TOKEN,
        "idProduto": parseInt(idProduto),
        "Item": parseInt(item),
        "Quantidade": parseInt(quantity),
        "QuantidadeBonificada": 0
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/AtualizarItem`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const removeFromCart = (idProduto, item) => {
    const options = {
        "Token": HTTP_TOKEN,
        "idProduto": parseInt(idProduto),
        "Item": parseInt(item)
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/RemoverItem`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const fetchPaymentTerms = () => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "CondicaoPagamento"
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
export const postSelectedPaymentTerm = (idCondicaoPagamento) => {
    const options = {
        "Token": HTTP_TOKEN,
        "idCondicaoPagamento": parseInt(idCondicaoPagamento)
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/AtualizarCondicaoPagamento`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const postEndCart = () => {
    const options = {
        "Token": HTTP_TOKEN
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/FinalizarCarrinho`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const postDuplicateCart = (idPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Parametros": [
            {
                "Nome": "idPedido",
                "Valor": parseInt(idPedido)
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/CopiarPedido`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const resetCart = () => {
    const options = {
        "Token": HTTP_TOKEN
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/AbandonarCarrinho`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const postSurveyRate = (pedido, rating, obs) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Parametros": [
            {
                "Nome": "Nota",
                "Valor": parseInt(rating)
            },
            {
                "Nome": "Observacoes",
                "Valor": obs
            },
            {
                "Nome": "ukPedido",
                "Valor": pedido
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Venda/RegistrarPesquisaSatisfacao`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}