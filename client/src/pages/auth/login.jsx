import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../component/ToastContext";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.notify("เข้าสู่ระบบสำเร็จ", "success");
        navigate("/dashboard");
      } else {
        toast.notify("เข้าสู่ระบบไม่สำเร็จ", "error");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-cyan-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-sky-300"
      >
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">
          เข้าสู่ระบบ
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="อีเมล"
          className="input input-bordered w-full mt-4 bg-white text-black placeholder-gray-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="input input-bordered w-full mt-2 bg-white text-black placeholder-gray-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 mt-2 text-center">
            {error.message || "Login failed"}
          </p>
        )}

        {/* Button */}
        <button
          className="btn btn-primary bg-sky-600 text-white hover:bg-sky-500 mt-4 w-full"
          disabled={loading}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <p className="mt-4 text-center text-slate-500">
          ยังไม่มีบัญชี?{" "}
          <a href="/register" className="text-sky-600 hover:underline">
            สร้างบัญชี
          </a>
        </p>
      </form>
    </div>
  );
}
