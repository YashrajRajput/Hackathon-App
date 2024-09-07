import React, { useState } from "react";
import { Hackathon, HackathonLevel } from "../types/Hackathon";
import "../styles/EditHackathon.css";

interface EditHackathonProps {
  hackathon: Hackathon;
  onSave: (updatedHackathon: Hackathon) => void;
  onCancel: () => void;
}

const EditHackathon: React.FC<EditHackathonProps> = ({
  hackathon,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(hackathon.name);
  const [startDate, setStartDate] = useState(
    hackathon.startDate.toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    hackathon.endDate.toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState(hackathon.description);
  const [image, setImage] = useState(hackathon.image);
  const [level, setLevel] = useState<HackathonLevel>(hackathon.level);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHackathon: Hackathon = {
      ...hackathon,
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description,
      image,
      level,
    };
    onSave(updatedHackathon);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value as HackathonLevel)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditHackathon;
