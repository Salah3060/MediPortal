export default function Card() {
  return (
    <div className=" h-full w-full flex flex-col gap-2 border shadow-md justify-between items-center hover:shadow-lg hover:scale-95 duration-200 rounded-xl">
      <div className="header h-10 bg-primary/90 text-white flex justify-center items-center font-semibold text-lg w-full rounded-xl rounded-b-none">
        Today
      </div>
      <p>
        From
        <span className="font-bold"> 4:30 PM </span>
        To
        <span className="font-bold"> 9:00 PM </span>
      </p>
      <button className="w-full py-2 font-semibold bg-[#c2dfe3]   text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out flex items-center justify-center rounded-xl rounded-t-none">
        Book
      </button>
    </div>
  );
}
