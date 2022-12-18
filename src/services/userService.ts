import prisma from "../utils/prisma";

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
