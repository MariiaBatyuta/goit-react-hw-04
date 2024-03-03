import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onClick }) {

    return (
    <ul className={css.list}>
        {Array.isArray(items) && items.map((item, index) => (
            <li key={`${item.id}-${index}`} className={css.item}>
                <ImageCard url={item.urls.small} id={index} alt={item.alt_description} onClick={() => onClick(index)} /> 
            </li>
        ))}
    </ul>
    )
}
