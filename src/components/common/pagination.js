import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  let pages = [...Array(pagesCount + 1).keys()];
  pages = pages.filter(n => n !== 0);

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map(page => {
          return (
            <li
              key={page}
              className={
                currentPage === page ? 'page-item active' : 'page-item'
              }
              onClick={() => onPageChange(page)}
            >
              <button className='page-link'>{page}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
