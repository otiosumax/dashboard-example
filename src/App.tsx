import "./App.css";

import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./shared/header/Header";
import NotFoundView from "./pages/notFound/NotFoundView";

const DashboardView = lazy(() => import("./pages/dashboard/DashboardView"));
const DataControlView = lazy(() => import("./pages/dataControl/DataControlView"));

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: "0 var(--scaffold-padding-w)" }}>
        <Suspense
          fallback={<p className="text-muted font-mono">Загрузка…</p>}
        >
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/data" element={<DataControlView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
