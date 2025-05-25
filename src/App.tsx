import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPageView } from "./components/organisms/signup/SignUpPageView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPageView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
