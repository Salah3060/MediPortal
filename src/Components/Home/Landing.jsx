import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container max-w-[1500px] mx-auto flex justify-between px-4 py-6 flex-col gap-8">
      <div className="headerText mt-16 bg-white/40 w-[fit-content] p-6 rounded-xl">
        <h1 className="text-4xl text-primary font-bold">
          Better Healthcare for a better life
        </h1>
        <p className="text-secondary mt-6 text-2xl">
          Clinics are now much closer
        </p>

        <div className="buttons mt-4 w-full p-6 rounded-xl flex flex-col md:flex-row gap-4 justify-around items-center">
          <Link
            className="bg-[#c2dfe3] px-6 py-4 rounded-xl"
            to="/MediPortal/search"
          >
            Find A Doctor
          </Link>
          <Link
            className="bg-[#c2dfe3] px-6 py-4 rounded-xl"
            to={"/MediPortal/pharmacy"}
          >
            Purchase a Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
