import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import './App.css';

import Home from "./pages/Home";
import HealthTech from "./pages/HealthTech";
import MedTech from "./pages/MedTech";
import BioTech from "./pages/BioTech";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        
        <Route path="/health" element={
          <ProtectedRoute session={session}><HealthTech session={session} /></ProtectedRoute>
        } />
        
        <Route path="/med" element={
          <ProtectedRoute session={session}><MedTech /></ProtectedRoute>
        } />
        
        <Route path="/bio" element={
          <ProtectedRoute session={session}><BioTech /></ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}
