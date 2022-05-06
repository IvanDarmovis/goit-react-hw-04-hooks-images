import React, { Component } from 'react';
import axios from 'axios';
import { AtomSpinner } from 'react-epic-spinners';
import ImmageGalleryItem from './ImmageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import s from './ImageGallery.module.css';

const APIKEY = '25607511-28b83b13f0e2975028585da7b&image';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    src: '',
    status: 'iddle',
    showModal: false,
  };

  componentDidMount() {
    this.setState({ page: 1, status: 'iddle' });
  }

  async componentDidUpdate(prevProps, prevState) {
    const url = `https://pixabay.com/api/?q=${this.props.searchQuerry}&page=${this.state.page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;

    if (this.props.searchQuerry !== prevProps.searchQuerry) {
      this.setState({ status: 'pending' });
      const resp = await axios.get(url);
      console.log(resp);
      this.setState({
        images: [...resp.data.hits],
        status: resp.data.total > 0 ? 'resolved' : 'error',
        total: resp.data.total,
      });
    }
    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      const resp = await axios.get(url);
      this.setState(prev => ({
        images: [...prev.images, ...resp.data.hits],
        status: 'resolved',
        total: resp.data.total,
      }));
    }
  }

  onLoadMoreClick = ev => {
    ev.preventDefault();
    this.setState(prev => ({ page: (prev.page += 1) }));
  };

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  onImageClick = e => {
    this.setState({ src: e.currentTarget.alt });
    this.toggleModal();
  };

  render() {
    if (this.state.status === 'iddle')
      return (
        <div className={s.start}>
          <p>No images loaded</p>
        </div>
      );

    if (this.state.status === 'error')
      return (
        <div className={s.start}>
          <p>Something went wrong. Try again!</p>
        </div>
      );

    if (this.state.status === 'pending')
      return <AtomSpinner color="#3f51b5" className={s.sipner} />;

    if (this.state.status === 'resolved')
      return (
        <div className={s.container}>
          <ul className={s.gallery}>
            {this.state.images.map(({ id, webformatURL, largeImageURL }) => (
              <ImmageGalleryItem
                onClick={this.onImageClick}
                key={id}
                smallImg={webformatURL}
                largeImb={largeImageURL}
              />
            ))}
          </ul>
          {this.state.images.length > 0 && (
            <Button onClick={this.onLoadMoreClick}>Load more</Button>
          )}
          {this.state.showModal && (
            <Modal onClose={this.toggleModal} src={this.state.src} />
          )}
        </div>
      );
  }
}
