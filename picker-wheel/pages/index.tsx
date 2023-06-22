
import Link from "next/link"
import Image from "next/image"
import colorWheel from '../images/colorWheel2.png'
import coin from '../images/euro-dynamic-color2.png'
import HeadTitle from "@/components/HeadTitle"

export default function Home() {
  return (
    <>
      <HeadTitle title="PickerWheel - Accueil" description="Bienvenue sur PickerWheel ! Explorez notre site unique composé de deux parties distinctes. Utilisez notre roue pour effectuer des choix parmi vos options personnalisées, et divertissez-vous avec notre jeu classique de pile ou face. Découvrez des réponses amusantes et aléatoires en un seul clic !" />
      <main className="homePage">
        <div className="homePage__container">
          <div className="homePage__tabs">
            <input id="pickerWheel" type="radio" name="slider" />
            <input id="coinFlip" type="radio" name="slider" />
            <div className="homePage__btns">
              <label htmlFor="pickerWheel"></label>
              <label htmlFor="coinFlip"></label>
            </div>
            <div className="homePage__content">
              <div className="box">
                <div className="box__content">
                  <Image className="box__image" src={colorWheel} alt="image de roue" width={250} height={250} />
                  <h2>Picker Wheel</h2>
                  <p>Vous souhaitez organiser un tirage au sort amusant parmi différentes options ? Faites tourner la roue et elle déterminera, de manière totalement aléatoire et équitable, le grand gagnant, sans aucune tricherie!!</p>
                  <Link href={"/pickerWheel"}><button className="pickerWheelBtn">Faites tourner la roue ! </button></Link>
                </div>
              </div>
              <div className="box">
                <div className="box__content">
                  <Image className="box__image" src={coin} alt="image de pièce" width={250} height={250} />
                  <h2>Pile ou Face</h2>
                  <p>Si vous êtes confronté à des difficultés pour prendre une décision, confiez-la au hasard et lancez une pièce ! Le jeu de pile ou face peut également être utilisé pour résoudre un dilemme : {'"'}Vous ne savez pas qui devrait manger la dernière part de gâteau entre vous et votre ami ? Laissez donc la pièce décider du gagnant!{'"'}</p>
                  <Link href={"/coinFlip"}><button className="coinFlipBtn">Lancez la pièce!</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}