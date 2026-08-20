import { useState } from 'react';
import { supabase } from '../supabaseClient'; // <-- Supabase is now connected!

export default function HealthTech() {
  const [name, setName] = useState('');
  const [disease, setDisease] = useState('');
  const [treatment, setTreatment] = useState('');

  const treatmentsDB = {
    diabetes: "Monitor blood sugar, insulin therapy, dietary changes.",
    hypertension: "Low sodium diet, regular exercise, blood pressure medication.",
    asthma: "Inhalers (corticosteroids), avoid triggers like dust/smoke."
  };

  const handleSearch = async () => {
    const found = treatmentsDB[disease.toLowerCase()] || "Consult a registered doctor for specific treatments.";
    setTreatment(found);

    // SEND DATA TO SUPABASE
    const { error } = await supabase
      .from('health_records')
      .insert([{ patient_name: name, disease: disease, suggested_treatment: found }]);

    if (error) {
      console.error("Error saving to Supabase:", error.message);
    } else {
      console.log("Successfully saved to database!");
    }
  };

  return (
    <div className="portal-container">
      <h2>Health Tech Portal</h2>
      <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name || 'Patient'}</p>
      
      <br />
      <input type="text" placeholder="Enter existing disease" onChange={(e) => setDisease(e.target.value)} />
      <button onClick={handleSearch}>Get Primary Treatment</button>
      
      {treatment && <p><strong>Suggested Treatment:</strong> {treatment}</p>}
    </div>
  );
}