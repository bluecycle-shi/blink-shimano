import React, { useEffect, useRef } from 'react';
import { fetchLoginToken, postDevice } from '../services/login-api';
import { AuthLoader } from '../components/Loader/AuthLoader';
import { fetchManufacturers } from '../services/manufacturers-api';
import { fetchCategories } from '../services/categories-api';
import { fetchVersion, fetchHomolog } from '../services/system-api';
import { fetchCartItems } from '../services/cart-api';
import { setItemSession } from '../utils';

import {
    deviceType,
    browserName,
    browserVersion,
    osName,
    osVersion
} from "react-device-detect";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { fetchProductsByTagHome } from '../services/products-api';

const Auth = (props) => {

    const latestProps = useRef(props);

    useEffect(() => { latestProps.current = props; });

    useEffect(() => {
        localStorage.clear();

        const doLogin = (idDevice) => {
            fetchLoginToken(latestProps.current.match.params.token, idDevice)
                .then(result => {
					console.log(idDevice);
					console.log(result);
                    if (result.data.Codigo === 200) {
                        const resultData = result.data.Data.Retorno;
                        const client = {
                            idCliente: resultData.idCliente,
                            idUsuario: resultData.idUsuario,
                            Login: resultData.Login,
                            Nome: resultData.Nome,
                            Email: resultData.Email,
                            ukPedido: resultData.ukPedido,
                            DataEmissao: resultData.DataEmissao,
                            NumeroItens: resultData.NumeroItens,
                            PedidoAlterado: resultData.PedidoAlterado,
                            LinkExpiracaoSessao: resultData.LinkExpiracaoSessao
                        }

                        
                        setItemSession('auth_token', latestProps.current.match.params.token);
                        setItemSession('_dados', JSON.stringify(client));
                        setItemSession('_pedido', client.ukPedido);
                        setItemSession('_token', resultData.TokenResposta);
                    
                        Promise.all([
                            fetchManufacturers(resultData.TokenResposta),
                            fetchCategories(resultData.TokenResposta),
                            fetchVersion(resultData.TokenResposta),
                            fetchHomolog(resultData.TokenResposta),
                            fetchCartItems(resultData.TokenResposta)
                        ])
                            .then(resultFetch => {
                                setItemSession('_fornecedores', JSON.stringify(resultFetch[0].data.Data.Dados));                                
                                setItemSession('_categorias', JSON.stringify(resultFetch[1].data.Data.Dados))
                                setItemSession('blink_versao', JSON.stringify(resultFetch[2].data.Data))
                                setItemSession('blink_homolog', JSON.stringify(resultFetch[3].data.Data))
                                setItemSession('_carrinho', JSON.stringify(resultFetch[4].data.Data))

                                window.location.href = process.env.REACT_APP_BASE_URL
                            })
                    } else {
                        latestProps.current.history.push('/unauthorized');
                    };

                })
                .catch(error => {
                    latestProps.current.history.push('/unauthorized');
                })
        }

		var ambiente = process.env.REACT_APP_API_EMPRESA;
		var isHomolog = ambiente.toLowerCase().includes("Teste") ? true : false;
		
        var myCookie = Cookies.get('_register_' + isHomolog);
        let device = myCookie;

        if (!myCookie || device == null || device == '' || device == 0) {
            const browser = browserName + ' ' + browserVersion + ' ' + deviceType;
            const so = osName + ' ' + osVersion;
            const serialNumber = uuidv4();
            const uniqueKey = uuidv4();

            postDevice(browser, so, uniqueKey, serialNumber)
                .then(result => {				
                    Cookies.remove('_register_' + isHomolog);
                    Cookies.set('_register_' + isHomolog, result.data.Data.Retorno, { expires: 3650 });
					return result.data.Data.Retorno;
                })
                .then(result => doLogin(result));
        } else {
            doLogin(device);
        }
    }, [])

    return <AuthLoader />;
}

export default Auth;