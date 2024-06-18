import React, { useState } from "react";

function MenuHeader({ setSearchCriteria, searchCriteria }) {
  const [tempCriteria, setTempCriteria] = useState({ name: '', type: '', region: '' });
  const [fields, setFields] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTempCriteria(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const addField = (field) => {
    setFields([...fields, field]);
    setSearchCriteria(prev => ({
      ...prev,
      [field]: field === 'name' || field === 'type' ? [...prev[field], tempCriteria[field]] : tempCriteria[field]
    }));
    setTempCriteria(prev => ({ ...prev, [field]: '' })); 
  };

  return (
    <>
      <div id="menu-header">
      <div className="name-box">
      <h3>Name:</h3>
      <div>
        <input id="name" type="text" placeholder="Enter Pokemon Name:" value={tempCriteria.name} onChange={handleInputChange} />
        <button onClick={() => addField('name')}>Add</button>
      </div>
      </div>
      
      <div className="type-box">
        <h3>Type:</h3>
        <select id="type" value={tempCriteria.type} onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
        <button onClick={() => addField('type')}>Add</button>
      </div>
      
      </div>
      <div className="field-box">
        {fields.map((field, index) => (
          <div key={index} className="field">
            <p>{field.charAt(0).toUpperCase() + field.slice(1)}: {searchCriteria[field][index]}</p>
            <button onClick={() => {
              setFields(fields.filter((_, i) => i !== index));
              setSearchCriteria(prev => ({
                ...prev,
                [field]: prev[field].filter((_, i) => i !== index)
              }));
            }}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MenuHeader;
