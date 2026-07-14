import { useCallback, useState } from "react";
import { FAVORITE_PAIRS } from "../data/favoritePairsData";

export function useFavoritePairs(){
    const [pairs, setPairs] = useState(FAVORITE_PAIRS)

    const remove = useCallback((id) =>{
        setPairs((prev) => prev.filter((p) => p.id !== id))
    }, [])

    return { pairs, remove }
}