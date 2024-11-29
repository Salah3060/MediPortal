/* eslint-disable react/prop-types */
import { useState } from "react";
import { DiseaseVaidator } from "../../Utils/null";
import InputField from "./InputField";
import Multiselector from "./MultiSelector";
import Popup from "../popup";

export default function Patient({ user, setUser, setStep }) {
  const [error, setState] = useState(false);
  function StepValidate(e) {
    e.preventDefault();
    if (!user.bloodtype.length) {
      setState(true);
      return;
    }

    ((user.otherDisease.length && DiseaseVaidator(user.otherDisease)) ||
      !user.otherDisease) &&
      setStep(3);
  }
  return (
    <>
      {error && (
        <Popup
          Header={"Invalid Data"}
          Msg={"You have to choose a blood type"}
          closePopup={() => setState(false)}
          className="w-full"
        />
      )}
      <form className="flex flex-col justify-between">
        <div className=" flex justify-evenly my-10">
          <span className="grid grid-cols-1 gap-5 w-full  justify-items-center">
            <select
              id="blood-type"
              name="blood-type"
              className={`sing-up-input-style col-start-1 w-full`}
              value={user.bloodtype}
              onChange={(e) =>
                setUser((us) => ({ ...us, bloodtype: e.target.value }))
              }
              required
            >
              <option value="" selected disabled>
                Blood type
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A1+">A1+</option>
              <option value="A1-">A1-</option>
              <option value="A2+">A2+</option>
              <option value="A2-">A2-</option>
              <option value="B3+">B3+</option>
              <option value="B3-">B3-</option>
              <option value="A3+">A3+</option>
              <option value="A3-">A3-</option>
            </select>
            <Multiselector
              selected={user.chronicDiseases}
              setSelected={(value) => {
                const newDis = user.chronicDiseases.includes(value)
                  ? user.chronicDiseases.filter((item) => item !== value)
                  : [...user.chronicDiseases, value];

                setUser((us) => ({ ...us, chronicDiseases: newDis }));
              }}
            />

            <InputField
              Validate={DiseaseVaidator}
              placeholder="Other Disease"
              mykey={"otherDisease"}
              errorMsg={"Invalid disease name"}
              setUser={setUser}
              user={user}
              Maxwidth="w-full"
            />
          </span>
        </div>
        <button className="btn" onClick={StepValidate} type="submit">
          Next
        </button>
      </form>
    </>
  );
}
