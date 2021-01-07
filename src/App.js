import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const API_URL = "http://localhost:5000/api";
  const [apiResponse, setApiResponse] = useState([]);
  const [placeName, setPlaceName] = useState("");
  useEffect(() => {
    fetch(API_URL + "/Places")
      .then((response) => response.json())
      .then(setApiResponse)
      .catch((error) => console.log("GET /Places failed: " + error));
  }, []);

  function addPlace() {
    fetch(API_URL + "/Places", {
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: placeName,
        tags: "",
        isOpen: false,
      }),
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => console.log("POST /Places success!"))
      .catch((error) => console.log("POST /Places failed: " + error));
  }

  return (
    <div className="App">
      <header className="App-header">
        There are {apiResponse.length} Places in the database.
      </header>
      <div>
        {apiResponse.map((item, index) => (
          <p key={item.id}>
            {index + 1}. {item.name} : Şu an {item.isOpen ? "açık" : "kapalı"}.
          </p>
        ))}
      </div>
      <div>
        <form onSubmit={addPlace}>
          <label>Mekan adı:</label>
          <input
            type="text"
            name="placeName"
            onChange={(e) => setPlaceName(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
