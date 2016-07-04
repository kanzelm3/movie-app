import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../containers/Header';

class BaseLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <div className="app">
            {React.Children.map(children, child => React.cloneElement(child, this.props))}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default BaseLayout;
