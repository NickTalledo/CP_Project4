import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/photos";

const App = () => {
  const [data, setData] = useState([]);
  const [banList, setBanList] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchData();
  };

  const handleAddToBanList = (attribute) => {
    setBanList([...banList, attribute]);
  };

  const handleAddToViewedItems = (item) => {
    setViewedItems([item, ...viewedItems]);
  };

  const filteredData = data.filter(
    (item) =>
      !banList.includes(item.id) &&
      !banList.includes(item.title) &&
      !viewedItems.includes(item)
  );

  const randomItem =
    filteredData[Math.floor(Math.random() * filteredData.length)];

  return (
    <div className="App">
      <button onClick={handleFetchClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>
      {randomItem && (
        <div>
          <h2>Random Item</h2>
          <img src={randomItem.url} alt={randomItem.title} />
          <p>ID: {randomItem.id}</p>
          <p>Title: {randomItem.title}</p>
          <button onClick={() => handleAddToBanList(randomItem.id)}>
            Ban by ID
          </button>
          <button onClick={() => handleAddToBanList(randomItem.title)}>
            Ban by Title
          </button>
          <button onClick={() => handleAddToViewedItems(randomItem)}>
            Add to Viewed Items
          </button>
        </div>
      )}
      <h2>Viewed Items History</h2>
      <ul>
        {viewedItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
