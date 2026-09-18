import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <NavLink to="/employees">Employees</NavLink>
      {' | '}
      <NavLink to="/organization">Organization</NavLink>
    </nav>
  );
}

export default Nav;