// import { useMemo } from "react";

// function List({ input }) {
//     const LIST_SIZE = 20000;
//     const list = useMemo(() => {
//         const l =[];
//         for(let i = 0; i < LIST_SIZE; i++) {
//             l.push(<div key={i}>{input}</div>)
//         }
//         return l;
//     }, [input]);
//     return list;
// }

// export default List;

//Now we are using deferredInput which changes input after a period of time.
//We also replace input's with deferredInput. Means value inside input box changes instantly but the list is updated after sometime when we stop typing.
//deferredInput changes value after we stop typing.
//We use useDeferredValue when we know the operation is of low priority and / or computationally expensive
// import { useDeferredValue, useMemo } from "react";

// function List({ input }) {
//   const LIST_SIZE = 20000;
//   const deferredInput = useDeferredValue(input);

//   const list = useMemo(() => {
//     const l = [];
//     for (let i = 0; i < LIST_SIZE; i++) {
//       l.push(<div key={i}>{deferredInput}</div>);
//     }
//     return l;
//   }, [deferredInput]);
//   return list;
// }

// export default List;

//We can see how input an deferred input is changing based on how often we hit a keystroke:

import { useDeferredValue, useEffect, useMemo } from "react";

function List({ input }) {
  const LIST_SIZE = 20000;
  const deferredInput = useDeferredValue(input);

  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{deferredInput}</div>);
    }
    return l;
  }, [deferredInput]);

  useEffect(() => console.log(`Input: ${input} and Deferred Input: ${deferredInput}`), [input, deferredInput]);

  return list;
}

export default List;

//A good use case is when we have the input state and update input state very far away or / and when other things depend on it. Then we can use this as we can't change the input state there.
//This is better than debounce and throttle as the wait time is automatically calculated by react library and it is not fixed to a certain time.