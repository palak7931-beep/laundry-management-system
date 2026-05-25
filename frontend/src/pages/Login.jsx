import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = () => {

        if (username === "adminportal" && password === "12344321") {

            localStorage.setItem("adminLoggedIn", "true")

            navigate("/admin")

        } else {

            alert("Invalid Username or Password")

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Admin Login
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg"
                >
                    Login
                </button>

            </div>

        </div>

    )

}

export default Login