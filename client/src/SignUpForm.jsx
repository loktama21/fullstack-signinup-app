import { useState } from "react"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    console.log(data.message)
    setFormData({ username: "", email: "", password: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-20">
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full p-3 border rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-3 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded"
      >
        Sign Up
      </button>
    </form>
  )
}
