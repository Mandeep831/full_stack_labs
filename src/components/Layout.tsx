import { Outlet } from 'react-router-dom';
import Header from './header';
import Nav from './Navbar';
import Footer from './footer';

function Layout() {
  return (
    <>
      <Header />

      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;