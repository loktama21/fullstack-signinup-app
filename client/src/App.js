import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <nav className="text-center mt-4 space-x-4">
        <Link to="/" className="text-blue-600 underline">Sign Up</Link>
        <Link to="/signin" className="text-blue-600 underline">Sign In</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
}
