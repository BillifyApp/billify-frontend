export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT';
export const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT';


// Action Creators die Action Objekte zurückgeben
// @ts-ignore
export const setProductName = (name) => ({
    type: SET_PRODUCT_NAME,
    name
});

export const incrementAmount = () => ({
    type: INCREMENT_AMOUNT
});

export const decrementAmount = () => ({
    type: DECREMENT_AMOUNT
});