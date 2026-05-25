import { useState, useEffect } from "react"

function Student() {

  const [studentRoomSearch, setStudentRoomSearch] = useState("")


  const [entries, setEntries] = useState([])

  useEffect(() => {

    const savedEntries = localStorage.getItem("laundryEntries")

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }

  }, [])

  const studentRecords = entries.filter(
  (entry) =>

    entry.roomNumber
      .toLowerCase()
      .includes(studentRoomSearch.toLowerCase())
)

  return (

    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-10">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-5xl">

        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          Student Laundry Tracker
        </h1>

        <input
          type="text"
          placeholder="Enter Room Number"
          value={studentRoomSearch}
          onChange={(e) => setStudentRoomSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400 mb-8"
        />


        {studentRoomSearch && studentRecords.length > 0 && (
        <div className="overflow-x-auto">

          <table className="w-full text-left border-collapse">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4">Date</th>

                <th className="p-4">Student</th>

                <th className="p-4">Shirts</th>

                <th className="p-4">Pants</th>

                <th className="p-4">Towels</th>

                <th className="p-4">Bedsheets</th>

                <th className="p-4">Balance</th>

                <th className="p-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {studentRecords.map((entry, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">
                    {entry.collectionDate}
                  </td>

                  <td className="p-4">
                    {entry.studentName}
                  </td>

                  <td className="p-4">
                    {entry.shirts}
                  </td>

                  <td className="p-4">
                    {entry.pants}
                  </td>

                  <td className="p-4">
                    {entry.towels}
                  </td>

                  <td className="p-4">
                    {entry.bedsheets}
                  </td>

                  <td className="p-4">
                  ₹{entry.remainingBalance}
                  </td>
                  
                  <td className="p-4 font-semibold text-slate-700">
                    {entry.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
        )}

        {studentRoomSearch && studentRecords.length === 0 && (

        <p className="text-center text-slate-500 text-lg mt-8">
            No laundry records found for this room.
        </p>

        )}
      </div>
<footer className="text-center py-4 text-slate-500 text-sm">
    Developed by Palak Agarwal
</footer>
    </div>

  )
}

export default Student