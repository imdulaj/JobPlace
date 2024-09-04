import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import UserDashboard from "./pages/user/UserDashboard";
import { UserRoute } from "./components/UserRoute";
import { AdminRoute } from "./components/AdminRoute";
import { Layout } from './pages/global/Layout';
import { UserJobsHistory } from "./pages/user/UserJobsHistory";
import { UserInfoDashboard } from "./pages/user/UserInfoDashboard";
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SingleJob } from './pages/SingleJob';
import { DashUsers } from "./pages/admin/DashUsers";
import { DashJobs } from "./pages/admin/DashJobs";
import CreateUser from "./pages/admin/CreateUser";
import { ProSidebarProvider } from 'react-pro-sidebar'; // Import ProSidebarProvider
import CreateJob from "./pages/admin/CreateJob";

const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const CreateUserHOC = Layout(CreateUser);

export default function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider> {/* Wrap everything with ProSidebarProvider */}
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/location/:location' element={<Home />} />
              <Route path='/search/:keyword' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create/job' element={<CreateJob />} />
              <Route path='/jobs/:id' element={<SingleJob />} />
              <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
              <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
              <Route path='/admin/createUser' element={<AdminRoute><CreateUserHOC /></AdminRoute>} />
              <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
              <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
              <Route path='/user/jobs' element={<UserRoute><UserJobsHistoryHOC /></UserRoute>} />
              <Route path='/user/info' element={<UserRoute><UserInfoDashboardHOC /></UserRoute>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}
