import { http, HTTP_TOKEN } from './http';

//
export const fetchLoginToken = (token, device) => {
    const data = {
        ChaveApi: process.env.REACT_APP_API_KEY,
        Token: token,
        Empresa: process.env.REACT_APP_API_EMPRESA,
        idDispositivo: device,
        Aplicativo: process.env.REACT_APP_API_APLICATIVO,
        Latitude: 0,
        Longitude: 0,
        Versao: process.env.REACT_APP_VERSION
    }

    return new Promise( (resolve, reject) => {
        const ret = http.post('Login/EfetuarLoginToken', JSON.stringify(data))
        resolve(ret);
    })
}

//
export const fetchLogin = (usuario, codigo, device) => {
    const data = {
        ChaveApi: process.env.REACT_APP_API_KEY,
        Login: usuario,
        Senha: codigo,
        Empresa: process.env.REACT_APP_API_EMPRESA,
        idDispositivo: device,
        Aplicativo: process.env.REACT_APP_API_APLICATIVO,
        Latitude: 0,
        Longitude: 0,
        Versao: process.env.REACT_APP_VERSION
    }

    return new Promise( (resolve, reject) => {
        const ret = http.post('Login/EfetuarLogin', JSON.stringify(data))
        resolve(ret);
    })
}

//
export const postDevice = (browser, so, uniqueKey, serialNumber) => {
    const data = {
        ChaveApi: process.env.REACT_APP_API_KEY,
        Empresa: process.env.REACT_APP_API_EMPRESA,
        Fabricante: so,
        Modelo: browser,
        Plataforma: process.env.REACT_APP_API_PLATAFORMA,
        ChaveUnica: uniqueKey,
        NumeroSerie: serialNumber,
        IMEI: "",
        GoogleID: null
    }

    return new Promise( (resolve, reject) => {
        const ret = http.post('Login/RegistrarDispositivo', JSON.stringify(data))
        resolve(ret);
    })
}

//
export const fetchSession = () => {
    const data = {
        Token: HTTP_TOKEN
    }

    return new Promise( (resolve, reject) => {
        const ret = http.post('Login/ObterStatusSessao', JSON.stringify(data))
        resolve(ret);
    })
}
