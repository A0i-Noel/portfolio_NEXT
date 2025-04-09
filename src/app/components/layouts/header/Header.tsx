import Link from "next/link";
import "./header.scss";
import LanguageSwitch from "../../elements/LanguageSwitch";


const Header = () => {
  return (
    <header className="l-nav">
      <div className="l-nav__wrapper">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about" >About</Link>
          <Link href="/projects" >Projects</Link>
          <Link href="/contact" >Contact</Link>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}

export default Header;