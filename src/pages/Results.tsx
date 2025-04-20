

const student = {
  name: "John Doe",
  regNumber: "COM/B/01-1234",
};

const results = [
  { course: "Mathematics I", grade: "A", remarks: "Excellent" },
  { course: "Computer Architecture", grade: "B+", remarks: "Very Good" },
  { course: "Object-Oriented Programming", grade: "A-", remarks: "Great work" },
  { course: "Database Systems", grade: "B", remarks: "Good" },
  { course: "Web Development", grade: "A", remarks: "Outstanding" },
  { course: "Operating Systems", grade: "B-", remarks: "Fair" },
  { course: "Discrete Mathematics", grade: "B+", remarks: "Very Good" },
  { course: "Ethics and Professionalism", grade: "A", remarks: "Excellent" },
];

const Results = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Academic Results</h1>

        <div className="bg-white text-black rounded-lg shadow-md p-6">
          <div className="mb-6">
            <p className="text-lg font-medium">Name: {student.name}</p>
            <p className="text-lg font-medium">Reg Number: {student.regNumber}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="text-left py-3 px-4">Course</th>
                  <th className="text-left py-3 px-4">Grade</th>
                  <th className="text-left py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((res, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{res.course}</td>
                    <td className="py-3 px-4 font-semibold">{res.grade}</td>
                    <td className="py-3 px-4">{res.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
