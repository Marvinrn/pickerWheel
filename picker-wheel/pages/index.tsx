
import Link from "next/link"


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
              <div className="box pickerWheel">
                <div className="box__content">
                  <h2>Picker Wheel</h2>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit maiores ducimus expedita minus corrupti explicabo officiis, praesentium, laborum veritatis sint nemo? Sint, cumque hic ipsum exercitationem laboriosam repellendus id accusantium?</p>
                  <button className="pickerWheelBtn">Faites tourner la roue ! </button>
                </div>
              </div>
              <div className="box coinFlip">
                <div className="box__content">
                  <h2>Pile ou Face</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae deleniti dolores, quidem at sapiente reiciendis. Placeat, exercitationem veniam. Ipsum cupiditate nobis molestias recusandae error sapiente, placeat molestiae labore voluptatem saepe.</p>
                  <button className="coinFlipBtn">Lancez la pièce!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}