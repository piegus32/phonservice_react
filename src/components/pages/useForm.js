import {useState} from 'react';

const useForm = (initialFieldValues) => {

    const [values, setValues] = useState(initialFieldValues)
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })
        console.log(values)
    }

    return {
        values,
        setValues,
        handleInputChange
    };
}

export default useForm;