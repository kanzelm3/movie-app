import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const PendingPool = {};
const ReadyPool = {};

// component to improve performance of movie poster loading/caching
class MoviePoster extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      ready: false
    };
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillMount() {
    const { src } = this.props;
    this.loadImage(src);
  }

  componentDidMount() {
    this.setState({ ready: true });
  }

  componentWillReceiveProps(nextProps) {
    const { src } = nextProps;
    // if image src changes, load new image src
    if (src !== this.props.src) {
      this.setState({ src: null });
      this.loadImage(src);
    }
  }

  loadImage(src) {
    // check to see if image has already been loaded previously
    if (ReadyPool[src]) {
      this.setState({ src });
      return;
    }

    // check to see if image with same source is already loading and if so,
    // add onLoad method to pending image load handler array, don't try to load again
    if (PendingPool[src]) {
      PendingPool[src].push(this.onImageLoad);
      return;
    }

    // if not found, add record with onLoad method to the pending pool hash table
    // for the image src
    PendingPool[src] = [this.onImageLoad];

    // load the image and then execute all of the onLoad methods in the pending
    // pool at the record for the provided src, then remove from pending pool
    const img = new Image();
    img.onload = () => {
      PendingPool[src].forEach((callback) => {
        callback(src);
      });
      delete PendingPool[src];
      img.onload = null;
      src = undefined;
    };
    img.src = src;
  }

  onImageLoad(src) {
    // add image src to ready pool and update component state with the src so it
    // can render the loaded image
    ReadyPool[src] = true;
    if (this.state.ready && src === this.props.src) {
      this.setState({ src });
    }
  }

  get styles() {
    const { src } = this.state;
    if (src) {
      return {
        backgroundImage: 'url(' + src + ')',
      };
    }
  }

  render() {
    return <div className="movie-card-poster" style={this.styles} />;
  }

}

export default MoviePoster;
