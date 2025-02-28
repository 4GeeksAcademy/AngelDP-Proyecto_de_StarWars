export const initialStore = () => {
	return {
		categories: [],
		items: [],
		favorites: []
	}
}

export default function storeReducer(store, action = {}) {
	switch (action.type) {

		case 'set_categories':

			return {
				...store,
				categories: action.payload
			}

		case 'set_items':

			return {
				...store,
				items: action.payload
			}
		
		case 'set_favorites':
			return {
				...store,
				favorites: [...favorites, action.payload]
			}
		default:
			throw Error('Unknown action.');
	}
}
