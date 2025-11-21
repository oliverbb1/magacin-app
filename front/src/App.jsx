import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoutes";
import Login from "./Login";
import AddProducts from "./AddProducts";
import Nav from "./Nav";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addProducts"
          element={
            <PrivateRoute>
              <AddProducts />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
