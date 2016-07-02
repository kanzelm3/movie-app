import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as configActions from '../state/modules/config/actions';
import * as moviesActions from '../state/modules/movies/actions';
import MovieCard from '../components/MovieCard';

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

  get styles() {
    return {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }

  componentWillMount() {
    const { loadConfig, loadMovies, page } = this.props;
    loadConfig();
    loadMovies(page);
  }

  render() {
    const { config, movies } = this.props;
    return (
      <div style={this.styles}>
        {movies.toList().map(movie => <MovieCard config={config} movie={movie} key={movie.get('id')} />)}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
