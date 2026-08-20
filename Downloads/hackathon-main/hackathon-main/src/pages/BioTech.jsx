import { useState } from 'react';
import { supabase } from '../supabaseClient'; // <-- Supabase connected!

export default function BioTech() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const db = [
    { disease: 'flu', symptoms: 'fever, chills, muscle aches, cough' },
    { disease: 'covid-19', symptoms: 'fever, dry cough, loss of taste or smell' },
    { disease: 'migraine', symptoms: 'headache, nausea, sensitivity to light' }
  ];

  const search = async () => {
    const query = input.toLowerCase();
    const foundDisease = db.find(item => item.disease === query);
    const foundSymptom = db.find(item => item.symptoms.includes(query));

    let finalResult = "";

    if (foundDisease) {
      finalResult = `Common symptoms include: ${foundDisease.symptoms}`;
    } else if (foundSymptom) {
      finalResult = `Possible disease match: ${foundSymptom.disease}`;
    } else {
      finalResult = "No match found in the database. Please consult a doctor.";
    }

    // Update the screen instantly
    setResult(finalResult);

    // SAVE TO SUPABASE
    const { error } = await supabase
      .from('bio_searches')
      .insert([{ search_query: query, result: finalResult }]);

    if (error) {
      console.error("Error saving to Supabase:", error.message);
    } else {
      console.log("Bio Tech search saved to database!");
    }
  };

  return (
    <div className="portal-container">
      <h2>Bio Tech Symptom Checker</h2>
      <input type="text" placeholder="Enter a disease OR a symptom" onChange={(e) => setInput(e.target.value)} />
      <button onClick={search}>Analyze</button>
      
      {result && <p>{result}</p>}
    </div>
  );
}