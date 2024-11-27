/* eslint-disable react/prop-types */
export default function Overlay({ isOpen, toogleSideBar }) {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 transition-all duration-500" ${
        isOpen ? "opacity-100 z-30" : "opacity-0 -z-50"
      }`}
      onClick={toogleSideBar}
    ></div>
  );
}
