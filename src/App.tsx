import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import EmployeeDirectory from './components/EmployeeDirectory';
import AddEmployee from './components/AddEmployee';
import Organization from './components/Organization';
import Layout from './components/Layout';
import { departments } from './interfaces/Department';

function App() {
  const [departmentList, setDepartmentList] = useState(departments);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/employees" replace />} />

        <Route
          path="employees"
          element={
            <>
              <EmployeeDirectory departments={departmentList} />

              <AddEmployee
                departments={departmentList}
                setDepartments={setDepartmentList}
              />
            </>
          }
        />

        <Route path="organization" element={<Organization />} />
      </Route>
    </Routes>
  );
}

export default App;