import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, webformatURL, tags, showImage }) {
  return (
    <li className={css.item} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.image}
        onClick={showImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
