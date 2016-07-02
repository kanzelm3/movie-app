import React, { Component } from 'react';

class MovieCard extends Component {

  get imageUrl() {
    const { config, movie } = this.props;
    const baseUrl = config.get('baseUrl');
    const size = config.getIn(['backdropSizes', 0]);
    const image = movie.get('backdropPath');
    return `${baseUrl}/${size}${image}`;
  }

  render() {
    const { movie } = this.props;
    return (
      <img style={{ flexGrow: 1 }} src={this.imageUrl} title={movie.get('title')} />
    );
  }

}

export default MovieCard;
