import { loggedOut } from "@/lib/actions";
import { User } from "@/lib/session";

export const Profile = ({ user }: { user: User }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">Welcome, {user.name}</h3>
        <p className="text-lg">{user.email}</p>
      </div>
      <form action={loggedOut}>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Logout
        </button>
      </form>
    </div>
  );
};
