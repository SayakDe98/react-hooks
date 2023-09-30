//In this app we have an input field. We also have a list.
//For each key stroke we will add / push 20,000 list items equal to
//the input.
//This will keep getting laggy with more input.
//We can optimize this using the useDeferredValue hook which is similar to
//debounce or throttling.

import { useState } from 'react';
import './App.css';
import List from './List';

function App() {
  const [input, setInput] = useState('');

  function handleChange(e) {
    setInput(e.target.value);
  }
  return (
    <>
      <input type="text" value={input} onChange={handleChange} />
      <List input={input}/>
    </>
  );
}

export default App;

//With useDeferredValue we can make the input box feel responsive 
//even though the website isn't responsive
//useDeferredValue is similar to debounce or throttling.
//debounce means it will for a set period of time before adding items to the list in this example.
//let's say we give a delay of 100ms before we send request to add to list
//then if the gap between two keystrokes is less than 100ms then data 
//won't be added to list. This is same as debounce.

