import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchVersion = (tokenLogin) => {
    const options = {
        "Token": tokenLogin ?? HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "VersaoSistema"
    }

    return new Promise((resolve, reject) => {
        const ret = http.get(`Versao/VersaoSistema`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

export const fetchHomolog = (tokenLogin) => {
    const options = {
        "Token": tokenLogin ?? HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "VersaoHomologacao"
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Versao/VersaoHomologacao`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

