import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddStudent({ refreshStudents }) {
  const [form, setForm] = useState({
    studentName: "",
    studentRollNo: "",
    studentEmail: "",
    phoneNumber: "",
    totalFees: "",
    paymentMode: "installment",
    paidAmount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const total = Number(form.totalFees);
  const paid = Number(form.paidAmount);

  const pending = total - paid;
  const status = pending > 0 ? "pending" : "paid";

  const handleSubmit = async (e) => {
  e.preventDefault();

  const total = Number(form.totalFees);
  const paid = Number(form.paidAmount);

  const pending = total - paid;
  const status = pending > 0 ? "pending" : "paid";

  try {
    await axios.post(
      `https://student-management-system-v7q0.onrender.com/api/students`,
      {
        ...form,
        pendingAmount: pending,
        feeStatus: status
      }
    );

    toast.success("Student added successfully");
    refreshStudents();

    setForm({
      studentName: "",
      studentRollNo: "",
      studentEmail: "",
      phoneNumber: "",
      totalFees: "",
      paymentMode: "installment",
      paidAmount: ""
    });

  } catch (err) {
    console.log(err);
    toast.error("Failed to add student");
  }
};


  return (
    <form onSubmit={handleSubmit} className="bg-white text-white p-4 shadow rounded">
      <h3 className="text-black font-bold mb-3">Add Student</h3>

      <input name="studentName" placeholder="Name" onChange={handleChange} className="input input-bordered w-full mb-2" />
      <input name="studentRollNo" placeholder="Roll No" onChange={handleChange} className="input input-bordered w-full mb-2" />
      <input name="studentEmail" placeholder="Email" onChange={handleChange} className="input input-bordered w-full mb-2" />
      <input name="phoneNumber" placeholder="Phone" onChange={handleChange} className="input input-bordered w-full mb-2" />
      <input name="totalFees" placeholder="Total Fees" onChange={handleChange} className="input input-bordered w-full mb-2" />

      <select name="paymentMode" onChange={handleChange} className="select select-bordered w-full mb-2">
        <option value="installment">Installment</option>
        <option value="full">Full</option>
      </select>

      <input name="paidAmount" placeholder="Paid Amount" onChange={handleChange} className="input input-bordered w-full mb-3" />

      <button className="btn btn-primary w-full">
        Save Student
      </button>
    </form>
  );
}

export default AddStudent;