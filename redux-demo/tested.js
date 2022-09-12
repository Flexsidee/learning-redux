const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;

const UPDATE_BIODATA = "UPDATE_BIODATA";

initialState = {
	name: "Somade Daniel Oluwaseunfunmi",
	school: {
		name: "Caleb University",
		level: "200",
	},
};

function updateLevel(level) {
	return {
		type: UPDATE_BIODATA,
		payload: level,
	};
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_BIODATA:
			return produce(state, (draft) => {
				draft.school.level = action.payload;
			});
		default:
			return state;
	}
};

const store = createStore(reducer);
console.log("Initial state: ", store.getState());

const unsubscribe = store.subscribe(() =>
	console.log("Updated state: ", store.getState())
);

store.dispatch(updateLevel("300"));

unsubscribe();
