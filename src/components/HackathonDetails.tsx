import React from 'react';
import { Hackathon } from '../types/Hackathon';
import { formatDate } from '../utils/date';
import '../styles/HackathonDetails.css'

interface HackathonDetailsProps {
  hackathon: Hackathon;
  onEdit: (hackathon: Hackathon) => void;
  onDelete: (hackathonId: string) => void;
}

const HackathonDetails: React.FC<HackathonDetailsProps> = ({ hackathon, onEdit, onDelete }) => {
  return (
    <div className="hackathon-details">
      <img src={hackathon.image} alt={hackathon.name} />
      <h2>{hackathon.name}</h2>
      <p>{hackathon.description}</p>
      <p>Start Date: {formatDate(hackathon.startDate)}</p>
      <p>End Date: {formatDate(hackathon.endDate)}</p>
      <p>Level: {hackathon.level}</p>
      <button onClick={() => onEdit(hackathon)}>Edit</button>
      <button onClick={() => onDelete(hackathon.id)}>Delete</button>
    </div>
  );
};

export default HackathonDetails;