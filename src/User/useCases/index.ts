import userRepository from "../repository";
import createUserGenerator from "./CreateUserUseCase";
import delUserGenerator from "./DeleteUserUseCase";
import getUserGenerator from "./GetUserUseCase";
import listUsersGenerator from "./ListUsersUseCase";
import updateUserGenerator from "./UpdateUserUseCase";

export const listUsersUseCase = listUsersGenerator(userRepository.listUsers);
export const getUserUseCase = getUserGenerator(userRepository.fetchUser);
export const createUserUseCase = createUserGenerator(userRepository.createUser);
export const updateUserUseCase = updateUserGenerator(userRepository.updateUser);
export const deleteUserUseCase = delUserGenerator(userRepository.deleteUser);
