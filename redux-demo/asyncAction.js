const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;

const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUESTED,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCEDED,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUESTED:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCEDED:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USERS_FAILED:
			return {
				loading: false,
				users: [],
				errors: action.payload,
			};
		default:
			return state;
	}
};

const fetchUsers = () => {
	return function (dispatch) {
		dispatch(fetchUsersRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				const users = response.data.map((user) => user.id); //response.data is the response
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				dispatch(fetchUsersFailure(error.message)); //error.message is the error message
			});
	};
};

const store = createStore(reducer, applyMiddleWare(thunkMiddleware));

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(fetchUsers());
