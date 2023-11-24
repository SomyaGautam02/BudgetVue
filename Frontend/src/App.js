import "./App.css";
import Register from "./Components/User/Register/Register";
import Login from "./Components/User/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Goals from "./Components/Goals/Goals";
import Records from "./Components/Records/Records";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home_Page/Home";
import BudgetPage from "./Components/Budget_Page/BudgetPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoutes>
                <Goals />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/records"
            element={
              <ProtectedRoutes>
                <Records />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/budget"
            element={
              <ProtectedRoutes>
                <BudgetPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
export default App;
