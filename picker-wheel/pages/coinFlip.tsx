import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useState } from 'react'
export default function CoinFlip() {

    const [result, setResult] = useState<string>('')

    const flipCoin = () => {
        const random = Math.random()
        if (random > 0.5) {
            setResult('Face')
        } else {
            setResult('Pile')
        }
    }

    return (
        <div className='coinFlipPage'>
            <NavBar />
            <div className='coinFlipPage__container'>
                <h1>Pile ou Face</h1>
                {result && <h2>{result}</h2>}
                <button onClick={flipCoin}> Lancez la pièce </button>
            </div>
            <Footer />
        </div>
    )
}