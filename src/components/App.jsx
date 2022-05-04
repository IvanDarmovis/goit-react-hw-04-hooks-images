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
      <div>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery searchQuerry={this.state.searchQuery} />
      </div>
    );
  }
}
