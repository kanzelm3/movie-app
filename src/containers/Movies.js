import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import shallowCompare from 'react-addons-shallow-compare';
import * as configActions from '../state/modules/config/actions';
import * as moviesActions from '../state/modules/movies/actions';
import MovieGrid from '../components/MovieGrid';

const mapStateToProps = ({ config, movies }) => ({
  loading: movies.get('isFetching'),
  config: config.get('images'),
  movies: movies.get('entities'),
  itemsPerPage: movies.get('itemsPerPage'),
  totalItems: movies.get('totalItems'),
});
const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, configActions, moviesActions), dispatch);

class Movies extends Component {

  constructor(...args) {
    super(...args);
    this.onLoadPages = this.onLoadPages.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillMount() {
    const { loadConfig, loadMovies } = this.props;
    loadConfig();
  }

  onLoadPages(pages) {
    const { loadMovies } = this.props;
    pages.forEach(page => loadMovies(page));
  }

  render() {
    const { config, movies, loading, totalItems, itemsPerPage } = this.props;
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
        <MovieGrid
          config={config}
          movies={movies}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          loading={loading}
          onLoadPages={this.onLoadPages}
        />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
