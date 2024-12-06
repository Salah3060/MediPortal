/* eslint-disable react/prop-types */
import LicenseValidator from "../../Utils/signValidators";
import InputField from "./InputField";

export default function Doctor({ user, setUser, setStep, submit, setError }) {
  function stepValidation(e) {
    e.preventDefault();
    if (!user.license) {
      setError("You have to input your license number");
      return;
    }
    if (!user.speciality) {
      setError("You have to choose a speciality");
      return;
    }
    setError("");
    if (!LicenseValidator(user.license)) return;
    setStep(3);
    submit();
  }
  return (
    <form className="flex flex-col justify-between">
      <div className=" flex justify-evenly my-10">
        <span className="grid grid-cols-1 gap-5 w-full  justify-items-center">
          <select
            name="specialties"
            id="specialties"
            className="sing-up-input-style col-start-1 w-full"
            value={user.speciality}
            onChange={(e) =>
              setUser((us) => ({ ...us, speciality: e.target.value }))
            }
          >
            <option value="" selected disabled>
              Speciality
            </option>
            <option value="dermatology">Dermatology (Skin)</option>
            <option value="dentistry">Dentistry (Teeth)</option>
            <option value="psychiatry">
              Psychiatry (Mental, Emotional or Behavioral Disorders)
            </option>
            <option value="pediatrics">Pediatrics and New Born (Child)</option>
            <option value="neurology">Neurology (Brain & Nerves)</option>
            <option value="orthopedics">Orthopedics (Bones)</option>
            <option value="gynecology">Gynecology and Infertility</option>
            <option value="ent">Ear, Nose and Throat</option>
            <option value="cardiology">
              Cardiology and Vascular Disease (Heart)
            </option>
            <option value="allergy">
              Allergy and Immunology (Sensitivity and Immunity)
            </option>
            <option value="andrology">Andrology and Male Infertility</option>
            <option value="audiology">Audiology</option>
            <option value="thoracic-surgery">
              Cardiology and Thoracic Surgery (Heart & Chest)
            </option>
            <option value="chest-respiratory">Chest and Respiratory</option>
            <option value="diabetes">Diabetes and Endocrinology</option>
            <option value="radiology">
              Diagnostic Radiology (Scan Centers)
            </option>
            <option value="dietitian">Dietitian and Nutrition</option>
            <option value="family-medicine">Family Medicine</option>
            <option value="gastroenterology">
              Gastroenterology and Endoscopy
            </option>
            <option value="general-practice">General Practice</option>
            <option value="general-surgery">General Surgery</option>
            <option value="geriatrics">Geriatrics (Old People Health)</option>
            <option value="hematology">Hematology</option>
            <option value="hepatology">Hepatology (Liver Doctor)</option>
            <option value="internal-medicine">Internal Medicine</option>
            <option value="interventional-radiology">
              Interventional Radiology
            </option>
            <option value="ivf">IVF and Infertility</option>
            <option value="laboratories">Laboratories</option>
            <option value="nephrology">Nephrology</option>
            <option value="neurosurgery">
              Neurosurgery (Brain & Nerves Surgery)
            </option>
            <option value="obesity-surgery">
              Obesity and Laparoscopic Surgery
            </option>
            <option value="oncology">Oncology (Tumor)</option>
            <option value="oncology-surgery">
              Oncology Surgery (Tumor Surgery)
            </option>
            <option value="ophthalmology">Ophthalmology (Eyes)</option>
            <option value="osteopathy">
              Osteopathy (Osteopathic Medicine)
            </option>
            <option value="pain-management">Pain Management</option>
            <option value="pediatric-surgery">Pediatric Surgery</option>
            <option value="phoniatrics">Phoniatrics (Speech)</option>
            <option value="physiotherapy">
              Physiotherapy and Sport Injuries
            </option>
            <option value="plastic-surgery">Plastic Surgery</option>
            <option value="rheumatology">Rheumatology</option>
            <option value="spinal-surgery">Spinal Surgery</option>
            <option value="urology">Urology (Urinary System)</option>
            <option value="vascular-surgery">
              Vascular Surgery (Arteries and Vein Surgery)
            </option>
          </select>
          <InputField
            mykey="license"
            placeholder="License Number"
            user={user}
            setUser={setUser}
            Validate={LicenseValidator}
            errorMsg="Invalid license number"
            Maxwidth="w-full"
          />
        </span>
      </div>
      <button className="btn" onClick={stepValidation} type="submit">
        Next
      </button>
    </form>
  );
}
