export const initialStore = () => {
	return {
		categories: [],
		items: [],
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

		default:
			throw Error('Unknown action.');
	}
}
