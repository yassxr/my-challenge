// CelestialBodyForm.js
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Dropdown from './Dropdown';
import Slider from './Slider';

const CelestialBodyForm = () => {
  const { control } = useForm();
  const [bodies, setBodies] = useState([]);
  const [selectedBody, setSelectedBody] = useState(null);
  const [selectedGravity, setSelectedGravity] = useState(0);
  const [showPlanetsOnly, setShowPlanetsOnly] = useState(false);

  useEffect(() => {
    fetch('https://api.le-systeme-solaire.net/rest/bodies')
      .then(response => response.json())
      .then(data => setBodies(data.bodies))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filteredBodies = bodies.filter(body => body.gravity < selectedGravity && (!showPlanetsOnly || body.isPlanet));
    setBodies(filteredBodies);
    setSelectedBody(null);
  }, [selectedGravity, showPlanetsOnly, bodies]);

  const handleGravityChange = (gravity) => {
    setSelectedGravity(gravity);
  };

  const handleBodySelect = (bodyId) => {
    const selected = bodies.find((body) => body.id === bodyId);
    setSelectedBody(selected);
  };

  const handleCheckboxChange = () => {
    setShowPlanetsOnly(!showPlanetsOnly);
  };

  return (
    <div>
      <h2>Celestial Body Explorer</h2>

      <Controller
        name="gravity"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <Slider label="Select gravity" min={0} max={9} step={0.01} value={field.value} onChange={(value) => { field.onChange(value); handleGravityChange(value); }} />
        )}
      />

      <label>
        <input type="checkbox" {...control.checked} onChange={handleCheckboxChange} />
        Show Only Planets
      </label>

      <Dropdown label="Select a celestial body" options={bodies} onSelect={handleBodySelect} />

      {selectedBody && (
        <div>
          <h3>{selectedBody.name}</h3>
          <p>ID: {selectedBody.id}</p>
          <p>Gravity: {selectedBody.gravity}</p>
          {/* Add other fields as needed */}
        </div>
      )}
    </div>
  );
};

export default CelestialBodyForm;
