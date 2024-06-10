import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dub + Remix" },
    { name: "description", content: "Learn how to use Dub with Remix" },
  ];
};

export default function Index() {
  return (
    <h1>Dub + Remix Example App</h1>
  );
}
