import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import Api from './Api';

export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    src: '',
    status: 'iddle',
    showModal: false,
    scrollPosition: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ status: 'pending' });
      const arr = await Api(this.state.searchQuery, this.state.page);
      this.setState({
        images: [...arr],
        status: arr.length > 0 ? 'resolved' : 'error',
        page: 1,
      });
    }
    if (prevState.page !== this.state.page) {
      const gallery = document.querySelector('.gallery');
      console.dir(gallery);
      this.setState({
        status: 'pending',
        scrollPosition: parseInt(gallery.scrollHeight),
      });
      const arr = await Api(this.state.searchQuery, this.state.page);
      this.setState(prev => ({
        images: [...prev.images, ...arr],
        status: 'resolved',
      }));
      setTimeout(
        () =>
          window.scrollTo({
            top: prevState.scrollPosition,
          }),
        0
      );
      setTimeout(
        () =>
          window.scrollTo({
            top: this.state.scrollPosition,
            behavior: 'smooth',
          }),
        200
      );
    }
  }

  onLoadMoreClick = ev => {
    ev.preventDefault();
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  onImageClick = e => {
    this.setState({ src: e.currentTarget.alt });
    this.toggleModal();
  };

  onFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery
          status={this.state.status}
          images={this.state.images}
          onClick={this.onImageClick}
        />
        {this.state.status === 'pending' && <Loader />}
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
