import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [name, setName] = useState('');

  //useEffect doesnt accept async functions

  useEffect(() => {
    //but we have to make it async

    (async () => {
      //getting data from cookie

      const response = await fetch('http://localhost:8000/api/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const content = await response.json();

      setName(content.name);
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <main className="form-signin">
          {/* first name is a property */}
          <Route path="/" exact component={() => <Home name={name} />} />
          <Route path="/login" component={() => <Login setName={setName} />} />
          <Route path="/register" component={Register} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
