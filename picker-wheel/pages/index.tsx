
import Link from "next/link"
import Image from "next/image"
import colorWheel from '../images/colorWheel.png'
import coin from '../images/euro-dynamic-color.png'

export default function Home() {
  return (
    <>
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
                  <p>Vous avez besoin de faire un tirage au sort ludique parmis plusieurs choix ? Faites donc tourner la roue et elle decidra de manière totalement aléatoire et sans tricherie du grand gagnant!!</p>
                  <Link href={"/pickerWheel"}><button className="pickerWheelBtn">Faites tourner la roue ! </button></Link>
                </div>
              </div>
              <div className="box">
                <div className="box__content">
                  <Image className="box__image" src={coin} alt="image de pièce" width={250} height={250} />
                  <h2>Pile ou Face</h2>
                  <p>Si vous avez du mal a prendre une decision, laissez donc le hasard choisir à votre place et lancez la pièce !! Le pile ou face peut aussi servir pour vous departager en cas de dilemme {'"'}Vous ne savez pas qui doit manger la dernière part de gateau entre vous et votre amis ? Lancez donc la pièce et le hasard decidera du vainqueur !!{'"'} .</p>
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