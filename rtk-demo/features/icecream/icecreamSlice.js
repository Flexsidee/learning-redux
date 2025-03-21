const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
	numOfIceCreams: 10,
};

const icecreamSlice = createSlice({
	name: "icecream",
	initialState: initialState,
	reducers: {
		ordered: (state) => {
			state.numOfIceCreams--;
		},
		restocked: (state, action) => {
			state.numOfIceCreams += action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(cakeActions.ordered, (state) => {
			state.numOfIceCreams--;
		});
	},
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
