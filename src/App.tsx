import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPageView } from "./components/organisms/signup/SignUpPageView";
import { LoginPageView } from "./components/organisms/login/LoginPageView";
import { Home } from "./components/pages/Home";
import { TweetDetail } from "./components/molecules/layouts/TweetDetail";
import { UserProfile } from "./components/molecules/layouts/UserProfile";
import { Notifications } from "./components/molecules/layouts/Notifications";
import { DirectMessageList } from "./components/molecules/layouts/DirectMessageList";
import { MessageUserList } from "./components/molecules/layouts/MessageUserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPageView />} />
        <Route path="/login" element={<LoginPageView />} />
        <Route path="/tweet/:id" element={<TweetDetail />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/message" element={<MessageUserList />} />
        <Route path="/message/:sender_id/:recipient_name" element={<DirectMessageList />}/>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
