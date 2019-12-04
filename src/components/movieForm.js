import React from 'react';

const MovieForm = ({ history, match }) => {
  function handleSave() {
    history.push('/movies');
  }

  console.log(match);

  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button className='btn btn-primary' onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
