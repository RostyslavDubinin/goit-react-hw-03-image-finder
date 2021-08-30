import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import imagesApi from "./components/pixabay-api";
import Button from "./components/Button";
import Modal from "./components/Modal";
import styles from "./App.module.css";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
    largeImageURL: "",
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { images } = this.state;
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = (imageUrl) => {
    this.setState({ largeImageURL: imageUrl });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, error, largeImageURL, showModal } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div className={styles.app}>
        {error && <h1>Ой ошибка</h1>}

        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onOpenModal={this.onOpenModal} />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
      </div>
    );
  }
}

export default App;
