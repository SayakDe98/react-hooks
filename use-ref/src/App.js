//This app takes an input and returns My name is <input value>

// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [name, setName] = useState('');

//   return (
//     <div className="App">
//       <input value={name} onChange={e => setName(e.target.value)} />
//       <div>My name is {name}</div>
//     </div>
//   );
// }

// export default App;

//Now if we want to check how many times we have rendered our component we can think of using state and useEffect like below but it would cause our app to go to an infinite loop. So don't run what's below. It's wrong way to check render count.

// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [name, setName] = useState("");
//   const [renderCount, setRenderCount] = useState(0);

//   useEffect(() => setRenderCount(prevRenderCount => prevRenderCount + 1));

//   return (
//     <div className="App">
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <div>My name is {name}</div>
//       <div>I rendered {renderCount} times</div>
//     </div>
//   );
// }

// export default App;

//We will be using refs in such a case. A ref is used to persist states between renders of the component. An IMPORTANT difference between refs and states is that ref doesn't cause our component to re update when it gets changed. So let's now use ref (useRef)instead of state (useState). useRef returns a single value instead of two values. useRef returns an object with a single property called current. So when we update our renderCount it gets persisted between renders. We can change our ref to change any number of times but it won't cause our component to re render. It is completely separate to render cycle. This is a use case of ref.

// import { useEffect, useRef, useState } from "react";
// import "./App.css";

// function App() {
//   const [name, setName] = useState('');
//   const renderCount = useRef(1);
  
//   useEffect(() => {renderCount.current = renderCount.current + 1});

//   return (
//     <div className="App">
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <div>My name is {name}</div>
//       <div>I rendered {renderCount.current} times</div>
//     </div>
//   );
// }

// export default App;

//Another use case of ref (WHICH IS THE BIGGEST USE CASE OF ref) is to reference elements inside HTML. Below we see whenever our inputRef gets rendered on the screen then we are going to set the inputRef equal to the document element called input element.

// import { useRef, useState } from "react";
// import "./App.css";

// function App() {
//   const [name, setName] = useState("");
//   const inputRef = useRef();

//   return (
//     <div className="App">
//       <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
//       <div>My name is {name}</div>
//     </div>
//   );
// }

// export default App;

//Now we want to focus on the input element when a button is clicked 
// import { useRef, useState } from "react";
// import "./App.css";

// function App() {
//   const [name, setName] = useState("");
//   const inputRef = useRef();

//   function focus() {
//     console.log(inputRef.current);//we get the dom node as the output value of inputRef.current which is exactly same as document.querySelector to get dom node.
//     inputRef.current.focus();
    
//   }
//   return (
//     <div className="App">
//       <input
//         ref={inputRef}
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <div>My name is {name}</div>
//       <button onClick={focus}>Focus</button>
//     </div>
//   );
// }

// export default App;

//Sometimes people tend to overuse ref and don't use state at all which is wrong. This just sets the value of the component but doesn't change state. We can see the My name is empty whereas on clicking focus we get the Some Value inside input element. Hence this wrong way to do react. People also use appendChild or remove child with refs but it is a wrong way to use react. We should do this using other hooks like useState.

// import { useRef, useState } from "react";
// import "./App.css";

// function App() {
//   const [name, setName] = useState("");
//   const inputRef = useRef();

//   function focus() {
//     inputRef.current.value = "Some Value";
//   }
//   return (
//     <div className="App">
//       <input
//         ref={inputRef}
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <div>My name is {name}</div>
//       <button onClick={focus}>Focus</button>
//     </div>
//   );
// }

// export default App;

//Another use case of ref is to store the previous value of your state.

import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState('');
  const prevName = useRef('');


  useEffect(() => {
    prevName.current = name;
  }, [name]);
  return (
    <div className="App">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>My name is {name} and it used to be {prevName.current}</div>
    </div>
  );
}

export default App;
