import { actions } from '../actions/index.js'

const reducer = (state, action) => {
    switch (action.type) {
        case actions.cambiarUser:
            return {
                ...state,
                user: action.payload
            }
        case actions.cambiarCalendar:
            return {
                ...state,
                calendar: action.payload
            }
        case actions.cambiarConfiguration:
            return {
                ...state,
                configuration: action.payload
            }
        case actions.cambiarContent:
            return {
                ...state,
                content: action.payload
            }
        case actions.cambiarNews:
            return {
                ...state,
                news: action.payload
            }
        case actions.cambiarStoreItem:
            return {
                ...state,
                storeItem: action.payload
            }
        case actions.cambiarYourShopping:
            return {
                ...state,
                yourShopping: action.payload
            }
        case actions.cambiarFunFacts:
            return {
                ...state,
                funFacts: action.payload
            }
        default:
            return state
    }
}

export default reducer