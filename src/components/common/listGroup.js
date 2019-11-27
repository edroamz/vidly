import React from 'react';

const ListGroup = props => {
  const { genres } = props;
  console.log(genres);

  return (
    <ul class='list-group'>
      {genres.map(genre => {
        return (
          <li key={genre._id} class='list-group-item'>
            {genre.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
