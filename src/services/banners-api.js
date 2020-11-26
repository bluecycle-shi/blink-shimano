import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchBanners = (tag = null, position = null) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "Tabela": "Banner",
        "Parametros": [
        ]
    }

    if (tag) {
        options.Parametros.push({ "Nome": "Tag", "Valor": tag })
    }

    if (position) {
        options.Parametros.push({ "Nome": "PosicionamentoBanner", "Valor": position })
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`Dados/ObterDados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}
