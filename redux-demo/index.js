const redux = require("redux"); //importing redux into the application
const createStore = redux.createStore; //used for createing the store
const bindActionCreators = redux.bindActionCreators; //for binding actions
const combineReducers = redux.combineReducers; //for combining reducers
const applyMiddleWare = redux.applyMiddleware; //for applying middlewares

const reduxLogger = require("redux-logger"); //importing the redux logger
const logger = reduxLogger.createLogger();

//list of actions currently in the app
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
	return {
		type: CAKE_ORDERED,
		payload: 1,
	};
}

function restockCake(qty = 1) {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	};
}

function orderIceCream(qty = 1) {
	return {
		type: ICECREAM_ORDERED,
		payload: qty,
	};
}

function restockIceCream(qty = 1) {
	return {
		type: ICECREAM_RESTOCKED,
		payload: qty,
	};
}

const initialCakeState = {
	numOfCakes: 11,
};

const initialIceCreamState = {
	numOfIceCreams: 20,
};

//this is the reducer for the cake on shelf
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return { ...state, numOfCakes: state.numOfCakes - 1 };
		case CAKE_RESTOCKED:
			return { ...state, numOfCakes: state.numOfCakes + action.payload };
		default:
			return state;
	}
};

//this is the reducer for the ice icreams in the freezers
const iceCreamReducer = (state = initialIceCreamState, action) => {
	switch (action.type) {
		case ICECREAM_ORDERED:
			return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
		case ICECREAM_RESTOCKED:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams + action.payload,
			};
		default:
			return state;
	}
};

//this comiines both reducers
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleWare(logger)); //redux store is holding application state here + the redux logger is working
console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
	{ orderCake, restockCake, orderIceCream, restockIceCream },
	store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(30);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream();

unsubscribe();
