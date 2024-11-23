import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
