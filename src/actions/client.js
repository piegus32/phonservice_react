import api from "./api";
export const  ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE : "UPDATE",
    DELETE : "DELETE",
    FETCH_ALL_CLIENTS : "FETCH_ALL_CLIENTS"
}

export const fetchAll = () => dispatch => 
{
    api.client().fetchAll()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL_CLIENTS,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const Delete = id => dispatch =>
{
    api.client().delete(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
    })
    .catch(error => console.log(error))
}

export const create = (data) => dispatch =>
{
    api.client().create(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const update = (id, data) => dispatch =>
{
    api.client().update(id,data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id:id, ...data}
        })

    })
    .catch(error => console.log(error))
}