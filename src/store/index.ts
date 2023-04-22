import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser, type UserWithId } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store: any) => (next: any) => (action: any) => {
		next(action); // sigue y haz la acción que tengas encomendada
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store: any) => (next: any) => (action: any) => {
		const previousState = store.getState();

		next(action);

		if (action.type === "users/deleteUserById") {
			const userToRemove = previousState.users.find(
				(user: UserWithId) => user.id === action.payload,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${action.payload}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success("Usuario eliminado correctamente");
					}
					throw new Error("Error al eliminar al usuario");
				})
				.catch((err) => {
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
					toast.error("Error al eliminar el usuario");
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
