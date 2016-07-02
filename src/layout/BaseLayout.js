import React, { Component } from 'react';
import Header from '../containers/Header';

class BaseLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <div className="app">
          {React.Children.map(children, child => React.cloneElement(child, this.props))}
        </div>
      </div>
    );
  }
}

export default BaseLayout;
