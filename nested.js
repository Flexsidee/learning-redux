const redux = require("redux");

const createStore = redux.createStore;

const STREET_UPDATED = "STREET_UPDATED";

const initialUserState = {
	name: "Somae Danel",
	address: {
		street: "Alapere street",
		state: "Lagos",
		country: "Nigeria",
	},
};

function updateStreet(street) {
	return {
		type: STREET_UPDATED,
		payload: street,
	};
}

const reducer = (state = initialUserState, action) => {
	switch (action.type) {
		case STREET_UPDATED:
			return {
				...state,
				address: {
					...state.address,
					street: action.payload,
				},
			};
		default:
			state;
	}
};

const store = createStore(reducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
	console.log("Update store", store.getState())
);

store.dispatch(updateStreet());

unsubscribe();
