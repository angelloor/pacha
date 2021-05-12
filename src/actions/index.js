export const actions = {
    cambiarUser: 'CAMBIAR_USER',
    cambiarCalendar: 'CAMBIAR_CALENDAR',
    cambiarConfiguration: 'CAMBIAR_CONFIGURATION',
    cambiarContent: 'CAMBIAR_CONTENT',
    cambiarNews: 'CAMBIAR_NEWS',
    cambiarStoreItem: 'CAMBIAR_STOREITEM',
    cambiarExperience: 'CAMBIAR_EXPERIENCE',
    cambiarYourShopping: 'CAMBIAR_YOURSHOPPING',
    cambiarFunFacts: 'CAMBIAR_FUNFACTS'
}

export const cambiarUser = payload => ({
    type: actions.cambiarUser,
    payload,
});

export const cambiarCalendar = payload => ({
    type: actions.cambiarCalendar,
    payload,
});

export const cambiarConfiguration = payload => ({
    type: actions.cambiarConfiguration,
    payload,
});

export const cambiarContent = payload => ({
    type: actions.cambiarContent,
    payload,
});

export const cambiarNews = payload => ({
    type: actions.cambiarNews,
    payload,
});

export const cambiarStoreItem = payload => ({
    type: actions.cambiarStoreItem,
    payload,
});

export const cambiarYourShopping = payload => ({
    type: actions.cambiarYourShopping,
    payload,
});

export const cambiarFunFacts = payload => ({
    type: actions.cambiarFunFacts,
    payload,
});