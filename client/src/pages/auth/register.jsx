import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../component/ToastContext";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setValidationError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    setValidationError("");
    dispatch(register({ email: form.email, password: form.password })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.notify("ลงทะเบียนสำเร็จ", "success");
          navigate("/login");
        } else {
          toast.notify("ลงทะเบียนไม่สำเร็จ", "error");
        }
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-sky-300"
      >
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">
          สมัครสมาชิก
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="อีเมล"
          autoComplete="email"
          className="input input-bordered bg-slate-50 text-slate-900 placeholder-slate-400 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="รหัสผ่าน"
          autoComplete="new-password"
          className="input input-bordered bg-slate-50 text-slate-900 placeholder-slate-400 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
          autoComplete="new-password"
          className="input input-bordered bg-slate-50 text-slate-900 placeholder-slate-400 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          required
        />

        {/* Error */}
        {(validationError || error) && (
          <p className="text-red-500 mt-2 text-center">
            {validationError || error.message || "เกิดข้อผิดพลาด"}
          </p>
        )}

        {/* Button */}
        <button
          className="btn btn-primary bg-sky-600 text-white hover:bg-sky-500 mt-4 w-full"
          disabled={loading}
        >
          {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
        </button>

        <p className="mt-4 text-center text-slate-500">
          มีบัญชีแล้ว?{" "}
          <a href="/login" className="text-sky-600 hover:underline">
            เข้าสู่ระบบ
          </a>
        </p>
      </form>
    </div>
  );
}
