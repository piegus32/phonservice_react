import api from "./api";

export const  ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE : "UPDATE",
    DELETE : "DELETE",
    FETCH_ALL_PRODUCT : "FETCH_ALL_PRODUCT",
    FETCH_ALL_GROUPED: "FETCH_ALL_GROUPED"
}

export const fetchAll = () => dispatch => 
{
    api.product().fetchAll()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL_PRODUCT,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const fetchGroups = () => dispatch => 
{
    api.product().fetchGroupedAll()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL_GROUPED,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const fetchById = id => dispatch => 
{
    api.product().fetchById(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_BY_ID,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const Delete = id => dispatch =>
{
    api.product().delete(id)
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
    api.product().create(data)
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
    api.product().update(id,data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id:id, ...data}
        })

    })
    .catch(error => console.log(error))
}