"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Form } from "react-bootstrap"

export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Form.Control
          type="text"
          placeholder="Search jobs, companies, or job IDs..."
          defaultValue={initialQuery}
          onChange={handleChange}
          className="mb-3 pl-10 pr-4"
        />
      </div>
    </div>
  )
}


