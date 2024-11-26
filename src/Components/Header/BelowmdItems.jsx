/* eslint-disable react/prop-types */
export default function BelowmdLayout({ toogleSideBar }) {
  return (
    <ul className="md:hidden">
      <button
        className="text-white text-2xl focus:ring-1 p-1 focus:ring-tertiary"
        onClick={toogleSideBar}
      >
        ☰
      </button>
    </ul>
  );
}
