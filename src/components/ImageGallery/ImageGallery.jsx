import React, { Component } from 'react';
import axios from 'axios';
import ImmageGalleryItem from './ImmageGalleryItem';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=25607511-28b83b13f0e2975028585da7b&image_type=photo&orientation=horizontal&per_page=12&';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    searchQuerry: '',
    status: 'iddle',
  };

  async componentDidMount() {
    this.setState({ searchQuerry: this.props.querry });
    const query = `q=${this.state.searchQuerry}&page=${this.state.page}`;
    const resp = await axios.get(query);
    this.setState({ images: [...resp.data.hits] });
  }

  render() {
    return (
      <ul className="gallery">
        {this.state.images.map(({ id, webformatURL, largeImageURL }) => (
          <ImmageGalleryItem
            key={id}
            smallImg={webformatURL}
            largeImb={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}
