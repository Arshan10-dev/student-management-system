import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddStudent from "./AddStudent.jsx";
import EditStudent from "./EditStudent";

function StudentList() {
  const [searchRoll, setSearchRoll] = useState("");
  const [students, setStudents] = useState([]);
  const totalCollected = students.reduce(
    (sum, s) => sum + Number(s.paidAmount || 0),
    0
  );
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [feeFilter, setFeeFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showTotal, setShowTotal] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });

  const handleEdit = (student) => {
    setShowForm(false);
    setEditStudent(student);
  };
  const fetchStudents = async () => {

    try {
      const res = await axios.get("https://student-management-system-1-1j2r.onrender.com/api/students"
      );
      console.log("API DATA:", res.data);
      setStudents(res.data);
    } catch (err) {
      console.log("API ERROR:", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://student-management-system-1-1j2r.onrender.com/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();

    const admin = localStorage.getItem("admin");

    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchRoll = s.studentRollNo
      .toString()
      .includes(searchRoll);

    const matchFee =
      feeFilter === "all" || s.feeStatus === feeFilter;

    return matchRoll && matchFee;
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (login.username === "admin" && login.password === "1234") {

      localStorage.setItem("admin", "true");

      setIsAdmin(true);
      setShowLogin(false);

      toast.success("Login successful");

      if (actionType === "add") {
        setShowForm(true);
      }

      if (actionType === "edit") {
        handleEdit(selectedStudent);
      }

      if (actionType === "delete") {
        deleteStudent(selectedStudent._id);
      }

    } else {
      toast.error("Wrong Credentials");
    }
  };

  return (
    <div className="max-w-[1700px] mx-auto p-5">

      <button
        onClick={() => {
          if (!isAdmin) {
            setActionType("add");
            setShowLogin(true);
            return;
          }

          setShowForm(!showForm);
        }}
        className="btn btn-primary"
      >
        Add Student
      </button>

      {isAdmin && (
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            setIsAdmin(false);
            toast.success("Logged out");
          }}
          className="btn btn-error"
        >
          Logout
        </button>
      )}

      <input
        type="text"
        placeholder="Search by Roll No..."
        value={searchRoll}
        onChange={(e) => setSearchRoll(e.target.value)}
        className="input input-bordered w-[320px]"
      />

      <button
        onClick={() => setShowFilter(!showFilter)}
        className="btn btn-secondary"
      >
        Filter
      </button>
      {showFilter && (
        <div className="flex gap-2 mb-3">
          <button
            className="btn btn-sm"
            onClick={() => setFeeFilter("paid")}
          >
            Paid Students
          </button>

          <button
            className="btn btn-sm"
            onClick={() => setFeeFilter("pending")}
          >
            Pending Students
          </button>

          <button
            className="btn btn-sm"
            onClick={() => setFeeFilter("all")}
          >
            Show All
          </button>
        </div>
      )}

      {/* Form Show/Hide */}
      {/* Add Student Form */}
      {showForm && !editStudent && (
        <AddStudent refreshStudents={fetchStudents} />
      )}


      {/* Edit Student Form */}
      {editStudent && (
        <EditStudent
          editStudent={editStudent}
          refreshStudents={fetchStudents}
          closeForm={() => setEditStudent(null)}
        />
      )}


      <div className="overflow-x-auto mt-4">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="text-left">Student Name</th>
              <th className="text-left">Roll No</th>
              <th className="text-left">Student Email</th>
              <th className="text-left">Phone Number</th>
              <th className="text-left">Total Fees</th>
              <th className="text-left">Paid Amount</th>
              <th className="text-left">Pending Amount</th>
              <th className="text-left">Actions</th>

            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7">No students found</td>
              </tr>
            ) : (
              filteredStudents.map((s) => (

                <tr key={s._id}>
                  <td className="text-left">{s.studentName}</td>
                  <td className="text-left">{s.studentRollNo}</td>
                  <td className="text-left">{s.studentEmail}</td>
                  <td className="text-left">{s.phoneNumber}</td>
                  <td className="text-left">{s.totalFees}</td>
                  <td className="text-left">{s.paidAmount}</td>
                  <td className="text-left">{s.pendingAmount}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!isAdmin) {
                          setActionType("edit");
                          setSelectedStudent(s);
                          setShowLogin(true);
                          return;
                        }

                        handleEdit(s);
                      }}
                      className="btn btn-primary">Edit</button>

                    <button
                      onClick={() => {
                        if (!isAdmin) {
                          setActionType("delete");
                          setSelectedStudent(s);
                          setShowLogin(true);
                          return;
                        }

                        deleteStudent(s._id);
                      }}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <form
            onSubmit={handleLogin}
            className="bg-zinc-900 p-6 rounded-2xl w-[350px] shadow-xl"
          >

            <h2 className="text-2xl font-bold text-white mb-5 text-center">
              Admin Login
            </h2>

            <input
              placeholder="Username"
              className="input input-bordered w-full mb-3"
              onChange={(e) =>
                setLogin({ ...login, username: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-4"
              onChange={(e) =>
                setLogin({ ...login, password: e.target.value })
              }
            />

            <button className="btn btn-success w-full mb-2">
              Login
            </button>

            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="btn btn-error w-full"
            >
              Cancel
            </button>

          </form>
        </div>
      )}
      <div className="mt-4 font-bold">
        Total Collected Amount: ₹ {totalCollected}
      </div>
    </div>
  );
}
export default StudentList;