import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchAllInvoices = (numeroPedido = null, dataInicial = null, dataFinal = null) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Historico",
        "Parametros": [
        ]
    }

    if (numeroPedido) {
        options.Parametros.push({ "Nome": "NumeroPedido", "Valor": numeroPedido })
    }

    if (dataInicial && dataFinal) {
        options.Parametros.push(
            {
                "Nome": "DataInicial",
                "Valor": dataInicial
            },
            {
                "Nome": "DataFinal",
                "Valor": dataFinal
            }
        )
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

export const fetchInvoice = (idPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Historico",
        "Parametros": [
            {
                "Nome": "idPedido",
                "Valor": parseInt(idPedido)
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

export const fetchInvoiceItems = (idPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "HistoricoItem",
        "Parametros": [
            {
                "Nome": "idPedido",
                "Valor": parseInt(idPedido)
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

export const fetchTracking = (idPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "TrackingHistorico",
        "Parametros": [
            {
                "Nome": "idPedido",
                "Valor": parseInt(idPedido)
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


export const fetchNF = (idPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "NotasPedido",
        "Parametros": [
            {
                "Nome": "idPedido",
                "Valor": parseInt(idPedido)
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

export const fetchExcel = (idPedido) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "HistoricoItem",
        "Parametros": [
            {
                "Nome": "idPedido",
                "Valor": parseInt(idPedido)
            }
        ]
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDadosExcel`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}


export const fetchDeliveryDate = () => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "DatasPedido"
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}