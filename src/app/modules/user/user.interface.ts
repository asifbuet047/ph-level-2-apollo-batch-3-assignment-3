export type TUserCredentials = {
  email: string;
  password: string;
};

export type TUSer = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
};
