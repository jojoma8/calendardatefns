function WeekNames() {
  function cornerClassName(i) {
    if (i === 0) return "rounded-tl-lg";
    if (i === 6) return "rounded-tr-lg";
  }
  return (
    <div className="grid grid-cols-7 w-fit">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, i) => (
        <div
          key={dayName}
          className={`bg-blue-300 h-10 w-10 flex items-center justify-center 
            border border-blue-200 ${cornerClassName(i)}`}
        >
          {dayName}
        </div>
      ))}
    </div>
  );
}

export default WeekNames;
