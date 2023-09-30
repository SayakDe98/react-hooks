//This app does two things: Take a number input and call a function which calculates the number, number + 1 and number + 2 and displays these three numbers on screen. This app also has a button for toggling dark mode to light mode and vice versa.

// import { useState } from 'react';
// import './App.css';
// import List from './List';

// function App() {
//   const [number, setNumber] = useState(1);
//   const [dark, setDark] = useState(false);

//   const getItems = () => {
//     return [number, number + 1, number + 2];
//   };

//   const theme = {
//     backgroundColor: dark ? '#333' : '#FFF',
//     color: dark ? '#FFF' : '#333'
//   };

//   return (
//     <div style={theme}>
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(parseInt(e.target.value))}
//       />
//       <button onClick={() => setDark((prevDark) => !prevDark)}>
//         Toggle Theme
//       </button>
//         <List getItems={getItems} />
//     </div>
//   );
// }

// export default App;

//When we are pressing toggle theme then also we are running the function getItems(). This can be fixed by useCallback hook. By using it we can see below that when we toggle theme we are not updating items. But when we are increasing or decreasing value of input then we are updating items. The difference between useCallback and useMemo is that useMemo returns a value whereas useCallback returns a function. If we use useMemo instead of useCallback then getItems would be set to the array instead of the function which returns the array. We are not creating a new function getItems on every render except when number changes. This is regarding referential equality. Still like we saw in useMemo if we run useEffect hook with dependency of theme then we will see on number change theme updated also gets updated. See below:

// import { useCallback, useEffect, useState } from "react";
// import "./App.css";
// import List from "./List";

// function App() {
//   const [number, setNumber] = useState(1);
//   const [dark, setDark] = useState(false);

//   const getItems = useCallback(() => {
//     return [number, number + 1, number + 2];
//   },[number]);

//   const theme = {
//     backgroundColor: dark ? "#333" : "#FFF",
//     color: dark ? "#FFF" : "#333",
//   };

//   return (
//     <div style={theme}>
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(parseInt(e.target.value))}
//       />
//       <button onClick={() => setDark((prevDark) => !prevDark)}>
//         Toggle Theme
//       </button>
//       <List getItems={getItems} />
//     </div>
//   );
// }

// export default App;

// Still like we saw in useMemo if we run useEffect hook with dependency of theme then we will see on number change theme updated also gets updated. This is due to referential equality as a new object of theme gets created on new render. See below:

// import { useCallback, useEffect, useState } from "react";
// import "./App.css";
// import List from "./List";

// function App() {
//   const [number, setNumber] = useState(1);
//   const [dark, setDark] = useState(false);

//   const getItems = useCallback(() => {
//     return [number, number + 1, number + 2];
//   },[number]);

//   const theme = {
//     backgroundColor: dark ? "#333" : "#FFF",
//     color: dark ? "#FFF" : "#333",
//   };

//   useEffect(() => console.log("Theme Changed"), [theme]);
//   return (
//     <div style={theme}>
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(parseInt(e.target.value))}
//       />
//       <button onClick={() => setDark((prevDark) => !prevDark)}>
//         Toggle Theme
//       </button>
//       <List getItems={getItems} />
//     </div>
//   );
// }

// export default App;

//So let's use the useMemo to prevent this. Which creates new object when dark's state changes.
import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import List from "./List";

function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  const getItems = useCallback(() => {
    return [number, number + 1, number + 2];
  }, [number]);

  const theme = useMemo(() => {return {
    backgroundColor: dark ? "#333" : "#FFF",
    color: dark ? "#FFF" : "#333",
  }}, [dark])

  useEffect(() => console.log("Theme Changed"), [theme]);
  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}

export default App;
//So in this instance we don't want to re create the function on every render that's why we use the useCallback function.
//The other instance is a very rare case where we should use the useCallback hook is when the function which we want to create takes a long time to create. So we should wrap that function with useCallback and run it only when required so that for the other times things run fast and our app is not getting slowed at that time.
