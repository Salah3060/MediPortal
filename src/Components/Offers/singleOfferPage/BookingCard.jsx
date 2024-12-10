/* eslint-disable react/prop-types */
export default function Card({
  day,
  clickTimeSlot,
  selectedDay,
  handleClick,
  bookHandle,
}) {
  function formatTo12Hour(time24) {
    let [hours, minutes] = time24.split(":").map(Number); // Split into hours and minutes
    minutes = minutes.toString().padStart(2, "0");

    let period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    hours = hours % 12 || 12; // Convert to 12-hour format, ensuring 12 remains 12
    return `${hours}:${minutes} ${period}`;
  }
  return (
    <div className=" h-full w-full flex flex-col gap-2 border shadow-md justify-between items-center hover:shadow-lg hover:scale-95 duration-200 rounded-xl">
      <div className="header h-16 bg-primary/90 text-white flex justify-center items-center font-semibold text-lg w-full rounded-xl rounded-b-none">
        {day[0].workingDay}
      </div>
      <div className="flex flex-col h-full w-full">
        {day?.map((el, i) => {
          return (
            <li
              className={`border-b py-5 text-lg duration-400 text-secondary hover:bg-gray-300/50 w-full cursor-pointer ${
                clickTimeSlot === i && selectedDay === el.workingDay
                  ? "bg-tertiary/50"
                  : ""
              }`}
              key={i}
              onClick={() => handleClick(i, el.workingDay, day[i])}
            >
              {" "}
              <span className="text-lg font-semibold text-primary">
                {formatTo12Hour(el.startTime)}
              </span>{" "}
              to{" "}
              <span className="text-lg font-semibold text-primary">
                {" "}
                {formatTo12Hour(el.endTime)}
              </span>{" "}
            </li>
          );
        })}
      </div>
      <button
        className="w-full py-2 font-semibold bg-[#c2dfe3]   text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out flex items-center justify-center rounded-xl rounded-t-none"
        onClick={() => {
          if (day[0].workingDay === selectedDay) bookHandle();
        }}
      >
        Book
      </button>
    </div>
  );
}
