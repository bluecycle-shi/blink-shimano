import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchClient = (idCliente) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Cliente",
        "Parametros": [
            {
                "Nome": "idCliente",
                "Valor": parseInt(idCliente)
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
export const fetchSeller = (idCliente) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Consultor",
        "Parametros": [
            {
                "Nome": "idCliente",
                "Valor": parseInt(idCliente)
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
