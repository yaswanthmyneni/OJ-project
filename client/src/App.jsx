import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  ProblemForm,
  ProblemsList,
  Register,
  SingleProblem,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-problem" element={<ProblemForm />} />
        <Route path="/problem" element={<ProblemsList />} />
        <Route path="/problem/:id" element={<SingleProblem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
