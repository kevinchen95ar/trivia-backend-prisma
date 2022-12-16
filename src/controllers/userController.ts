import prisma from "../prisma";

//TODO: REGISTER
export const registerUser = async (req: any, res: any) => {
  const { username, password } = req.body;

  const createdUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.json(createdUser);
};

//TODO: LOGIN

//TODO: UPDATE USER ROL
