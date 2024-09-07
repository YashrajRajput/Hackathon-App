import React from "react";
import { Hackathon } from "../types/Hackathon";
import HackathonCard from "./HackathonCard";
import "../styles/HackathonList.css";

interface HackathonListProps {
  hackathons: Hackathon[];
  onEdit: (hackathon: Hackathon) => void;
  onDelete: (hackathonId: string) => void;
}

const HackathonList: React.FC<HackathonListProps> = ({
  hackathons,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="hackathon-list">
      <h2>Hackathons</h2>
      <div style={{ height: '20px',  width:"1000px"}}></div>
      
      {hackathons.map((hackathon) => (
        <HackathonCard
          key={hackathon.id}
          hackathon={hackathon}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HackathonList;
