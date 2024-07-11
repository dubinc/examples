export const ConnectDub = ({ url }: { url: string }) => {
  return (
    <div>
      <a className="bg-black text-white py-2 px-4 rounded" href={url}>
        Sign in with Dub
      </a>
    </div>
  );
};
