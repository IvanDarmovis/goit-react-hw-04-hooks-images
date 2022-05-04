import React, { Component } from 'react';
import axios from 'axios';
import ImmageGalleryItem from './ImmageGalleryItem';
import s from './ImageGallery.module.css';

const APIKEY = '25607511-28b83b13f0e2975028585da7b&image';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    searchQuerry: '',
    status: 'iddle',
  };

  async componentDidMount() {
    this.setState({ images: [], page: 1 });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.searchQuerry !== prevProps.searchQuerry) {
      const url = `https://pixabay.com/api/?q=${this.props.searchQuerry}&page=${this.state.page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;
      const resp = await axios.get(url);
      this.setState({ images: [...resp.data.hits] });
    }
  }

  render() {
    return (
      <ul className={s.gallery}>
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
