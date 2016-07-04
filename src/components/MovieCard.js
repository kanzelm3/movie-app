import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import shallowCompare from 'react-addons-shallow-compare';
import MoviePoster from './MoviePoster';

export const MOVIE_WIDTH = 390;
export const MOVIE_HEIGHT = 220;

class MovieCard extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  get imageUrl() {
    const { config, movie } = this.props;
    const baseUrl = config.get('baseUrl');
    const size = config.getIn(['backdropSizes', 1]);
    const image = movie.get('backdropPath');
    return `${baseUrl}/${size}${image}`;
  }

  render() {
    const { movie, width, height } = this.props;
    return (
      <div
        className="movie-card"
        style={{ width, height }}
      >
        <ReactCSSTransitionGroup
          transitionName="movie-card"
          transitionAppearTimeout={800}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
          transitionAppear
        >
          <MoviePoster
            src={this.imageUrl}
          />
          <div className="movie-card-title">
            <span className="movie-card-title-text">{movie.get('title')}</span>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

MovieCard.propTypes = {
  config: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default MovieCard;
