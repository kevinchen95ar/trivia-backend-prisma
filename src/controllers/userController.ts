import {
  checkValidPassword,
  createUser,
  encryptPassword,
  getAllUsers,
  getJwtToken,
  getUser,
  updateUser,
} from "../services/userService";

//REGISTER
export const registerUser = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    //Traemos el usuario
    const user = await getUser(username);

    //Si ya existe devolvemos status 409.
    if (user) {
      return res.status(409).send("El nombre de usuario ya existe");
    }

    //Encriptacion de la password
    const encryptedPassword = await encryptPassword(password);

    //Creamos el usuario en la base de datos
    const createdUser = createUser(username, encryptedPassword);

    res.json(createdUser);
  } catch (error) {
    res.json({ error });
  }
};

//LOGIN
export const loginUser = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    //Traemos el usuario en cuestion
    const user = await getUser(username);

    //no existe el usuario
    if (!user) {
      return res.status(409).send("El usuario no existe.");
    }
    //Si existe el usuario
    else {
      //chequeo si la contraseña es la misma que en la base de datos
      const validPassword = await checkValidPassword(password, user);

      //la contraseña es incorrecta
      if (!validPassword) {
        return res.status(401).json("La contraseña es incorrecta.");
      }

      //devolvemos un token
      const token = await getJwtToken(user);
      res.json({ token });
    }
  } catch (error) {
    console.log(error);
  }
};

//UPDATE USER ROL
export const updateUserRol = async (req: any, res: any) => {
  try {
    const { id, role } = req.body;

    if (role !== "ADMIN" && role !== "BASIC" && role !== "EDITOR") {
      return res.json("Rol no permitido.");
    }

    const user = await updateUser(id, role);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

// FETCH ALL USERS
export const getAllUsersInDB = async (req: any, res: any) => {
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
};
