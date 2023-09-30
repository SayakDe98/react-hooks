//This app does two things: Take a number input and call a slow executing function which calculates all numbers from 0 to 1000000000 - 1 and returns the inputted number * 2. This app also has a button for toggling dark mode to light mode and vice versa.

// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [number, setNumber] = useState(0);
//   const [dark, setDark] = useState(false);
//   const doubleNumber = slowFunction(number);
//   const themeStyles = {
//     backgroundColor: dark ? 'black' : 'white',
//     color: dark ? 'white' : 'black'
//   }

//   return (
//     <>
//     <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
//     <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
//     <div style={themeStyles}>{doubleNumber}</div>
//     </>
//   );
// }

// function slowFunction(num) {
//   console.log('Calling Slow Function');
//   for(let i = 0; i < 1000000000; i++) {
//     return num * 2;
//   }
// }

// export default App;

//For the above code the whole code above return is ran over and over again. 
// It is making our app slow. So we need to use a hook called useMemo. We will be caching our old number and it multiplied by 2. So we don't need to recalculate it again.
//With the useMemo hook, we will be re running the slow function only when the number change as it is a dependency of the slow function
//Now we will see the number change is slow but when we change theme it is fast
//Also we don't want to use this hook every time where caching is not required because we are calling useMemo hook which takes time, we are storing / memoizing the value of the slowFunction which takes space. So it gives performance issues if we use the useMemo hook every where.

// import { useMemo, useState } from 'react';
// import './App.css';

// function App() {
//   const [number, setNumber] = useState(0);
//   const [dark, setDark] = useState(false);
//   const doubleNumber = useMemo(() => slowFunction(number), [number]);
//   const themeStyles = {
//     backgroundColor: dark ? 'black' : 'white',
//     color: dark ? 'white' : 'black'
//   }

//   return (
//     <>
//     <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
//     <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
//     <div style={themeStyles}>{doubleNumber}</div>
//     </>
//   );
// }

// function slowFunction(num) {
//   console.log('Calling Slow Function');
//   for(let i = 0; i < 100000000; i++) {
//     return num * 2;
//   }
// }

// export default App;


//Now let's talk about referential equality
//Let's say there are two functions: 
//1) function sum(num) { return num * 3 };
//2) function sum2(num) { return num * 3 };
//The two functions are doing the same work but they are not equal.

//Now let's run useEffect every time our themeStyles changes. We see that when we run change theme then also Theme Changed gets printed. This happens because of referential equality. Every time we run our function we get a new themeStyles object being created. This themeStyles object is not same as old themeStyles object. They have exact same value but they reference different places in memory.

// import { useEffect, useMemo, useState } from "react";
// import "./App.css";

// function App() {
//   const [number, setNumber] = useState(0);
//   const [dark, setDark] = useState(false);
//   const doubleNumber = useMemo(() => slowFunction(number), [number]);
//   const themeStyles = {
//     backgroundColor: dark ? "black" : "white",
//     color: dark ? "white" : "black",
//   };

//   useEffect(() => console.log("Theme Changed"), [themeStyles]);

//   return (
//     <>
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(parseInt(e.target.value))}
//       />
//       <button onClick={() => setDark((prevDark) => !prevDark)}>
//         Change Theme
//       </button>
//       <div style={themeStyles}>{doubleNumber}</div>
//     </>
//   );
// }

// function slowFunction(num) {
//   console.log("Calling Slow Function");
//   for (let i = 0; i < 100000000; i++) {
//     return num * 2;
//   }
// }

// export default App;

//To get rid of this issue we will wrap themeStyles with useMemo hook as well. If our dark's state doesn't change we won't be changing to dark or light mode.

import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const doubleNumber = useMemo(() => slowFunction(number), [number]);
  const themeStyles = useMemo(() => {
    return {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  }
},[dark]);

  useEffect(() => console.log("Theme Changed"), [themeStyles]);

  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
}

function slowFunction(num) {
  console.log("Calling Slow Function");
  for (let i = 0; i < 100000000; i++) {
    return num * 2;
  }
}

export default App;
