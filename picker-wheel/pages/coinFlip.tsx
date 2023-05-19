import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import face from '../images/Face.png'
import pile from '../images/Pile.png'

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
                <div className='coinFlipPage__coin'>
                    <div className={isFlipping ? 'animate-face' : 'hidden'}>
                        <Image
                            src={face}
                            alt='image de pièce coté face'
                            width={350}
                            height={350}
                            className={'coinFlipPage__img'}
                        />
                    </div>
                    <div className={isFlipping ? 'animate-pile' : 'hidden'}>
                        <Image
                            src={pile}
                            alt='image de pièce coté pile'
                            width={350}
                            height={350}
                            className={'coinFlipPage__img'}
                        />
                    </div>
                    <Image
                        src={require(`../images/${result}`)}
                        alt='image du résultat du lancer de pièce'
                        width={350}
                        height={350}
                        className={isFlipping ? 'hidden' : 'coinFlipPage__img'}
                    />
                </div>
                <button className='coinFlipPage__btn' onClick={flipCoin}>Lancez la pièce</button>
            </div>
            <Footer />
        </div>
    )
}
