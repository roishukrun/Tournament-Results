import { useState, useEffect } from "react";
import Header from "./Header";
import ResultsTable from "./ResultsTable";

function App() {
  const [suspects, setSuspects] = useState([]);

  /* Call suspects players API and save the data which will later on will be used by the table. */
  useEffect(() => {
    fetch("/api/v1/players/suspects")
      .then((response) => response.json())
      .then((json) => {
        setSuspects(JSON.parse(json["body"]));
      });
  }, []);

  function playerIsSuspected(id) {
    return suspects.find((playerId) => playerId === id);
  }

  return (
    <div>
      <Header />
      <ResultsTable suspects={suspects} playerIsSuspected={playerIsSuspected} />
    </div>
  );
}

export default App;
