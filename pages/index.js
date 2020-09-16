import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <div className="py-20 flex flex-col justify-center content-center text-center">
        <h1 className="text-5xl text-center text-accent-1">
          Mark Crisostomo's rethink.software technical challenge.
        </h1>
        <ul className="mt-10">
          <li className="py-4">
            <Link href="search">
              <a>Search Question</a>
            </Link>
          </li>
          <li className="py-4">
            <Link href="shortener">
              <a>Link Shortner</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
