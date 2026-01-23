import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Predict from "./pages/Predict";
import CompleteProfile from "./pages/CompleteProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route
          path="/complete-profile"
          element={<CompleteProfile />}
        />
        <Route
        path="/predict"
        element={
          <ProtectedRoute>
            <Predict />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
