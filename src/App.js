import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';

import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

// pages
import Student from './pages/Home/Admin_Panel/Manage_Student/List_Student';
import Admin from './pages/Home/Admin_Panel/Manage_Admin/List_Admin';
import Homework from './pages/Home/Admin_Panel/Manage_Homework/List_Homework';


const ROLES = {
  'User': 2001,
  'Student': 2001,
  'Admin': 5150,
  'Teacher':5153,
  'HomeWork':5178,
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
          <Route path="student" element={<Student />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Homework]} />}>
          <Route path="homework" element={<Student />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;