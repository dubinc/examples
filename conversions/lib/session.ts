import { cookies } from "next/headers";

export type Session = {
  name?: string;
  email?: string;
  password?: string;
};

export const setSession = (user: Session) => {
  cookies().set("DEMO_USER", JSON.stringify(user));
};

export const getSession = () => {
  const cookieStore = cookies();

  const user = JSON.parse(cookieStore.get("DEMO_USER")?.value || "{}");

  return {
    name: user.name,
    email: user.email,
    password: user.password,
  };
};
