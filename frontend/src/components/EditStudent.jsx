import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function EditStudent({ refreshStudents, editStudent, closeForm }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = Number(form.totalFees);
    const paid = Number(form.paidAmount);

    const pending = total - paid;
    const status = pending > 0 ? "pending" : "paid";

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/students/${editStudent._id}`,
        {
          ...form,
          pendingAmount: pending,
          feeStatus: status
        }
      );

      toast.success("Student updated");
      refreshStudents();
      closeForm();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="bg-white p-2">
    <h3 className="mb-2 text-black font-bold">Edit Student</h3>
    <div className="grid grid-cols-[1.8fr_1fr_3.5fr_1.6fr_1.2fr_1.2fr_1fr] gap-2 items-center">

      <input
        name="studentName"
        value={form.studentName || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="studentRollNo"
        value={form.studentRollNo || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="studentEmail"
        value={form.studentEmail || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <input
        name="studentRollNo"
        value={form.phoneNumber || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <input
        name="totalFees"
        value={form.totalFees || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="paidAmount"
        value={form.paidAmount || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Pending amount column gap */}
      <div></div>

      <button className="btn btn-primary w-full">
        Update
      </button>

    </div>
  </form>
);

}

export default EditStudent;