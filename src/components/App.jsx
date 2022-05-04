import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  onFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101',
      // }}
      >
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery searchQuerry={this.state.searchQuery} />
      </div>
    );
  }
}
