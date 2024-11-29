/* eslint-disable react/prop-types */
import "../../Styles/stepper.css";
import { TiTick } from "react-icons/ti";
const Stepper = ({ currentStep }) => {
  const steps = ["Personal Info", "Specific info", "finish"];
  return (
    <>
      <div className="sm:flex hidden justify-between mb-5 max-w-[28.125rem] ">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              i + 1 < currentStep && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {/* {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )} */}
    </>
  );
};

export default Stepper;
