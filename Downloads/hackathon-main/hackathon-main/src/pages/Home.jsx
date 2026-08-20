import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

export default function Home({ session }) {
  const navigate = useNavigate();

  // The login function you successfully fixed earlier!
  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://debu1210.github.io/hackathon/'
        }
      });
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1 className="title-3d">MediSync Hub</h1>
        <p>Select a portal below to begin</p>
      </header>

      {/* If the user is NOT logged in, only show the Google button */}
      {!session ? (
        <div style={{ marginTop: '50px' }}>
          <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}>
            Sign In with Google
          </button>
        </div>
      ) : (
        /* If they ARE logged in, show the 3D cards and Logout button */
        <>
          <button onClick={handleLogout} style={{ marginBottom: '30px', cursor: 'pointer' }}>
            Log Out
          </button>
          
          <div className="card-container">
            {/* Health Tech Card */}
            <div className="tech-card" onClick={() => navigate('/health-tech')}>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500&auto=format&fit=crop" alt="Health Tech" />
              </div>
              <div className="card-text">
                <h2>Health Tech</h2>
                <p>Primary treatments & basic healthcare logic</p>
              </div>
            </div>

            {/* Med Tech Card */}
            <div className="tech-card" onClick={() => navigate('/med-tech')}>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1584308666744-24d59b298f07?q=80&w=500&auto=format&fit=crop" alt="Med Tech" />
              </div>
              <div className="card-text">
                <h2>Med Tech</h2>
                <p>Daily medicine schedules & drug information</p>
              </div>
            </div>

            {/* Bio Tech Card */}
            <div className="tech-card" onClick={() => navigate('/bio-tech')}>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1614935151651-0bea6508ad6b?q=80&w=500&auto=format&fit=crop" alt="Bio Tech" />
              </div>
              <div className="card-text">
                <h2>Bio Tech</h2>
                <p>Two-way symptom & disease checker</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}