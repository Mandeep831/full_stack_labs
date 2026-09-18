import { useState } from 'react';
import './App.css';
import Header from './components/header';
import EmployeeDirectory from './components/EmployeeDirectory';
import Footer from './components/footer';
import AddEmployee from './components/AddEmployee';
import { departments } from './interfaces/Department';

function App() {
  const [departmentList, setDepartmentList] = useState(departments);

  return (
    <>
      <Header />

      <main>
        <EmployeeDirectory departments={departmentList} />

        <AddEmployee
          departments={departmentList}
          setDepartments={setDepartmentList}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;