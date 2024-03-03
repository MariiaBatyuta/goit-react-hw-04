import css from "./LoadMore.module.css";

export default function LoadMore({ handleNextPage }) {
    return (
        <div className={css.container}>
            <button onClick={handleNextPage} className={css.button}>Load More</button>
        </div>
    )
}