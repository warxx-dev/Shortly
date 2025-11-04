import { Alert } from "./components/UI/Alert";
import { Form } from "./components/LinkForm/Form";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AlertProvider } from "./context/AlertProvider";

function App() {
  return (
    <AlertProvider>
      <HeroSection />
      <Form showWarning={true} />
      <Alert />
    </AlertProvider>
  );
}

export default App;
