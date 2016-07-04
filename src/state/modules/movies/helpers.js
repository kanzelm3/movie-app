import range from 'lodash/range';

export const calculateCardDimensions = ({ containerWidth, width, height }) => {
  const numPerRow = Math.ceil(containerWidth / width);
  const itemWidth = containerWidth / numPerRow;
  const itemHeight = height * (itemWidth / width);
  return { numPerRow, itemWidth, itemHeight };
};

export const calculatePagesToLoad = ({
  scrollHeight,
  scrollPosition,
  itemHeight,
  itemsPerPage,
  totalItems,
  numPerRow
}) => {
  // define the infinite scroll height threshold as 2x the height of the window
  const infiniteScrollHeight = scrollHeight * 2;
  const scrollTop = scrollPosition - (infiniteScrollHeight * 0.25);
  const offsetTop = scrollTop > 0 ? scrollTop : 0;
  // find number of rows that should be loaded based on scroll position
  const numRows = Math.ceil(infiniteScrollHeight / itemHeight);
  const startRow = Math.floor(offsetTop / itemHeight);
  const endRow = startRow + numRows - 1;
  // calculate the pages to request from the API
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  let startPage = Math.ceil((startRow + 1) * numPerRow / itemsPerPage);
  let endPage = Math.ceil((endRow + 1) * numPerRow / itemsPerPage);
  startPage = startPage < lastPage ? startPage : lastPage;
  endPage = endPage < lastPage ? endPage : lastPage;
  return range(startPage, endPage + 1);
};
