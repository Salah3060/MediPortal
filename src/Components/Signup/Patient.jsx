/* eslint-disable react/prop-types */
import { DiseaseVaidator } from "../../Utils/signValidators";
import InputField from "./InputField";
import Multiselector from "./MultiSelector";

export default function Patient({ user, setUser, setStep, submit, setError }) {
  function StepValidate(e) {
    e.preventDefault();
    if (!user.bloodtype.length) {
      setError("You have to choose a blood type");
      return;
    }

    if (
      !(
        (user.otherDisease.length && DiseaseVaidator(user.otherDisease)) ||
        !user.otherDisease
      )
    )
      return;
    if (user.otherDisease) user.chronicDiseases.push(user.otherDisease);
    setStep(3);
    submit();
  }
  return (
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
  );
}
