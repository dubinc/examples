import Image from "next/image";

export default function SuccessClient() {
  return (
    <div>
      <p className="mb-2 text-foreground/80">
        Navigate to your{" "}
        <a
          href="https://app.dub.co/analytics"
          target="_blank"
          className="underline underline-offset-2"
        >
          Dub Analytics dashboard
        </a>{" "}
        to view your conversion results.
      </p>
      <Image
        src="https://assets.dub.co/help/acme-conversion-flow.png"
        alt="Acme Conversion flow"
        width={2432}
        height={1380}
        className="rounded-xl p-2 border border-gray-200"
        unoptimized
      />
    </div>
  );
}
