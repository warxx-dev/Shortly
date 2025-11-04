import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Header } from "./components/Layout/Header/Header.tsx";
import { Footer } from "./components/Layout/Footer.tsx";
import { ModalProvider } from "./context/ModalProvider.tsx";
import { ProtectedPage } from "./pages/ProtectedPage.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LinksProvider } from "./context/LinksProvider.tsx";

const GOOGLE_CLIENT_ID =
  "923813304533-ctp006g87q241ihoibtqn6vu0iin46gc.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <ModalProvider>
        <LinksProvider>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/main" element={<ProtectedPage />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </LinksProvider>
      </ModalProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
