import React, { useEffect, useState } from "react";
import axios from "axios";
import HackathonList from "./components/HackathonList";
import HackathonDetails from "./components/HackathonDetails";
import CreateHackathon from "./components/CreateHackathon";
import EditHackathon from "./components/EditHackathon";
import { Hackathon } from "./types/Hackathon";
import "./App.css"; // Import your global CSS

const API_URL = "http://localhost:5000/hackathons"; // Replace with your API URL

const App: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterLevel, setFilterLevel] = useState<"easy" | "medium" | "hard" | "all">("all");

  // Fetch hackathons from the API
  useEffect(() => {
    const fetchHackathons = async () => {
      const response = await axios.get(API_URL);
      setHackathons(response.data);
    };
    fetchHackathons();
  }, []);

  const handleCreateHackathon = (hackathon: Hackathon) => {
    setHackathons([...hackathons, hackathon]);
  };

  const handleEditHackathon = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
    setIsEditing(true);
  };

  const handleSaveHackathon = (updatedHackathon: Hackathon) => {
    const updatedHackathons = hackathons.map((h) =>
      h.id === updatedHackathon.id ? updatedHackathon : h
    );
    setHackathons(updatedHackathons);
    setSelectedHackathon(null);
    setIsEditing(false);
  };

  const handleDeleteHackathon = (hackathonId: string) => {
    const updatedHackathons = hackathons.filter((h) => h.id !== hackathonId);
    setHackathons(updatedHackathons);
    setSelectedHackathon(null);
  };

  // Filter hackathons based on search term and selected level
  const filteredHackathons = hackathons
    .filter((hackathon) => {
      const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = filterLevel === "all" || hackathon.level === filterLevel;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.startDate.getTime() - b.startDate.getTime();
      }
      return b.startDate.getTime() - a.startDate.getTime();
    });

  return (
    <div className="app-container">
      <h1>Hackathon App</h1>
      <div className="main-content">
        <div className="form-container">
          {isEditing && selectedHackathon ? (
            <EditHackathon
              hackathon={selectedHackathon}
              onSave={handleSaveHackathon}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <CreateHackathon onSave={handleCreateHackathon} />
          )}
        </div>
        <div className="details-container">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>
            <select
              value={filterLevel}
              onChange={(e) =>
                setFilterLevel(e.target.value as "easy" | "medium" | "hard" | "all")
              }
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {selectedHackathon && (
            <HackathonDetails
              hackathon={selectedHackathon}
              onEdit={handleEditHackathon}
              onDelete={handleDeleteHackathon}
            />
          )}
        </div>
      </div>
      <HackathonList
        hackathons={filteredHackathons}
        onEdit={handleEditHackathon}
        onDelete={handleDeleteHackathon}
      />
    </div>
  );
};

export default App;