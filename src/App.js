import React from 'react';
import './App.css';
import Movies from './components/movies';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className='App'>
      <main className='main'>
        <div className='row mt-5'>
          <Movies></Movies>
        </div>
      </main>
    </div>
  );
}

export default App;
