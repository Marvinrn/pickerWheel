import Link from "next/link";
import Image from "next/image"
import colorWheel from '../images/colorWheel.png'
import coin from '../images/euro-dynamic-color.png'
import home from "../images/home.png"
import { useRouter } from "next/router";

const NavBar = () => {

    const router = useRouter()
    console.log(router.pathname);



    return (
        <div className="navBar">
            <Link className="navBar__links" href={"/"}>
                <Image className="navBar__image" src={home} alt="icon de maison" width={40} height={40} />
                <p className="navBar__title">Accueil</p>
            </Link>
            {router.pathname === "/pickerWheel" ?
                ""
                :
                <Link className="navBar__links" href={"/pickerWheel"}>
                    <Image className="navBar__image" src={colorWheel} alt="image de roue" width={50} height={50} />
                    <p className="navBar__title">Picker Wheel</p>
                </Link>
            }

            {router.pathname === "/coinFlip" ?
                ""
                :
                <Link className="navBar__links" href={"/coinFlip"}>
                    <Image className="navBar__image" src={coin} alt="image de pièce" width={50} height={50} />
                    <p className="navBar__title">Pile ou Face</p>
                </Link>
            }

        </div>
    );
};

export default NavBar;