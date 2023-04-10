import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './App.module.css';
import getImages from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

class App extends Component {
  static propTypes = { searchQuery: PropTypes.string };
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const data = await getImages(searchQuery, page);
        this.setState(({ images }) => ({
          images: [...images, ...data.hits],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState(error => this.setState({ error, status: 'rejected' }));
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1> Sorry something went wrong</h1>}
        <ImageGallery images={images} showImage={this.showImage} />
        {images.length > 0 && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
export default App;
