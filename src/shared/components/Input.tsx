import {ChangeEvent} from "react";

interface props {
    value: string;
    error: string|null;
    label: string;
    onChange: (value: string) => void;
}

export default function Input({label, value, error, onChange}: props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return <>
        <label htmlFor={label}></label>
        <input id={label} onChange={handleChange} value={value}/>
        {
            error !== null
                ? <p>{error}</p>
                : null
        }
    </>
}