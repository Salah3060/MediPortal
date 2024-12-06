export function ValidataName(name) {
  let nameRegex = /^[a-zA-z]{2,20}$/;
  return nameRegex.test(name) || name.length < 2;
}
export function ValidataMail(email) {
  let Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return Regex.test(email) || email.length < 2;
}
export function ValidataPhone(phonenumber) {
  let Regex = /^(002|\+2)?(010|011|012|015)[0-9]{8}$/;
  return Regex.test(phonenumber) || phonenumber.length < 2;
}
export function ValidataPassword(password) {
  let Regex = /^((?=.*[A-Z])|(?=.*[a-z]))(?=.*[0-9])[0-9a-zA-Z]{8,}$/;
  return Regex.test(password) || password.length < 2;
}
export function DiseaseVaidator(Dis) {
  let Regex = /(?=.*[A-Za-z])[A-Za-z0-9]+$/;
  return Regex.test(Dis) || Dis.length < 2;
}

export default function LicenseValidator(lic) {
  let Regex = /^[0-9]{1,}$/;
  return Regex.test(lic) || lic.length < 2;
}
