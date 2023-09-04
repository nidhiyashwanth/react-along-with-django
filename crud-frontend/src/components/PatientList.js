import React, { useState, useEffect } from "react";
import { getPatient, addPatient, editPatient, deletePatient } from "../services/ApiService";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [showEditPatientForm, setShowEditPatientForm] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState();
  useEffect(() => {
    let mount = true;
    getPatient().then((res) => {
      console.log("res from api", res);
      setPatients(res);
      return () => (mount = false);
    });
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addPatient(e.target).then((res) => {
      setPatients(res);
    });
  };

  const handleEditBtn = (patient) => {
    setSelectedEditData(patient);
    setShowEditPatientForm(true);
    setShowAddPatientForm(false);
  };

  const handleEditSubmit = (e, id) => {
    editPatient(id, e.target)
      .then((res) => {
        // Assuming res is an array of patients or an updated patient object
        if (Array.isArray(res)) {
          setPatients(res);
        } else {
          // Handle the case where res is not an array
          console.error("Invalid response from editPatient:", res);
        }
      })
      .catch((error) => {
        console.error("Error editing patient:", error);
      });
  };
  
  const handleDeleteBtn = (id) => {
    // Call the deletePatient function from your ApiService
    deletePatient(id)
      .then((res) => {
        // Update the state to remove the deleted patient
        setPatients(patients.filter((p) => p.patient_id !== id));
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
  };

  return (
    <>
      <h3>PATIENT LIST</h3>
      <table border={"2px"} cellPadding={"10px"}>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Blood Type</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patients) &&
            patients.map((patient) => {
              return (
                <tr key={patient.patient_id}>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.blood_type}</td>
                  <td>
                    <button onClick={() => handleEditBtn(patient)}>Edit</button>{" "}
                    <button onClick={() => handleDeleteBtn(patient.patient_id)}>Delete</button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button onClick={() => setShowAddPatientForm(true)}>
        Add New Patient
      </button>
      {showAddPatientForm && <AddPatient handleAddSubmit={handleAddSubmit} />}
      {showEditPatientForm && (
        <EditPatient
          handleEditSubmit={handleEditSubmit}
          selectedEditData={selectedEditData}
        />
      )}
    </>
  );
}
