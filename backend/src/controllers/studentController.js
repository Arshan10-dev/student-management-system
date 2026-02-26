import Student from "../models/studentModel.js";

// Add Student
export const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pending Amount List
export const pendingAmountList = async (req, res) => {
  try {
    const pendingStudents = await Student.find({ pendingAmount: { $gt: 0 } });
    res.status(200).json(pendingStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Total Amount Paid List
export const totalAmountPaidList = async (req, res) => {
  try {
    const paidStudents = await Student.find(
      { feeStatus: "paid" },
      "studentName studentRollNo paidAmount paymentMode"
    );
    res.status(200).json(paidStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};