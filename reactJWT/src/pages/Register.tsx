import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {
  // this is how we handle state in react,
  // the first is a variable
  // the second is a function that changes this variable
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  //in tsx we have to define the type of event
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password
    });
    await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/login" />;

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal"> Please Register</h1>
      <input
        className="form-control"
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Register;
