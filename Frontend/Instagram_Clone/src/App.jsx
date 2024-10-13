import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import AppLayout from "./Pages/AppLayout";
import MyFollowingPost from "./Pages/MyFollowingPost";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CompleteProfile from "./Components/GoogleLogin/CompleteProfile";

function RoutesComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <AppLayout /> : <Navigate to="/signin" />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/following" element={<MyFollowingPost />} />
          </Route>
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
          />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="619042780896-47nchbmt6jmlq7vca67lg95nhnkt6n8b.apps.googleusercontent.com">
        <RoutesComponent></RoutesComponent>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
