import React from 'react';
import './App.css';
import { Warehouse } from './component/Warehouse';

function App() {
    console.log(`NODE_ENV:  ${process.env.NODE_ENV}`);
  return (
    <div className="App">
      <Warehouse/>
    </div>
  );
}

export default App;
