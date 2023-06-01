import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext.js";

import Signup from "./pages/Signup";
import LogIn from "./pages/LogIn";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={
          <ProtectedRoute>
          <Account />
          </ProtectedRoute>
          } />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
