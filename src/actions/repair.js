import api from "./api";

export const  ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE : "UPDATE",
    DELETE : "DELETE",
    FETCH_ALL_TODO : "FETCH_ALL_TODO",
    FETCH_COMPLETE : "FETCH_COMPLETE",
}

export const fetchAll = () => dispatch => 
{
    api.repair().fetchAll()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL_TODO,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const fetchCompleteRepairs = () => dispatch => 
{
    api.repair().fetchCompleteRepairs()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_COMPLETE,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const Delete = id => dispatch =>
{
    api.repair().delete(id)
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

    api.repair().create(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data,
        })
    })
    .catch(error => console.log(error))
}

export const update = (id, data) => dispatch =>
{
    api.repair().update(id,data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: response.data
        })

    })
    .catch(error => console.log(error))
}

export const markAsComplete = (id) => dispatch =>
{
    api.repair().markAsComplete(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })

    })
    .catch(error => console.log(error))
}