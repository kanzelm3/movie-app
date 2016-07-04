import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash/range';
import CircularProgress from 'material-ui/CircularProgress';
import MovieCard, { MOVIE_WIDTH, MOVIE_HEIGHT } from './MovieCard';
import shallowCompare from 'react-addons-shallow-compare';

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
    const numPerRow = Math.ceil(el.clientWidth / MOVIE_WIDTH);
    const itemWidth = el.clientWidth / numPerRow;
    const itemHeight = MOVIE_HEIGHT * (itemWidth / MOVIE_WIDTH);
    this.setState({
      el,
      numPerRow,
      itemHeight,
    }, this.onScroll);
  }

  onScroll() {
    const { onLoadPages, itemsPerPage, totalItems } = this.props;
    const { el, numPerRow, itemHeight } = this.state;
    if (el) {
      const parent = el.offsetParent;
      // define the infinite scroll height threshold as 2x the height of the window
      const scrollHeight = window.innerHeight * 2;
      const scrollTop = parent.scrollTop - el.offsetTop - (scrollHeight * 0.25);
      const offsetTop = scrollTop > 0 ? scrollTop : 0;
      // find number of rows that should be loaded based on scroll position
      const numRows = Math.ceil(scrollHeight / itemHeight);
      const startRow = Math.floor(offsetTop / itemHeight);
      const endRow = startRow + numRows - 1;
      // calculate the pages to request from the API
      const lastPage = Math.ceil(totalItems / itemsPerPage);
      let startPage = Math.ceil((startRow + 1) * numPerRow / itemsPerPage);
      let endPage = Math.ceil((endRow + 1) * numPerRow / itemsPerPage);
      startPage = startPage < lastPage ? startPage : lastPage;
      endPage = endPage < lastPage ? endPage : lastPage;
      const pages = range(startPage, endPage + 1);
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

export default MovieGrid;
