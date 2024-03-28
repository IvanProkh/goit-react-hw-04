import { forwardRef } from 'react';
import ImageCard from './ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = forwardRef(({ galleryItems, openModal }, ref) => {
  return (
    <ul ref={ref} className={css.ul}>
      {galleryItems.map(photo => (
        <li className={css.li} key={photo.id}>
          <ImageCard
            cardPhoto={photo}
            onClick={() => {
              openModal(photo);
            }}
          ></ImageCard>
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
