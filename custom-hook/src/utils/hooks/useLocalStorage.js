//We can use other react hooks inside our custom hook.
//Let's make this exactly similar to useState hook and we can use it anywhere in this app.
// import { useState } from 'react'

// const useLocalStorage = (initialValue) => {
//     const [value, setValue] = useState(initialValue);
//     return [value, setValue];
// }

// export default useLocalStorage

//Now we want this hook for storing data to local storage. Let's implement that.
import { useEffect, useState } from 'react'

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));//this is used to retrieve the saved value

    if(savedValue) 
        return savedValue;//if we have saved value we return it
    
    if(initialValue instanceof Function)//if we didn't save value with this key earlier and initialValue is a function then return initialValue function 
        return initialValue()

    return initialValue;//otherwise return initialValue 
}

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)//we do this since JSON.parse is slow. So we parse it first time it stores in local storage
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));//we store value in local storage. We can only store strings in local storage so we stringify it.
    },[value]);//We render this only when value changes.

    return [value, setValue];
}

export default useLocalStorage
