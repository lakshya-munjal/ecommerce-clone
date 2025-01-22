import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";

import { Routes } from "./routes";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <Toaster />
    </Provider>
  );
}

export default App;
