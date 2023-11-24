import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Turning schema into model
export const UserModel = mongoose.model("User", UserSchema);

// actions --> gonna be used in controllers
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};
// to check user is loggedin or not:
export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({ "authentication.sessionToken": sessionToken });
};

export const getUserById = (id: string) => {
  return UserModel.findById(id);
};

export const createUser = (values: Record<string, any>) => {
  new UserModel(values).save().then((user) => user.toObject);
};

export const deleteUserById = (id: string) => {
  UserModel.findByIdAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};

/**
 * In (Line 7) authentication -> password 'select:false' means, preventing accidental 
    fetching from db while data fetching
 * 
 */
