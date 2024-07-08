export const CreateLink = () => {
  return (
    <div className="p-4 my-8 border rounded-lg sm:p-6 lg:p-8 bg-gray-50 text-black">
      <h3 className="mb-3 text-xl font-medium">Create a short link on Dub</h3>
      <p className="mb-5 text-sm font-medium">
        Do you want to get notified when a new component is added to Flowbite?
        Sign up for our newsletter and you'll be among the first to find out
        about new features, components, versions, and tools.
      </p>
      <form action="">
        <div className="flex items-end gap-2 flex-col">
          <input
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            name="url"
            type="url"
            placeholder="URL"
            required
          />
          <button className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer">
            Create Link
          </button>
        </div>
      </form>
    </div>
  );
};
