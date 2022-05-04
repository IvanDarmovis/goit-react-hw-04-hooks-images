import React, { Component } from 'react';
import axios from 'axios';
import ImmageGalleryItem from './ImmageGalleryItem';
import s from './ImageGallery.module.css';
import Button from './Button';
// import HashLoader from 'react-spiners/HashLoader';

const APIKEY = '25607511-28b83b13f0e2975028585da7b&image';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'iddle',
  };

  componentDidMount() {
    this.setState({ page: 1 });
  }

  async componentDidUpdate(prevProps, prevState) {
    const url = `https://pixabay.com/api/?q=${this.props.searchQuerry}&page=${this.state.page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;
    if (this.props.searchQuerry !== prevProps.searchQuerry) {
      const resp = await axios.get(url);
      this.setState({ images: [...resp.data.hits] });
    }
    if (prevState.page !== this.state.page) {
      const resp = await axios.get(url);
      this.setState(prev => ({ images: [...prev.images, ...resp.data.hits] }));
    }
  }

  onLoadMoreClick = ev => {
    ev.preventDefault();
    this.setState(prev => ({ page: (prev.page += 1) }));
  };

  // override = css`
  //   display: block;
  //   margin: 0 auto;
  //   border-color: red;
  // `;

  render() {
    return (
      <div className={s.container}>
        <ul className={s.gallery}>
          {this.state.images.map(({ id, webformatURL, largeImageURL }) => (
            <ImmageGalleryItem
              key={id}
              smallImg={webformatURL}
              largeImb={largeImageURL}
            />
          ))}
        </ul>
        <Button onClick={this.onLoadMoreClick}>Load more</Button>
        {/* <HashLoader size={150} margin={10} css={this.override} /> */}
      </div>
    );
  }
}
