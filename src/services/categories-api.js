import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchCategories = (tokenLogin) => {
    const options = {
        "Token": tokenLogin ?? HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Categoria"
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}