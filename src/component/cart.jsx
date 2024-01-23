import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [name, setName] = useState("");
  const [elements, setElements] = useState({ name: "", price: "" });

  useEffect(() => {
    const info = async () => {
      try {
        const ele = await axios.get("/api");
        setElements(ele.data);
      } catch {}
    };
    info();
  });

  const handleSubmit = async () => {
    try {
      await axios.post("/api", { name });
    } catch {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api");
    } catch {}
  };

  return (
    <div>
      <h1>{elements.name}</h1>
      <p>{elements.price}</p>
      <input
        type="text"
        data-testid="inputs"
        placeholder="product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button data-testid="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <button data-testid="trash-icon" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Cart;