import { useEffect, useState } from "react";
import "./App.css";

const SPACEX_API = "https://api.spacexdata.com/v5/launches/upcoming";

export default function SpaceXDashboard() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLaunches() {
      try {
        const res = await fetch(SPACEX_API);
        const data = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(a.date_utc) - new Date(b.date_utc)
        );
        setLaunches(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch launches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLaunches();
  }, []);

  if (loading) return <p className="loading">Loading upcoming launches...</p>;

  return (
    <div className="dashboard">
      {launches.map((launch) => (
        <div className="card" key={launch.id}>
          <h2>{launch.name}</h2>
          <p>
            <strong>Launch Date:</strong>{" "}
            {new Date(launch.date_utc).toLocaleString()}
          </p>
          <p>
            <strong>Rocket ID:</strong> {launch.rocket || "N/A"}
          </p>
          <p>
            <strong>Launchpad:</strong> {launch.launchpad || "Unknown"}
          </p>
          <a
            href={launch.links.webcast || launch.links.wikipedia || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="more-info"
          >
            More Info
          </a>
        </div>
      ))}
    </div>
  );
}
