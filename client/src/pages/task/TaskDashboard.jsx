import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, createTask, deleteTask } from "../../redux/taskReducer";
import { Link } from "react-router-dom";

export default function TaskDashboard() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { authUser } = useSelector((state) => state.auth);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  });

  useEffect(() => {
    if (authUser) {
      dispatch(fetchTasks());
    }
  }, [authUser, dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTask(newTask));
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "low",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTask(id));
    }
  };

  if (!authUser) {
    return <div>Please login first</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 text-slate-900 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-sky-300 bg-white p-6 shadow-md mb-6">
          <h1 className="text-4xl font-sans font-bold text-sky-700">
            ศูนย์บัญชาการงานรายบุคคล
          </h1>
          <p className="mt-2 text-sky-700/80">
            ระบบ SE NPRU TaskFlow Mini (โทนฟ้ามินิมอล)
          </p>
        </div>

        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-sky-300 bg-white p-6 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-semibold text-sky-700 mb-4">
            สร้างรายการงานใหม่
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="หัวข้องาน"
              className="input input-bordered input-lg bg-slate-50 placeholder-slate-400 text-slate-800"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
            <select
              className="select select-bordered select-lg bg-slate-50 text-slate-800"
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <option value="todo">รอดำเนินการ</option>
              <option value="doing">กำลังดำเนินการ</option>
              <option value="done">เสร็จสิ้น</option>
            </select>
            <textarea
              placeholder="รายละเอียดงาน"
              className="textarea textarea-bordered bg-slate-50 placeholder-slate-400 text-slate-800 md:col-span-2"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              className="select select-bordered select-lg bg-slate-50 text-slate-800"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="low">ต่ำ</option>
              <option value="medium">ปานกลาง</option>
              <option value="high">สูง</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn mt-6 w-full bg-sky-600 text-white hover:bg-sky-500"
          >
            {loading ? "กำลังบันทึกงาน..." : "บันทึกงานใหม่"}
          </button>
        </form>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-100/80 p-4 text-red-600 mb-6">
            {error.message || "เกิดข้อผิดพลาด"}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tasks.map((task) => {
            const statusLabel =
              task.status === "todo"
                ? "รอดำเนินการ"
                : task.status === "doing"
                  ? "กำลังดำเนินการ"
                  : "เสร็จสิ้น";
            const priorityLabel =
              task.priority === "low"
                ? "ต่ำ"
                : task.priority === "medium"
                  ? "ปานกลาง"
                  : "สูง";
            return (
              <div
                key={task._id}
                className="border border-amber-300 bg-slate-800/75 rounded-xl p-4 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-sky-800">
                    {task.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-800 font-semibold">
                    {statusLabel}
                  </span>
                </div>
                <p className="mt-3 text-slate-600 min-h-[3rem]">
                  {task.description || "ไม่มีรายละเอียดเพิ่มเติม"}
                </p>
                <div className="mt-3 flex justify-between items-center text-sm text-slate-500">
                  <span>ระดับ: {priorityLabel}</span>
                  <span>
                    วันที่:{" "}
                    {new Date(task.createdAt).toLocaleDateString("th-TH")}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/task/${task._id}`}
                    className="btn btn-secondary bg-blue-700 hover:bg-blue-600 text-white flex-1"
                  >
                    ดูรายละเอียด
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-error bg-red-700 hover:bg-red-600 text-white flex-1"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
