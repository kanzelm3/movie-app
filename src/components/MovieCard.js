import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import shallowCompare from 'react-addons-shallow-compare';

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
    const { movie, width } = this.props;
    return (
      <div
        className="movie-card"
        style={{ width }}
      >
        <ReactCSSTransitionGroup
          transitionName="movie-card"
          transitionAppearTimeout={800}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
          transitionAppear
        >
          <img
            src={this.imageUrl}
            title={movie.get('title')}
          />
          <div className="movie-card-title">
            <span className="movie-card-title-text">{movie.get('title')}</span>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default MovieCard;
