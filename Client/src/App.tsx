import { Alert } from "./components/UI/Alert";
import { Form } from "./components/LinkForm/Form";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AlertProvider } from "./context/AlertProvider";
import { useAuth } from "./hooks/useAuth";
import { ProtectedPage } from "./pages/ProtectedPage";

function App() {
  const { user } = useAuth();
  return (
    <AlertProvider>
      {user ? (
        <ProtectedPage />
      ) : (
        <>
          <HeroSection />
          <Form />
        </>
      )}

      <Alert />
    </AlertProvider>
  );
}

export default App;
