//Higher Order Component is a component which takes another component as a 
//props and returns a modified version of the component which it took it as props
//We created two components. One is the App component the other is the
//Counter component. We called the Counter component from inside the App component.
// import { useState } from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>HOC</h1>
//       <Counter />
//     </div>
//   );
// }

// function Counter() {
//   const [count, setCount] = useState(0);

//   return <div>
//     <h3>
//       {count}
//       <div>
//         <button onClick={() => setCount(count + 1)}>Update</button>
//       </div>
//     </h3>
//   </div>
// }

// export default App;

//Now we want to have multiple counters with different colors. We can do that using props.
// import { useState } from "react";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>HOC</h1>
//       <Counter backgroundColor="white" color="black" />
//       <Counter backgroundColor="red" color="white" />
//       <Counter backgroundColor="green" color="white" />
//     </div>
//   );
// }

// function Counter({ backgroundColor, color }) {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h3>
//         {count}
//         <div>
//           <button style={{ backgroundColor, color }} onClick={() => setCount(count + 1)}>Update</button>
//         </div>
//       </h3>
//     </div>
//   );
// }

// export default App;

//Let's do that using HOC for the whole component instead of just the button:
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>HOC</h1>
      <HOCBlue component={Counter} />
      <HOCRed component={Counter} />
      <HOCGreen component={Counter} />
    </div>
  );
}

function HOCBlue(props) {
  return (
    <h2 style={{ backgroundColor: "blue", width: 100 }}>
      <props.component />
    </h2>
  );
}

function HOCRed(props) {
  return (
    <h2 style={{ backgroundColor: "red", width: 100 }}><props.component /></h2>
  );
}

function HOCGreen(props) {
  return (
    <h2 style={{ backgroundColor: "green", width: 100 }}>
      <props.component />
    </h2>
  );
}


function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>
        {count}
        <div>
          <button onClick={() => setCount(count + 1)}>Update</button>
        </div>
      </h3>
    </div>
  );
}

export default App;