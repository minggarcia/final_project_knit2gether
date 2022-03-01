import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <a>Logo</a>
        </Link>
      </div>
      <div>
        <p>knit2gether</p>
      </div>
    </header>
  );
}
