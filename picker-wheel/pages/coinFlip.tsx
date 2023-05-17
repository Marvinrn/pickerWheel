import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CoinFlip() {
    const [result, setResult] = useState<string>('Face.png')
    const [isFlipping, setIsFlipping] = useState<boolean>(false)

    const flipCoin = () => {
        if (isFlipping) {
            return
        }
        setIsFlipping(true)
        setTimeout(() => {
            const random = Math.random()
            if (random > 0.5) {
                setResult('Pile.png')
            } else {
                setResult('Face.png')
            }
            setIsFlipping(false)
        }, 3000)
    }

    useEffect(() => {
        if (isFlipping) {
            const timer = setTimeout(() => {
                setIsFlipping(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isFlipping])

    return (
        <div className='coinFlipPage'>
            <NavBar />
            <h1>Pile ou Face</h1>
            <div className='coinFlipPage__container'>
                <Image
                    src={require(`../images/${result}`)}
                    alt='image de roue'
                    width={250}
                    height={250}
                    className={isFlipping ? 'coinFlipAnimation' : 'coinFlipPage__img'}
                />
                <button onClick={flipCoin}>Lancez la pièce</button>
            </div>
            <Footer />
        </div>
    )
}
