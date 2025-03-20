import {ChangeEvent, useCallback, useState} from "react";

interface props {
    label: string;
    defaultValue: string;
    value: string;
    onChange: (value: string) => void;
    validate?: (value: string) => string;
}

export default function Input({label, defaultValue, value, onChange, validate}: props) {
    if (validate === undefined) validate = () => ""
    const initialError = defaultValue === value ? null : validate(value);

    const [error, setError] = useState(initialError);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;

        const error = validate(data);
        if (error) {
            setError(error)
            return
        }
        setError(null)
        onChange(data)
    }, [onChange, validate])

    return <>
        <label htmlFor={label}></label>
        <input id={label} onChange={handleChange}/>
        {
            error !== null
                ? <p>{error}</p>
                : null
        }
    </>
}