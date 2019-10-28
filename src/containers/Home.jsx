import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchPostsIfNeeded from '../actions/index';
import { changeSelect, changePagination } from '../actions/changeData';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.localChangePagination = this.localChangePagination.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedReducer } = this.props;
    dispatch(fetchPostsIfNeeded(selectedReducer));
  }

  componentDidUpdate(prevProps) {
    const { selectedReducer } = this.props;
    if (prevProps.selectedReducer.name !== selectedReducer.name) {
      const { dispatch } = this.props;
      dispatch(fetchPostsIfNeeded(selectedReducer));
    }
  }

  handleChange(option) {
    const { dispatch } = this.props;
    dispatch(changeSelect(option));
  }

  localChangePagination(e) {
    const { dispatch } = this.props;
    dispatch(changePagination(e));
  }

  dataRender() {
    const { selectedReducer, posts, isFetching } = this.props;
    const isEmpty = posts.length === 0;
    let component;
    if (isEmpty) {
      if (isFetching) component = <h2>Loading...</h2>;
      else component = <h2>Empty.</h2>;
    } else {
      component = (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts
            posts={posts}
            options={selectedReducer}
            fun={this.localChangePagination}
          />
        </div>
      );
    }
    return component;
  }

  render() {
    const { selectedReducer } = this.props;
    return (
      <div className="row">
        <Picker
          value={selectedReducer.name}
          onChange={this.handleChange}
          options={['comments', 'users']}
        />
        {
          this.dataRender()
        }
      </div>
    );
  }
}
Home.propTypes = {
  selectedReducer: PropTypes.shape({
    maxSize: PropTypes.number.isRequired,
    pagination: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { selectedReducer, postsReducer } = state;
  const { isFetching, lastUpdated, items: posts } = postsReducer[selectedReducer.name] || {
    isFetching: false,
    items: [],
  };

  return {
    selectedReducer, posts, isFetching, lastUpdated,
  };
};

export default connect(mapStateToProps)(Home);
