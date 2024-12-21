import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <PuffLoader color="#253237" />
    </div>
  );
};

export default Loader;
