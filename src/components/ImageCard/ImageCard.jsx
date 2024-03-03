export default function ImageCard({url, alt, onClick}) {
    return (
        <div>
            <img src={url} alt={alt}  onClick={onClick} style={{ cursor: 'pointer' }} />
        </div>
    )
}