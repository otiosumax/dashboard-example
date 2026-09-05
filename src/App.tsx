import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardView from "./pages/dashboard/DashboardView";
import DataControlView from "./pages/dataControl/DataControlView";
import Header from "./shared/header/Header";
import NotFoundView from "./pages/notFound/NotFoundView";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: "0 var(--scaffold-padding-w)" }}>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/data" element={<DataControlView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
