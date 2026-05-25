import { FaTruck, FaTshirt ,FaClipboardList ,FaUserGraduate,
    FaSearch,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaClock} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Admin() {

const navigate = useNavigate()

useEffect(() => {

    const isLoggedIn = localStorage.getItem("adminLoggedIn")

    if (!isLoggedIn) {

        navigate("/login")

    }

}, [])
const [studentName, setStudentName] = useState("")
const [roomNumber, setRoomNumber] = useState("")
const [shirts, setShirts] = useState("")
const [pants, setPants] = useState("")
const [towels, setTowels] = useState("")
const [bedsheets, setBedsheets] = useState("")
const [socks, setSocks] = useState("")
const [depositAmount, setDepositAmount] = useState("")
const [deductedAmount, setDeductedAmount] = useState("")

const [entries, setEntries] = useState(() => {

  const savedEntries = localStorage.getItem("laundryEntries")

  return savedEntries ? JSON.parse(savedEntries) : []

})
const [editIndex, setEditIndex] = useState(null)
const [searchTerm, setSearchTerm] = useState("")
const fetchRecords = () => {

  fetch("https://laundry-management-system-s5d3.onrender.com/records")

    .then((response) => response.json())

    .then((data) => {

      setEntries(data)

    })

}
useEffect(() => {

  localStorage.setItem(
    "laundryEntries",
    JSON.stringify(entries)
  )

}, [entries])

useEffect(() => {

  fetchRecords()

}, [])

const handleEdit = (index) => {

  const selectedEntry = entries[index]

  setStudentName(selectedEntry.studentName)
  setRoomNumber(selectedEntry.roomNumber)
  setShirts(selectedEntry.shirts)
  setPants(selectedEntry.pants)
  setTowels(selectedEntry.towels)
  setBedsheets(selectedEntry.bedsheets)

  setEditIndex(index)
}

const handleDelete = async (id) => {

    await fetch(`https://laundry-management-system-s5d3.onrender.com/deleteRecord/${id}`, {
        method: "DELETE"
    })

    const updatedData = entries.filter(
        (entry) => entry._id !== id
    )

    setEntries(updatedData)

}

const handleStatusChange = async (index, newStatus) => {

    const updatedEntries = [...entries]

    updatedEntries[index].status = newStatus

    setEntries(updatedEntries)

    await fetch(
        `https://laundry-management-system-s5d3.onrender.com/updateStatus/${entries[index]._id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: newStatus
            })
        }
    )

}

const handleSubmit =  async () => {

  const duplicateEntry = entries.find(
  (entry, index) =>
    entry.studentName === studentName &&
    entry.roomNumber === roomNumber &&
    entry.collectionDate === new Date().toLocaleDateString() &&
    index !== editIndex
)

if (duplicateEntry) {
  alert("Laundry record already exists!")
  return
}
  const currentDate = new Date().toLocaleDateString()
  const newEntry = {
    studentName,
    roomNumber,
    shirts,
    pants,
    towels,
    bedsheets,
    socks,
    collectionDate: currentDate,
    status: "Collected",
    depositAmount: Number(depositAmount),
    deductedAmount: Number(deductedAmount),
    remainingBalance:
    Number(depositAmount) - Number(deductedAmount),
  }

  fetch("https://laundry-management-system-s5d3.onrender.com/addRecord", {

  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify(newEntry)

})

.then((response) => response.json())

.then((data) => {

  console.log(data)

  fetchRecords()

})
if (editIndex !== null) {

    await fetch(
        `https://laundry-management-system-s5d3.onrender.com/updateRecord/${entries[editIndex]._id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntry)
        }
    )

    const updatedEntries = [...entries]

    updatedEntries[editIndex] = {
        ...newEntry,
        _id: entries[editIndex]._id
    }

    setEntries(updatedEntries)

    setEditIndex(null)

    return 

}
 else {
}

  setStudentName("")
  setRoomNumber("")
  setShirts("")
  setPants("")
  setTowels("")
  setBedsheets("")
}

const filteredEntries = entries.filter((entry) =>

  entry.studentName
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  ||

  entry.roomNumber
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

)

const totalRecords = entries.length

const washingCount = entries.filter(
  (entry) => entry.status === "Washing"
).length

const readyCount = entries.filter(
  (entry) => entry.status === "Ready"
).length

const deliveredCount = entries.filter(
  (entry) => entry.status === "Delivered"
).length

const handleLogout = () => {

    localStorage.removeItem("adminLoggedIn")

    navigate("/login")

}
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-12 py-6 bg-white shadow-sm">

        <h1 className="text-3xl font-bold text-slate-800">
          Washify
        </h1>

        <div className="space-x-8 text-slate-600 font-medium">
          <a href="#" className="hover:text-slate-900 transition">
            Home
          </a>

          <a href="#" className="hover:text-slate-900 transition">
            Services
          </a>

          <a href="#" className="hover:text-slate-900 transition">
            Track
          </a>

          <a href="#" className="hover:text-slate-900 transition">
            Contact
          </a>
        </div>

             <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
>
    Logout
</button>

      </nav>

      {/* Hero Section */}

      <div className="flex flex-col items-center justify-center pt-16 px-6">

        <div className="bg-white p-12 rounded-3xl shadow-lg text-center max-w-2xl">

          <h1 className="text-5xl font-bold text-slate-800 leading-tight mb-6">
            Hostel Laundry
            <br />
            Management System
          </h1>

          <p className="text-slate-500 text-lg mb-8">
            Digitally manage hostel laundry collection and tracking.
          </p>

          <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-700 transition duration-300">
            Get Started
          </button>

        </div>

        {/* Feature Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

            <FaTruck className="text-4xl text-slate-700 mb-5" />

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Collection Tracking
            </h2>

            <p className="text-slate-500">
              Record student laundry submissions digitally.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

            <FaTshirt className="text-4xl text-slate-700 mb-5" />

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Laundry Status
            </h2>

            <p className="text-slate-500">
              Track washing and delivery progress easily.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">

            <FaClipboardList className="text-4xl text-slate-700 mb-5" />

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Delivery Confirmation
            </h2>

            <p className="text-slate-500">
              Confirm laundry delivery digitally.
            </p>

          </div>

        </div>

        {/* Dashboard Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-slate-500 text-lg">
              Total Records
            </h3>

            <p className="text-4xl font-bold text-slate-800 mt-3">
              {totalRecords}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-slate-500 text-lg">
              Washing
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {washingCount}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-slate-500 text-lg">
              Ready
            </h3>

            <p className="text-4xl font-bold text-yellow-500 mt-3">
              {readyCount}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-slate-500 text-lg">
              Delivered
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {deliveredCount}
            </p>

          </div>

        </div>
        
   

        {/* Laundry Entry Form */}

        <div className="bg-white p-10 rounded-3xl shadow-lg mt-20 w-full max-w-3xl">

          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Laundry Entry Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
              type="text"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
                type="number"
                placeholder="Number of Shirts"
                value={shirts}
                onChange={(e) => setShirts(e.target.value)}
                className="border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
              type="number"
              placeholder="Number of Pants"
              value={pants}
              onChange={(e) => setPants(e.target.value)}
              className="border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
              type="number"
              placeholder="Number of Towels"
              value={towels}
              onChange={(e) => setTowels(e.target.value)}
              className="border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
              type="number"
              placeholder="Number of Bedsheets"
              value={bedsheets}
              onChange={(e) => setBedsheets(e.target.value)}
              className="border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
                type="number"
                placeholder="Socks Pair Count"
                value={socks}
                onChange={(e) => setSocks(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
            />

            <input
                type="number"
                placeholder="Deposit Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
            />

            <input
                type="number"
                placeholder="Deducted Amount"
                value={deductedAmount}
                onChange={(e) => setDeductedAmount(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl mt-8 font-semibold hover:bg-slate-700 transition duration-300"
          >
            {editIndex !== null
            ? "Update Entry"
            : "Submit Laundry Entry"}
          </button>

        </div>

        {/* Laundry Entries */}

          {/* Laundry Records Table */}

    <div className="w-full max-w-6xl mt-16">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Laundry Records
      </h2>

      <div className="mb-6">

      <input
        type="text"
        placeholder="Search by student name or room number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-slate-400 bg-white"
      />

    </div>
  <div className="overflow-x-auto bg-white rounded-2xl shadow-md">

    <table className="w-full text-left border-collapse">

      <thead className="bg-slate-800 text-white">

        <tr>

          <th className="p-4">Student</th>

          <th className="p-4">Room</th>

          <th className="p-4">Shirts</th>

          <th className="p-4">Pants</th>

          <th className="p-4">Towels</th>

          <th className="p-4">Bedsheets</th>

          <th className="p-4">Socks</th>

          <th className="p-4">Date</th>

          <th className="p-4">Deposit</th>

          <th className="p-4">Balance</th>

          <th className="p-4">Status</th>

          <th className="p-4">Actions</th>

        </tr>

      </thead>

      <tbody>

        {filteredEntries.map((entry, index) => (

          <tr
            key={index}
            className="border-b hover:bg-slate-50 transition duration-200"
          >

            <td className="p-4 font-semibold text-slate-800">
              {entry.studentName}
            </td>

            <td className="p-4 text-slate-600">
              {entry.roomNumber}
            </td>

            <td className="p-4 text-slate-600">
              {entry.shirts}
            </td>

            <td className="p-4 text-slate-600">
              {entry.pants}
            </td>

            <td className="p-4 text-slate-600">
              {entry.towels}
            </td>

            <td className="p-4 text-slate-600">
              {entry.bedsheets}
            </td>

            <td className="p-4 text-slate-600">
              {entry.socks}</td>

            <td className="p-4 text-slate-600">
              {entry.collectionDate}
            </td>

            <td className="p-4 text-slate-600">
              ₹{entry.depositAmount}</td>

            <td className="p-4 text-slate-600">
              ₹{entry.remainingBalance}</td>

            <td className="p-4">

              <select
                value={entry.status}
                onChange={(e) =>
                  handleStatusChange(index, e.target.value)
                }
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold outline-none"
              >

                <option value="Collected">
                  Collected
                </option>

                <option value="Washing">
                  Washing
                </option>

                <option value="Ironing">
                  Ironing
                </option>

                <option value="Ready">
                  Ready
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </td>

            <td className="p-4 flex gap-3">

            <button
              onClick={() => handleEdit(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(entry._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

      </div>

        <footer className="text-center py-4 text-slate-500 text-sm">
    Developed by Palak Agarwal
</footer>
    </div>

    
  )
}


export default Admin