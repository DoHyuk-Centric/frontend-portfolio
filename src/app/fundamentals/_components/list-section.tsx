import Link from "next/link";

export default function ListSection({
  title,
  href,
  content,
}: {
  title: string;
  href: string;
  content: string[];
}) {
  return (
    <li className="ms-4 list-disc">
      <h3 className="font-medium text-foreground">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h3>
      <ul className="mt-1 flex list-[circle] flex-col gap-1 ps-4 text-sm text-muted-foreground">
        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </li>
  );
}
