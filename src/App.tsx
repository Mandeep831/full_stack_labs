import './App.css';
import Header from './components/header';
import EmployeeDirectory from './components/EmployeeDirectory';
import Footer from './components/footer';
import { departments } from './interfaces/Department';

function App() {
  return (
    <>
      <Header />

      <main>
        <EmployeeDirectory departments={departments} />
      </main>

      <Footer />
    </>
  );
}

export default App;