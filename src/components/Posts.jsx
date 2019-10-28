import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts, options, fun }) => {
  const { maxSize, pagination } = options;
  const data = posts
    .filter((p, i) => (p) && (i >= pagination) && (i < (pagination + maxSize)))
    .map((post) => <li key={post.name} className="collection-item">{post.name}</li>);
  return (
    <div className="col s6 offset-s3">
      <ul className="collection">
        {data}
      </ul>
      <div className="center-align">
        <button
          className="btn waves-effect waves-light"
          name="action"
          onClick={() => fun('left')}
          id="downButton"
          disabled={pagination <= 0}
          type="button"
          style={{ marginRight: '5px' }}
        >
          <i className="fas fa-angle-left" />
        </button>
        <button
          className="btn waves-effect waves-light"
          name="action"
          onClick={() => fun('right')}
          id="upButton"
          type="button"
          disabled={(maxSize + pagination) >= posts.length}
        >
          <i className="fas fa-angle-right" />
        </button>
      </div>

    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.shape({
    maxSize: PropTypes.number.isRequired,
    pagination: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  fun: PropTypes.func.isRequired,
};

export default Posts;
