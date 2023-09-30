//In this app we are going to create a custom hook. Custom hooks are reusable functions which are user created. They have a prefix of use before defining their name.
//an example name of custom hook will be
//useCustom, useCalculate and so on...
//In this app we are going to create a hook which stores input data in local storage so that we can persist data on refresh.
//Initially we made useLocalStorage same as useState hook:
// import './App.css';
// import useLocalStorage from './utils/hooks/useLocalStorage';

// function App() {
//   const [name, setName] = useLocalStorage('');
//   return (
//     <div className="App">
//     </div>
//   );
// }

// export default App;

//Now let's use this hook for storing to local storage;
// import "./App.css";
// import useLocalStorage from "./utils/hooks/useLocalStorage";

// function App() {
//   const [name, setName] = useLocalStorage("name", "");
//   return <input
//   type="text"
//   value={name}
//   onChange={e => setName(e.target.value)}
//   >
//   </input>;
// }

// export default App;

//Now let's use the useUpdateLogger to log our name every time name changes
import "./App.css";
import useLocalStorage from "./utils/hooks/useLocalStorage";
import useUpdateLogger from "./utils/hooks/useUpdateLogger";

function App() {
  const [name, setName] = useLocalStorage("name", "");
  
  useUpdateLogger(name);

  return <input
  type="text"
  value={name}
  onChange={e => setName(e.target.value)}
  >
  </input>;
}

export default App;

//We can encapsulate logic inside custom hooks and share it in multiple components.
