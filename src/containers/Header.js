import React, { Component } from 'react';
import NetflixLogo from '../assets/images/netflix-logo.png';
import Avatar from '../assets/images/avatar.png';

class Header extends Component {

  constructor(...args) {
    super(...args);
    this.navItems = [
      { url: '#', label: 'Browse' },
      { url: '#', label: 'Kids' }
    ];
  }

  renderNavItems() {
    const navItems = this.navItems;
    const lastIndex = navItems.length - 1;
    return navItems.reduce((items, { url, label }, i) => {
      let _items = items.concat(<a className="nav-item" href={url} title={label} key={`nav-item-${i}`}>{label}</a>);
      if (i !== lastIndex) {
        _items = _items.concat(<div className="nav-item-separator" key={`nav-separator-${i}`} />);
      }
      return _items;
    }, []);
  }

  render() {
    return (
      <header className="header">
        <img className="logo" width="148" height="40" src={NetflixLogo} alt="Netflix" />
        <nav className="navigation">
          <a style={{ paddingTop: 5 }} href="#" title="Search"><i className="material-icons">search</i></a>
          {this.renderNavItems()}
        </nav>
        <div className="navigation">
          <a style={{ paddingTop: 5 }} href="#" title="Notifications"><i className="material-icons">notifications</i></a>
          <a href="#" title="My Profile"><img className="avatar" src={Avatar} /></a>
        </div>
      </header>
    );
  }

}

export default Header;
