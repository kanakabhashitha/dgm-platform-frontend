import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  SharedLayout,
  Alarms,
  Dashboard,
  Reports,
  GroupManagement,
  RealTimeMonitoring,
  GatewayManagement,
} from "./pages/dashboard/index";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { GlobalAlertPopup } from "./components/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* <GlobalAlertPopup /> */}
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index="dashboard" element={<Dashboard />} />
          <Route path="real-time-monitoring" element={<RealTimeMonitoring />} />
          <Route path="alarms" element={<Alarms />} />
          <Route path="reports" element={<Reports />} />
          <Route path="group-management" element={<GroupManagement />} />
          <Route path="gateway-management" element={<GatewayManagement />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
