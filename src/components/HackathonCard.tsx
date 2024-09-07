import React from "react";
import { Hackathon } from "../types/Hackathon";
import { formatDate, formatTimeRemaining } from "../utils/date";

interface HackathonCardProps {
  hackathon: Hackathon;
  onEdit: (hackathon: Hackathon) => void;
  onDelete: (hackathonId: string) => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="hackathon-card">
      <img
        src={hackathon.image}
        alt={hackathon.name}
        className="hackathon-image"
      />
      <h3>{hackathon.name}</h3>
      <p>{hackathon.description}</p>
      <p>Level: {hackathon.level}</p>
      <p>Start Date: {formatDate(hackathon.startDate)}</p>
      <p>End Date: {formatDate(hackathon.endDate)}</p>
      <p>
        Starts in:
        {formatTimeRemaining(hackathon.startDate.getTime() - Date.now())}
      </p>
      <div className="button-container">
        <button onClick={() => onEdit(hackathon)}>Edit</button>
        <button onClick={() => onDelete(hackathon.id)}>Delete</button>
      </div>
    </div>
  );
};

export default HackathonCard;
