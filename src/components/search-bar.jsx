"use client";

import { useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Form.Control
          type="text"
          placeholder="Search jobs, companies, or job IDs..."
          value={query}
          onChange={handleChange}
          className="mb-3 pl-4 pr-4"
          style={{
            border: "1px solid #ced4da",
          }}
        />
      </div>
    </div>
  );
}
