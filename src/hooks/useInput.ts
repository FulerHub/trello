import {ChangeEvent, useState} from "react";

export const useInput = (defaultValue:any)=>{
    const [value,setValue] = useState(defaultValue);

    const reset = ()=>{
        setValue(defaultValue);
    };
    const bind = {
        value: value,
        onChange: (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setValue(event.target.value)
    };
    return {value, reset, bind,setValue}
};