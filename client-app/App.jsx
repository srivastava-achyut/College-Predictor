import ProtectedRoute from "./components/ProtectedRoute";

<Route
  path="/predict"
  element={
    <ProtectedRoute>
      <PredictCollege />
    </ProtectedRoute>
  }
/>
