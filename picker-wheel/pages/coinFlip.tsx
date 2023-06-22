import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import face from '../images/Face-min.png'
import pile from '../images/Pile-min.png'
import HeadTitle from '@/components/HeadTitle'

export default function CoinFlip() {
    const [result, setResult] = useState<string>('Face-min.png')
    const [isFlipping, setIsFlipping] = useState<boolean>(false)

    const flipCoin = () => {
        if (isFlipping) {
            return
        }
        setIsFlipping(true)
        setTimeout(() => {
            const random = Math.random()
            if (random > 0.5) {
                setResult('Pile-min.png')
            } else {
                setResult('Face-min.png')
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
            <HeadTitle title="PickerWheel - Lance la Pièce" description='Jouez à notre jeu de pile ou face classique sur PickerWheel. Lancez une pièce virtuelle et testez votre chance. Que ce soit pour des décisions simples ou pour ajouter une touche de hasard à votre journée, notre jeu de pile ou face vous offre un divertissement rapide et amusant.' />
            <NavBar />
            <h1>Pile ou Face</h1>
            <div className='coinFlipPage__container'>
                <div className='coinFlipPage__coin'>
                    <div className={isFlipping ? 'animate-face' : 'hidden'}>
                        <Image
                            src={face}
                            priority loading="eager"
                            alt='image de pièce coté face'
                            width={250}
                            height={250}
                            className={'coinFlipPage__img'}
                        />
                    </div>
                    <div className={isFlipping ? 'animate-pile' : 'hidden'}>
                        <Image
                            src={pile}
                            priority loading="eager"
                            alt='image de pièce coté pile'
                            width={250}
                            height={250}
                            className={'coinFlipPage__img'}
                        />
                    </div>
                    <Image
                        src={require(`../images/${result}`)}
                        priority loading="eager"
                        alt='image du résultat du lancer de pièce'
                        width={250}
                        height={250}
                        className={isFlipping ? 'hidden' : 'coinFlipPage__img'}
                    />
                </div>
                <button className='coinFlipPage__btn' onClick={flipCoin}>Lancez la pièce</button>
            </div>
            <Footer />
        </div>
    )
}
