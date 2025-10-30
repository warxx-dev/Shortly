import { Alert } from "./components/Alert";
import { Footer } from "./components/Footer";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LinksTable } from "./components/LinksTable";
import { AlertProvider } from "./context/AlertProvider";
import { LinksProvider } from "./context/LinksProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginModalProvider } from "./context/LoginModalProvider";

const GOOGLE_CLIENT_ID =
  "923813304533-ctp006g87q241ihoibtqn6vu0iin46gc.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AlertProvider>
        <LinksProvider>
          <LoginModalProvider>
            <Header />
            <HeroSection />
            <Form />
            <Footer />
            <Alert />
            <LinksTable />
          </LoginModalProvider>
        </LinksProvider>
      </AlertProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
