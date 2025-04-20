

const units = [
  { time: "08:00 - 09:30", subject: "Mathematics I", venue: "Room A1" },
  { time: "09:30 - 11:00", subject: "Computer Architecture", venue: "Room B2" },
  { time: "11:00 - 12:30", subject: "Object-Oriented Programming", venue: "Lab C1" },
  { time: "12:30 - 01:30", subject: "Lunch Break", venue: "-" },
  { time: "01:30 - 03:00", subject: "Database Systems", venue: "Room D3" },
  { time: "03:00 - 04:30", subject: "Web Development", venue: "Lab C2" },
  { time: "04:30 - 06:00", subject: "Operating Systems", venue: "Room A2" },
  { time: "06:00 - 07:30", subject: "Discrete Mathematics", venue: "Room B1" },
];

const Timetable = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Weekly Class Timetable</h1>

        <div className="bg-white text-black rounded-lg shadow-md overflow-hidden">
          {/* Header row: hidden on mobile */}
          <div className="hidden sm:grid grid-cols-3 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
            <div>Time</div>
            <div>Subject</div>
            <div>Venue</div>
          </div>

          {/* Rows */}
          {units.map((unit, index) => (
            <div
              key={index}
              className={`grid sm:grid-cols-3 grid-cols-1 gap-2 p-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <div>
                <span className="font-semibold sm:hidden">Time: </span>
                {unit.time}
              </div>
              <div>
                <span className="font-semibold sm:hidden">Subject: </span>
                {unit.subject}
              </div>
              <div>
                <span className="font-semibold sm:hidden">Venue: </span>
                {unit.venue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
