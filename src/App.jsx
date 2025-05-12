import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import SubmitComplaint from "./components/Submitcomplaint";
import ComplaintList from "./components/ComplaintList";
import Feed from "./components/Feed";
import Home from "./components/Home"; // ✅ Fancy Home

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* ✅ Standalone Fancy Home */}
          <Route path="/" element={<Home />} />

          {/* ✅ Protected/Auth Layout with NavBar */}
          <Route path="/" element={<Body />}>
            <Route path="dashboard" element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="submit-complaint" element={<SubmitComplaint />} />
            <Route path="complaints" element={<ComplaintList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
