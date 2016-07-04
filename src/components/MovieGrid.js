import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from 'material-ui/CircularProgress';
import shallowCompare from 'react-addons-shallow-compare';
import { calculateCardDimensions, calculatePagesToLoad } from '../state/modules/movies/helpers';
import MovieCard, { MOVIE_WIDTH, MOVIE_HEIGHT } from './MovieCard';

class MovieGrid extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      numPerRow: 4,
      itemHeight: MOVIE_HEIGHT,
    };
    this.onScreenResize = this.onScreenResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  // only re-render if props/state change
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    window.addEventListener('load', this.onScreenResize);
    window.addEventListener('resize', this.onScreenResize);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    // dispose of listeners on component unmount to prevent memory leaks
    window.removeEventListener('load', this.onScreenResize);
    window.removeEventListener('resize', this.onScreenResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  // on resize calculate new item height and number per row
  onScreenResize() {
    let { el } = this.state;
    el = !el ? ReactDOM.findDOMNode(this) : el;
    const dimensions = calculateCardDimensions({
      containerWidth: el.clientWidth,
      width: MOVIE_WIDTH,
      height: MOVIE_HEIGHT
    });
    this.setState(Object.assign({ el }, dimensions), this.onScroll);
  }

  onScroll() {
    const { onLoadPages, itemsPerPage, totalItems } = this.props;
    const { el, numPerRow, itemHeight } = this.state;
    if (el) {
      const pages = calculatePagesToLoad({
        // define the infinite scroll height threshold as 2x the height of the window
        scrollHeight: window.innerHeight,
        scrollPosition: window.scrollY - el.offsetTop,
        itemHeight,
        itemsPerPage,
        totalItems,
        numPerRow
      });
      // finally, load the pages that are in view (parent has load logic due to IoC)
      onLoadPages(pages);
    }
  }

  render() {
    const { config, movies, totalItems, loading } = this.props;
    const { numPerRow, itemHeight } = this.state;
    return (
      <div className="movies-grid">
        {movies.toList().map((movie, i) =>
          <MovieCard
            width={`${100 / numPerRow}%`}
            height={itemHeight}
            config={config}
            movie={movie}
            key={movie.get('id')}
          />
        )}
        {
          // display loading animation if fetching data from API
          !loading ? null :
          <div
            style={{
              width: '100%',
              padding: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress color="#999" />
          </div>
        }
      </div>
    );
  }
}

MovieGrid.propTypes = {
  config: PropTypes.object,
  movies: PropTypes.object,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onLoadPages: PropTypes.func.isRequired
};

export default MovieGrid;
