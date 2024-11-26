import { GrSchedule } from "react-icons/gr";

const Landing = () => {
  return (
    <div className="container max-w-[1500px] mx-auto flex justify-between px-4 py-6 flex-col gap-8">
      <div className="headerText">
        <h1 className="text-3xl text-primary font-bold">
          Better Healthcare for a better life
        </h1>
        <p className="text-lightGrayText mt-3 text-xl">
          Clinics are now much closer
        </p>
      </div>
      <div className="searchBar bg-white py-4 flex flex-col gap-4 rounded-xl shadow-2xl">
        <div className="tab flex gap-4 items-center justify-center border-b-[3px] border-primary pb-5 ">
          <div className="logo">
            <GrSchedule className="text-4xl text-primary" />
          </div>
          <div className="text flex flex-col">
            <h1>Book a doctor</h1>
            <h1>Examination or procedure</h1>
          </div>
        </div>
        <div className="options"></div>
      </div>
    </div>
  );
};

export default Landing;
