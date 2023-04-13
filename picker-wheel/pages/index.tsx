
import Link from "next/link"


export default function Home() {
  return (
    <>
      <main className="homePage">
        <Link className="homePage__link" href={"/pickerWheel"}>Picker Wheel</Link>

        <Link className="homePage__link" href={"/coinFlip"}>Coin Flip</Link>
      </main>
    </>
  )
}