import IconButton from "./IconButton.jsx";
import ChangeIndicator from "./ChangeIndicator.jsx";
import { formatRate } from "../utils/format.js";



export default function FavoriteRow({pair, onRemove}){
    return (
        <div className="favorite-row">
            <span className="favorite-row__pair">
                {pair.from} <span className="favorite-row__arrow"> → </span>{pair.to}
            </span>

            <div className="favorite-row__figures">
                <span className="favorite-row__rate">{formatRate(pair.rate)}</span>

                <ChangeIndicator value={pair.change} />
            </div>

            <IconButton
                variant="star"
                active
                ariaLabel={`Unpin ${pair.from} to ${pair.to}`}
                onClick={onRemove}
            >
                ★
            </IconButton>
        </div>
    )
}