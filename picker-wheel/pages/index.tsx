import Link from "next/link"


export default function Home() {
  return (
    <>
      <h1>HOME page</h1>
      <button>
        <Link href={"/test"}>Test page</Link>
      </button>
    </>
  )
}