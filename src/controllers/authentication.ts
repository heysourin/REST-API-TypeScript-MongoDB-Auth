// register controller
import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.sendStatus(400);
    }

    //! How to Authenticate user, without knowing their password
    const salt = user.authentication?.salt;
    if (salt == null || salt == undefined) {
      return res.sendStatus(403);
    }
    
    const expectedHash = authentication(salt, password);

    const userPassword = user.authentication?.password;

    if (userPassword != expectedHash) {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
