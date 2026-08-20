import { useState } from 'react';
import { supabase } from '../supabaseClient'; // <-- Supabase connected!

export default function MedTech() {
  const [meds, setMeds] = useState([]);
  const [medName, setMedName] = useState('');
  const [time, setTime] = useState('');

  const addReminder = async () => {
    if (medName && time) {
      const newMed = { name: medName, time, info: "Take with a full glass of water." };
      
      // Update the screen instantly
      setMeds([...meds, newMed]);
      setMedName('');
      setTime('');

      // SAVE TO SUPABASE
      const { error } = await supabase
        .from('med_reminders')
        .insert([{ med_name: newMed.name, time: newMed.time, info: newMed.info }]);

      if (error) console.error("Error saving reminder:", error.message);
    }
  };

  return (
    <div className="portal-container">
      <h2>Daily Medicine Reminder</h2>
      <input type="text" placeholder="Medicine Name" value={medName} onChange={(e) => setMedName(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={addReminder}>Add Reminder</button>

      <ul>
        {meds.map((med, index) => (
          <li key={index}><strong>{med.time}</strong> - {med.name} <br/> <em>Info: {med.info}</em></li>
        ))}
      </ul>
    </div>
  );
}