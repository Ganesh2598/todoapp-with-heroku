import React from 'react';
import './App.css';
import history from './History'
import Maincontent from './Components/Maincontent'

function App() {

  return (
    <div>
      <h1>Todo List</h1>
      <Maincontent props={history}/>
    </div>
  );
}

export default App;
