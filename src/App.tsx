
import { useEffect, useState } from 'react';
import type { Department } from '../shared/types/Department';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import EmployeeDirectory from './components/EmployeeDirectory';
import AddEmployee from './components/AddEmployee';
import Organization from './components/Organization';
import Layout from './components/Layout';
import { getDepartments } from './apis/employeeRepo';

function App() {
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadDepartments() {
    try {
      const departments = await getDepartments();
      setDepartmentList(departments);
      setError('');
    } catch {
      setError('Failed to load departments.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDepartments();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/employees" replace />} />

        <Route
          path="employees"
          element={
            loading ? (
              <p>Loading departments...</p>
            ) : error ? (
              <p role="alert">{error}</p>
            ) : (
              <>
                <EmployeeDirectory departments={departmentList} />

                <AddEmployee
                  departments={departmentList}
                  onEmployeeAdded={loadDepartments}
                />
              </>
            )
          }
        />

        <Route path="organization" element={<Organization />} />
      </Route>
    </Routes>
  );
}

export default App;
