import { getItemSession } from '../../utils';

const get = getItemSession('_carrinho');

const INITIAL_STATE = {
    items: JSON.parse(get)
}

const refreshCart = (state = INITIAL_STATE, action) => {
    if (action.type === 'REFRESH_CART') {
        return {
            ...state,
            items: action.payload
        }
    }

    return state;
}

export default refreshCart;