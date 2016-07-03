import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash/range';
import MovieCard from './MovieCard';

class MovieGrid extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      numPerRow: 4,
      itemHeight: 190,
    };
    this.onScreenResize = this.onScreenResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { movies } = this.props;
    if (!prevProps.movies.size && movies.size) {
      setTimeout(this.onScreenResize, 800);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onScreenResize);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onScreenResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  onScreenResize() {
    const el = ReactDOM.findDOMNode(this);
    const numPerRow = Math.ceil(el.clientWidth / 390);
    this.setState({
      el,
      numPerRow,
      itemHeight: el.firstChild.clientHeight
    }, this.onScroll);
  }

  onScroll() {
    const { onLoadPages, itemsPerPage } = this.props;
    const { el, numPerRow, itemHeight } = this.state;
    if (el) {
      const parent = el.offsetParent;
      const scrollHeight = window.innerHeight * 2;
      const scrollTop = parent.scrollTop - el.offsetTop - (scrollHeight * 0.25);
      const offsetTop = scrollTop > 0 ? scrollTop : 0;
      const numRows = Math.ceil(scrollHeight / itemHeight);
      const startRow = Math.floor(offsetTop / itemHeight);
      const endRow = startRow + numRows - 1;
      this.setState({
        numRows,
        startRow,
        endRow,
      });
      const startPage = Math.ceil((startRow + 1) * numPerRow / itemsPerPage);
      const endPage = Math.ceil((endRow + 1) * numPerRow / itemsPerPage);
      const pages = range(startPage, endPage + 1);
      onLoadPages(pages);
    }
  }

  render() {
    const { config, movies, totalItems } = this.props;
    const { numPerRow, itemHeight } = this.state;
    return (
      <div className="movies-grid" style={{ height: itemHeight * Math.ceil(totalItems / numPerRow) }}>
        {movies.toList().sortBy(movie => -movie.get('popularity')).map((movie, i) =>
          <MovieCard
            width={`${100 / numPerRow}%`}
            config={config}
            movie={movie}
            key={movie.get('id')}
            row={Math.floor(i / numPerRow)}
          />
        )}
      </div>
    );
  }
}

export default MovieGrid;
