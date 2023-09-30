//Every time a variable changes we log it to console. This is our second custom hook.

import React, { useEffect } from 'react'

const useUpdateLogger = (value) => {
    useEffect(() => console.log(value),[value]);
}

export default useUpdateLogger