import Link from "next/link";
import Image from "next/image"
import colorWheel from '../images/colorWheel-min.png'
import coin from '../images/euro-dynamic-color-min.png'
import home from "../images/home-min.png"
import { useRouter } from "next/router";

const NavBar = () => {
    const router = useRouter()

    return (
        <header>
            {router.pathname === "/pickerWheel" ?
                <div className="navBar navBar--bg">
                    <Link className="navBar__pickerWheelNav" href={"/"}>
                        <Image className="navBar__image" src={home} priority loading="eager" alt="icon de maison" width={40} height={40} />
                        <p className="navBar__title">Accueil</p>
                    </Link>
                    {router.pathname === "/pickerWheel" ?
                        ""
                        :
                        <Link className="navBar__pickerWheelNav" href={"/pickerWheel"}>
                            <Image className="navBar__image" src={colorWheel} priority loading="eager" alt="image de roue" width={50} height={50} />
                            <p className="navBar__title">Picker Wheel</p>
                        </Link>
                    }

                    {router.pathname !== "/pickerWheel" ?
                        ""
                        :
                        <Link className="navBar__pickerWheelNav" href={"/coinFlip"}>
                            <Image className="navBar__image" src={coin} priority loading="eager" alt="image de pièce" width={50} height={50} />
                            <p className="navBar__title">Pile ou Face</p>
                        </Link>
                    }
                </div>
                :
                <div className="navBar">
                    <Link className=" navBar__coinFlipNav" href={"/"}>
                        <Image className="navBar__image" src={home} priority loading="eager" alt="icon de maison" width={40} height={40} />
                        <p className="navBar__title">Accueil</p>
                    </Link>
                    {router.pathname === "/pickerWheel" ?
                        ""
                        :
                        <Link className=" navBar__coinFlipNav" href={"/pickerWheel"}>
                            <Image className="navBar__image" src={colorWheel} priority loading="eager" alt="image de roue" width={50} height={50} />
                            <p className="navBar__title">Picker Wheel</p>
                        </Link>
                    }

                    {router.pathname === "/coinFlip" ?
                        ""
                        :
                        <Link className=" navBar__coinFlipNav" href={"/coinFlip"}>
                            <Image className="navBar__image" src={coin} priority loading="eager" alt="image de pièce" width={50} height={50} />
                            <p className="navBar__title">Pile ou Face</p>
                        </Link>
                    }
                </div>
            }
        </header>
    );
};

export default NavBar;