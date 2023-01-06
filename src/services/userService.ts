import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import { jwtGenerator } from "../utils/jwtGenerator";

export const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  return allUsers;
};

export const createUser = async (username: string, password: string) => {
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  return createdUser;
};

export const updateUser = async (id: string, role: any) => {
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });
  return updateUser;
};

export const encryptPassword = async (password: string) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  return bcryptPassword;
};

export const checkValidPassword = async (password: string, user: any) => {
  const validPassword = await bcrypt.compare(password, user.password);
  return validPassword;
};

export const getJwtToken = async (user: any) => {
  const token = jwtGenerator(user.id, user.role);
  return token;
};
