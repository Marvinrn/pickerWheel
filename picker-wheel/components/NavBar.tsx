import Link from "next/link";

const NavBar = () => {
    return (
        <div className="navBar">
            <Link className="navBar__links navBar__home" href={"/"}>Accueil</Link>
            <Link className="navBar__links navBar__coinFlip" href={"/coinFlip"}>Pile ou Face</Link>
        </div>
    );
};

export default NavBar;