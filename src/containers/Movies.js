import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as configActions from '../state/modules/config/actions';
import * as moviesActions from '../state/modules/movies/actions';
import MovieGrid from '../components/MovieGrid';

const mapStateToProps = ({ config, movies }) => ({
  isFetching: movies.get('isFetching'),
  config: config.get('images'),
  movies: movies.get('entities'),
  page: movies.get('page'),
  itemsPerPage: movies.get('itemsPerPage'),
  totalItems: movies.get('totalItems'),
});
const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, configActions, moviesActions), dispatch);

class Movies extends Component {

  componentWillMount() {
    const { loadConfig, loadMovies, page } = this.props;
    loadConfig();
    loadMovies(page);
  }

  render() {
    const { config, movies, totalItems } = this.props;
    return (
      <div>
        <ReactCSSTransitionGroup
          className="movies-title-wrapper"
          transitionName="movies-title"
          transitionAppearTimeout={800}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
          transitionAppear
        >
          <h1 className="movies-title">Popular</h1>
        </ReactCSSTransitionGroup>
        <MovieGrid config={config} movies={movies} totalItems={totalItems} />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
