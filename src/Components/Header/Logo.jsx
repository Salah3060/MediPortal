import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img
        src="/HeaderHorLogo.png"
        alt="logo"
        className="max-w-full 
          xl:h-[4.688rem] lg:h-[3.438rem] h-[3.125rem]"
      />
    </Link>
  );
}
