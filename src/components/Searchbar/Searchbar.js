import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onChange = ev => {
    this.setState({ searchQuery: ev.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    console.log(ev);
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}
