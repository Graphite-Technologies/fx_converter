import FavoriteRow from "./FavoriteRow.jsx";

export default function FavoriteTab({pairs, onRemove}){
    return (
        <section className="favorites-tab" aria-label="Pinned currency pairs">
            <div className="favorites-tab__header">
                <span className="favorites-tab__title">PINNED PAIRS</span>
                <span className="favorites-tab__count">{pairs.length} FAVORITES</span>
            </div>

            {pairs.length === 0 ? (
                <p className="favorites-tab__empty">
                    No pinned pairs yet = star a currency in Compare to add one.
                </p>
            ) : (
                <div className="favorites-tab__list">
                    {pairs.map((pair) => (
                        <FavoriteRow key={pair.id} pair={pair} onRemove={ () => onRemove(pair.id)} />
                    ))}
                </div>
            )}
        </section>
    )
}