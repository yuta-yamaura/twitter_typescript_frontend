import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPageView } from "./components/organisms/signup/SignUpPageView";
import { LoginPageView } from "./components/organisms/login/LoginPageView";
import { Home } from "./components/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPageView />} />
        <Route path="/login" element={<LoginPageView />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
