import React, { useState } from "react";
import { Hackathon, HackathonLevel } from "../types/Hackathon";
import "../styles/CreateHackathon.css";

interface CreateHackathonProps {
  onSave: (hackathon: Hackathon) => void;
}

const CreateHackathon: React.FC<CreateHackathonProps> = ({ onSave }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [level, setLevel] = useState<HackathonLevel>("easy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hackathon: Hackathon = {
      id: Date.now().toString(),
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description,
      image,
      level,
    };
    onSave(hackathon);
    // Reset form fields
    setName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setImage("");
    setLevel("easy");
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
      <button type="submit">Create Hackathon</button>
    </form>
  );
};

export default CreateHackathon;
