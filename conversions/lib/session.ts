import { cookies } from "next/headers";

export type Session = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  password?: string;
};

export const setSession = (user: Session) => {
  cookies().set("DEMO_USER", JSON.stringify(user));
};

export const getSession = () => {
  const cookieStore = cookies();

  const user = JSON.parse(cookieStore.get("DEMO_USER")?.value || "{}");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    password: user.password,
  };
};
