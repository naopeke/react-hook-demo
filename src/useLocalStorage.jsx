import { useState, useEffect } from 'react'

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() =>{
        const jsonValue = window.localStorage.getItem(key);
        if(jsonValue !==null) return JSON.parse(jsonValue);

        if(typeof initialValue === 'function'){
            return defaultValue();
        } else {
            return defaultValue;
        }

    });

    useEffect(() =>{
        window.localStorage.setItm(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage
