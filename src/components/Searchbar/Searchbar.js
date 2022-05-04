import React, { Component } from 'react';
import s from './Searchbar.module.css';

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
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
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
