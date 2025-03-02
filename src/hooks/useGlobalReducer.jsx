import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"

const StoreContext = createContext()


export function StoreProvider({ children }) {

    const getInitialState = () => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            const initialstate = initialStore();

            if (savedFavorites) {
                return {
                    ...initialstate,
                    favorites: JSON.parse(savedFavorites)
                };
            }

            return initialstate;

        } catch (error) {
            console.log(error)
            return initialStore();
        }
    };

    const [store, dispatch] = useReducer(storeReducer, getInitialState());

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(store.favorites))
        } catch (error) {
            console.log(error)
        }
    }, [store.favorites]);

    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}


export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}