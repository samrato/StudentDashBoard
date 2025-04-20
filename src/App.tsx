import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";


import TimetableForm from "./pages/TimetableForm";
import Results from "./pages/Results";

// import HostelBookingForm from "./pages/HostelBookingForm";
// import TransferForm from "./pages/TransferForm";
// import ApplicationForm from "./pages/ApplicationForm";


// Initialize Query Client
const queryClient = new QueryClient();

// Auth Layout
const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
    <Outlet />
  </div>
);

// Dashboard Layout
const DashboardLayout = () => (
  <div className="flex min-h-screen bg-gradient-to-r from-purple-600 via-blue-700 to-teal-500">
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-center" />
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/timetable" element={<TimetableForm />} />
  <Route path="/results" element={<Results />} />



  {/* <Route path="/hostel" element={<HostelBookingForm />} />
  <Route path="/transfer" element={<TransferForm />} />
  <Route path="/applications" element={<ApplicationForm />} /> */}
</Route>


        {/* Default Route Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
