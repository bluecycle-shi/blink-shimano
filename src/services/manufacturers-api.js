import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchManufacturers = (tokenLogin) => {
    const options = {
        "Token": tokenLogin ?? HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Fornecedor"
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}