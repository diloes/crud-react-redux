import { useAppDispatch } from "../hooks/store";
import {
	addNewUser,
	deletedUsersById,
	type User,
	type UserId,
} from "../store/users/slice";

export function useUserActions() {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deletedUsersById(id));
	};

	return { addUser, removeUser };
}
