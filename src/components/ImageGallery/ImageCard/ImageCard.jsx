import css from './ImageCard.module.css';

export default function ImageCard({ cardPhoto, onClick }) {
  return (
    <div onClick={onClick}>
      <img className={css.img} src={cardPhoto.urls.small} alt="" />
    </div>
  );
}
