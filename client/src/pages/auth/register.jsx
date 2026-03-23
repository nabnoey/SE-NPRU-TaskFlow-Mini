import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(register({ email: form.email, password: form.password })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/login");
        }
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered bg-white/20 text-white placeholder-white/70 mt-4 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered bg-white/20 text-white placeholder-white/70 mt-2 w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered bg-white/20 text-white placeholder-white/70 mt-2 w-full"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          required
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 mt-2 text-center">
            {error.message || "Register failed"}
          </p>
        )}

        {/* Button */}
        <button
          className="btn btn-primary bg-white text-purple-600 hover:bg-gray-100 mt-4 w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center text-white/70">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
