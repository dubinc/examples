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

export const getSession = (): Session => {
  const cookieStore = cookies();

  return JSON.parse(cookieStore.get("DEMO_USER")?.value || "{}");
};
