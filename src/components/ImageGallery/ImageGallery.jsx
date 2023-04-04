import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, showImage }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          tags={image.tags}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          showImage={() => showImage(image.largeImageURL, image.tags)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
  showImage: PropTypes.func.isRequired,
};

export default ImageGallery;
