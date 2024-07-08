import { createLink } from "@/lib/actions";
import { SubmitButton } from "./submit-button";

export const CreateLink = () => {
  return (
    <div className="p-4 my-8 border rounded-lg sm:p-6 lg:p-8 bg-gray-50 text-black">
      <h3 className="mb-3 text-xl font-medium">Create a short link on Dub</h3>
      <p className="mb-5 text-sm font-medium">
        This form will create a short link on Dub using the `access_token`
        stored in the session cookie.
      </p>
      <form action={createLink}>
        <div className="flex items-end gap-2 flex-col">
          <input
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            name="url"
            type="url"
            placeholder="URL"
            required
            defaultValue="https://www.google.com/"
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
