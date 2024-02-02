import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const backgroundStyles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}src/image.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const containerStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    maxHeight: '400px',
    overflowY: 'auto'
  };

function App() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [isPlanetFilter, setIsPlanetFilter] = useState(false);
  const [gravityFilter, setGravityFilter] = useState(10); // Ajout de l'état pour le curseur de gravité
  const [selectedPlanet, setSelectedPlanet] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies');
        setData(response.data.bodies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredIds = data
    .filter(body => (isPlanetFilter ? body.isPlanet === true : true) && parseFloat(body.gravity) < gravityFilter)
    .map(body => body.id);

  const handleIdChange = (e) => {
    setSelectedId(e.target.value);
    const selectedBody = data.find(body => body.id === e.target.value);
    setSelectedPlanet(selectedBody);
  };

  const handleGravityChange = (e) => {
    setGravityFilter(parseFloat(e.target.value));
  };

  return (

    <div style={containerStyles}>
    <div>
      <h1 style={{ fontFamily: 'SixtyFour', fontSize: '2em', marginBottom: '30px' }}>
        RHOBS Challenge
      </h1>
  
      <label className="checkbox-label">

        <input
    
          type="checkbox"
          checked={isPlanetFilter}
          onChange={() => setIsPlanetFilter(!isPlanetFilter)}
          className='check'
        />
        Is Planete
      </label>
  
      <div>
        <label style={{ fontFamily:'Orbitron', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          Gravity: {gravityFilter}
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={gravityFilter}
            onChange={handleGravityChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </label>
      </div>
  
      <select className="dropdown-button"
        value={selectedId}
        onChange={handleIdChange}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      >
        {filteredIds.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
  

      <div>
  <h2 style={{ fontFamily: 'Orbitron'}}>Info:</h2>
  {Object.keys(selectedPlanet).map(key => {
    const value = selectedPlanet[key];

    // Exclude fields with null values and isPlanet
    if (value !== null && key !== 'isPlanet') {
      return (
        <p key={key}>
          <span style={{ fontWeight: 'bold' }}>{key}:</span> {typeof value === 'object' ? JSON.stringify(value) : value}
        </p>
      );
    }

    return null; // Exclude this field
  })}
</div>
    </div>
    </div>


  );
        }  

export default App;
