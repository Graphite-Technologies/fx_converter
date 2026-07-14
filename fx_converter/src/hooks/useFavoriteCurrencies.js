import { useCallback, useState } from "react";

export function useFavoriteCurrencies(initial = []){
    const [favorites, setFavorites] = useState( () => new Set(initial))

    const toggle = useCallback( (code) => {
        setFavorites((prev)=>{
            const next = new Set(prev)

            if(next.has(code)){
                next.delete(code)
            }
            else{
                next.add(code)
            }

            return next;
        })
    }, []);

    const isFavorite = useCallback((code) => favorites.has(code), [favorites]);

    return {favorites, toggle, isFavorite};
}