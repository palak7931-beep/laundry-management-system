import { Link } from "react-router-dom"

function Home() {

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">

        <h1 className="text-3xl font-bold text-slate-800">
          Washify
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition"
          >
            Admin Portal
          </Link>

          <Link
            to="/student"
            className="bg-white border border-slate-300 text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            Student Portal
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        <h1 className="text-6xl md:text-7xl font-bold text-slate-800 leading-tight max-w-5xl">

          Smart Hostel
          <br />
          Laundry Management
          <br />
          System

        </h1>

        <p className="text-slate-500 text-xl mt-8 max-w-3xl leading-relaxed">

          Digitally manage hostel laundry collection, tracking,
          washing workflow, and delivery confirmation with a
          modern management platform built for colleges.

        </p>

      </div>

      {/* Features Section */}

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Laundry Collection
            </h2>

            <p className="text-slate-500 leading-relaxed">
              Digitally record student laundry submissions with
              proper cloth counts and collection dates.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Status Tracking
            </h2>

            <p className="text-slate-500 leading-relaxed">
              Track laundry workflow from collection to washing,
              ironing, and final delivery.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Student Portal
            </h2>

            <p className="text-slate-500 leading-relaxed">
              Students can easily track laundry records and view
              live status updates using room number search.
            </p>

          </div>

        </div>

      </div>

      {/* Workflow Section */}

      <div className="bg-white py-24 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-5xl font-bold text-slate-800 mb-16">
            Laundry Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <div className="bg-slate-100 p-6 rounded-2xl">

              <h3 className="text-xl font-bold text-slate-800">
                Collection
              </h3>

            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">

              <h3 className="text-xl font-bold text-slate-800">
                Washing
              </h3>

            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">

              <h3 className="text-xl font-bold text-slate-800">
                Ironing
              </h3>

            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">

              <h3 className="text-xl font-bold text-slate-800">
                Ready
              </h3>

            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">

              <h3 className="text-xl font-bold text-slate-800">
                Delivered
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="bg-slate-800 text-white text-center py-8">

        <p className="text-slate-300">
          Washify © 2026 • Hostel Laundry Management System
        </p>

      </footer>
      <footer className="text-center py-4 text-slate-500 text-sm">
    Developed by Palak Agarwal
</footer>

    </div>

  )
}

export default Home