import React from 'react';

const Navbar = ({ movies }) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <a className='navbar-brand' href='/'>
        Action Genre{' '}
        <span className='badge badge-pill badge-secondary'>
          {movies.filter(m => m.genre.name === 'Action').length}
        </span>
      </a>
    </nav>
  );
};

export default Navbar;
