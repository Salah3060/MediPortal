/* eslint-disable react/prop-types */
import { FaCircleArrowLeft } from "react-icons/fa6";
import Card from "./card";

export default function Expandit({ data, backHandler }) {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-col-1 gap-5">
      <button
        className="btn-2 text-xl md:col-span-4 sm:col-span-2 col-span-1"
        onClick={backHandler}
      >
        <FaCircleArrowLeft className="text-xl mr-2" />
        Back
      </button>
      {data.map((el, i) => (
        <Card
          key={i}
          myClass="max-w-80"
          ratio={el.percentage}
          id={el.offerid}
          header={el.offername}
          description={el.offerdescription}
          previousPrice={el.fees}
          currentPrice={el.fees - (el.percentage * el.fees) / 100}
        />
      ))}
    </div>
  );
}
