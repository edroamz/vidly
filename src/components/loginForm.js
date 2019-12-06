import React, { useState } from 'react';

const LoginForm = () => {
  const [account, dispatch] = useState({
    username: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange({ currentTarget: input }) {
    const data = { ...account };
    data[input.name] = input.value;
    dispatch(data);
  }

  return (
    <div className='w-100'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            value={account.username}
            onChange={handleChange}
            type='text'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            value={account.password}
            onChange={handleChange}
            type='text'
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
