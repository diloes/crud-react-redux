import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_SATE: UserWithId[] = [
	{
		id: "1",
		name: "Diego López",
		email: "diloesdev@gmail.com",
		github: "diloes",
	},
	{
		id: "2",
		name: "Diogenes Laercio",
		email: "diogenes@gmail.com",
		github: "diogenes",
	},
	{
		id: "3",
		name: "Miguel Angel Durán",
		email: "miduga@gmail.com",
		github: "midudev",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: string;
}

// Función que se autoinvoca y que obtiene el estado del localStorage
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		// si hay datos en localStorage los devuelvo
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_SATE; // si no devuelvo los default
})(); // <- Se inicializa

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},

		deletedUsersById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserExists = state.some((user) => user.id === action.payload.id);
			if (!isUserExists) {
				return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deletedUsersById, rollbackUser } =
	usersSlice.actions;
