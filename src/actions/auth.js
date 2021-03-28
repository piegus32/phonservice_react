import api from "./api";

export const  ACTION_TYPES = {
    SIGN_IN : "SIGN_IN"
}

export const signIn = (data) => async dispatch =>
{
    await api.auth().signin(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.SIGN_IN,
            payload: response.data
        })
        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
    })
    .catch(error => console.log(error))
}
