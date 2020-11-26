import { http, isExpired, HTTP_TOKEN, REJECT_MSG } from './http';

export const fetchStates = () => {
    const options = {
        "Token": HTTP_TOKEN
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`FaleConosco/ObterEstados`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const fetchSubjects = () => {
    const options = {
        "Token": HTTP_TOKEN
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`FaleConosco/ObterAssuntos`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}

//
export const postContact = (RazaoSocial, Responsavel, Telefone, Email, Assunto, Mensagem) => {
    const options = {
        "Token": HTTP_TOKEN,
        "Esquema": "web",
        "RazaoSocial": RazaoSocial,
        "Responsavel": Responsavel,
        "Telefone": Telefone,
        "Email": Email,
        "Assunto": Assunto,
        "Mensagem": Mensagem
    }

    return new Promise((resolve, reject) => {
        const ret = http.post(`FaleConosco/EnviarEmail`, options)

        if (isExpired(ret)) {
            reject(REJECT_MSG);
        }

        resolve(ret);
    })
}
