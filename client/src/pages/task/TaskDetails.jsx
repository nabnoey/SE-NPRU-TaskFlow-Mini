import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../redux/taskReducer";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t._id === id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id, data: form })).then(() => {
      navigate("/dashboard");
    });
  };

  if (!task) {
    return <div className="container mx-auto p-4">Task not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-150 to-sky-200 p-6 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-sky-300 bg-white p-6 shadow-md mb-6">
          <h1 className="text-3xl font-sans font-bold text-sky-700">
            จัดการรายละเอียดงาน
          </h1>
          <p className="mt-2 text-sky-700/80">
            อัปเดตข้อมูลงานแบบมินิมอลโทนฟ้า
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-sky-300 bg-white p-6 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="หัวข้องาน"
              className="input input-bordered input-lg bg-slate-50 placeholder-slate-400 text-slate-800"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <select
              className="select select-bordered select-lg bg-slate-50 text-slate-800"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="todo">รอดำเนินการ</option>
              <option value="doing">กำลังดำเนินการ</option>
              <option value="done">เสร็จสิ้น</option>
            </select>
            <textarea
              placeholder="รายละเอียดงาน"
              className="textarea textarea-bordered bg-slate-50 placeholder-slate-400 text-slate-800 md:col-span-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <select
              className="select select-bordered select-lg bg-slate-50 text-slate-800"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="low">ต่ำ</option>
              <option value="medium">ปานกลาง</option>
              <option value="high">สูง</option>
            </select>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn flex-1 bg-sky-600 text-white hover:bg-sky-500"
            >
              {loading ? "กำลังปรับปรุง..." : "บันทึกการแก้ไข"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn flex-1 border border-sky-300 text-sky-700 hover:bg-sky-100"
            >
              ย้อนกลับไปเมนูงาน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
