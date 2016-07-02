import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      this.onScreenResize();
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
    const { el, numPerRow, itemHeight } = this.state;
    const parent = el.offsetParent;
    const scrollHeight = parent.clientHeight * 2;
    const scrollTop = parent.scrollTop - el.offsetTop;
    const offsetTop = scrollTop > 0 ? scrollTop : 0;
    const numRows = Math.ceil(scrollHeight / itemHeight);
    const startRow = Math.floor(offsetTop / itemHeight);
    this.setState({
      numRows,
      startRow,
    });
  }

  render() {
    const { config, movies, totalItems } = this.props;
    const { numPerRow, itemHeight } = this.state;
    return (
      <div className="movies-grid" style={{ height: itemHeight * Math.ceil(totalItems / numPerRow) }}>
        {movies.toList().map((movie, i) =>
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
