import React from 'react'

export default function AddPatient({handleAddSubmit}) {
  return (
    <>
    <h3>Add Form:</h3>
    <form onSubmit={handleAddSubmit}>
        First Name <input type='text' name='first_name'/>
        Last Name <input type='text' name='last_name'/>
        Blood Type <input type='text' name='blood_type'/>
        <button>Add Patient</button>
    </form>
    </>
  )
}
