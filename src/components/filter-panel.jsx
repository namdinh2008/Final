"use client"
import * as React from "react"
import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  jobCategories,
  experienceLevels,
  jobTypes,
  locationTypes,
} from "@/lib/data"

export default function FilterPanel({ onFilter, onSort, activeFilters, activeSort }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState(activeFilters)
  const [sortBy, setSortBy] = useState(activeSort)
  const [location, setLocation] = useState(activeFilters.location || "")

  const handleApplyFilters = () => {
    onFilter(filters)
    onSort(sortBy)
    setIsOpen(false)
  }

  const handleClearFilters = () => {
    setFilters({})
    setSortBy("relevance")
    setLocation("")
  }

  const updateFilters = (key, value) => {
    if (filters[key] === value) {
      const newFilters = { ...filters }
      delete newFilters[key]
      setFilters(newFilters)
    } else {
      setFilters({ ...filters, [key]: value })
    }
  }

  const updateLocation = (value) => {
    setLocation(value)
    if (value) {
      setFilters({ ...filters, location: value })
    } else {
      const newFilters = { ...filters }
      delete newFilters.location
      setFilters(newFilters)
    }
  }

  const getActiveFiltersCount = () => {
    return Object.keys(activeFilters).length + (activeSort !== "relevance" ? 1 : 0)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto max-h-screen">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <Accordion type="multiple" defaultValue={["sort", "category", "experience", "type", "location"]}>
                  <AccordionItem value="sort">
                    <AccordionTrigger>Sort By</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value)}
                      >
                        <div className="flex items-center space-x-2 py-2">
                          <RadioGroupItem value="date" id="sort-date" />
                          <Label htmlFor="sort-date">Date Posted (Newest first)</Label>
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                          <RadioGroupItem value="salary" id="sort-salary" />
                          <Label htmlFor="sort-salary">Salary (High to Low)</Label>
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                          <RadioGroupItem value="relevance" id="sort-relevance" />
                          <Label htmlFor="sort-relevance">Relevance</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="category">
                    <AccordionTrigger>Job Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {jobCategories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2 py-1">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={filters.category === category.id}
                              onCheckedChange={() => updateFilters("category", category.id)}
                            />
                            <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="experience">
                    <AccordionTrigger>Experience Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {experienceLevels.map((level) => (
                          <div key={level.id} className="flex items-center space-x-2 py-1">
                            <Checkbox
                              id={`level-${level.id}`}
                              checked={filters.experienceLevel === level.id}
                              onCheckedChange={() => updateFilters("experienceLevel", level.id)}
                            />
                            <Label htmlFor={`level-${level.id}`}>{level.name}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="type">
                    <AccordionTrigger>Job Type</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {jobTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2 py-1">
                            <Checkbox
                              id={`type-${type.id}`}
                              checked={filters.jobType === type.id}
                              onCheckedChange={() => updateFilters("jobType", type.id)}
                            />
                            <Label htmlFor={`type-${type.id}`}>{type.name}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="location">
                    <AccordionTrigger>Location</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="location-input">City/Region</Label>
                          <Input
                            id="location-input"
                            placeholder="e.g., New York, San Francisco"
                            value={location}
                            onChange={(e) => updateLocation(e.target.value)}
                            className="mt-2 ml-1 w-11/12"
                          />
                        </div>
                        <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Work Type</p>
                          {locationTypes.map((type) => (
                            <div key={type.id} className="flex items-center space-x-2 py-1">
                              <Checkbox
                                id={`location-type-${type.id}`}
                                checked={filters.locationType === type.id}
                                onCheckedChange={() => updateFilters("locationType", type.id)}
                              />
                              <Label htmlFor={`location-type-${type.id}`}>{type.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All
                </Button>
                <Button onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>

          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeSort !== "relevance" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Sort: {activeSort === "date" ? "Newest" : activeSort === "salary" ? "Highest Salary" : "Relevance"}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      onSort("relevance")
                      setSortBy("relevance")
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove sort</span>
                  </Button>
                </Badge>
              )}

              {activeFilters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {jobCategories.find((c) => c.id === activeFilters.category)?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      const newFilters = { ...activeFilters }
                      delete newFilters.category
                      onFilter(newFilters)
                      setFilters(newFilters)
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove category filter</span>
                  </Button>
                </Badge>
              )}

              {activeFilters.experienceLevel && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {experienceLevels.find((e) => e.id === activeFilters.experienceLevel)?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      const newFilters = { ...activeFilters }
                      delete newFilters.experienceLevel
                      onFilter(newFilters)
                      setFilters(newFilters)
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove experience filter</span>
                  </Button>
                </Badge>
              )}

              {activeFilters.jobType && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {jobTypes.find((t) => t.id === activeFilters.jobType)?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      const newFilters = { ...activeFilters }
                      delete newFilters.jobType
                      onFilter(newFilters)
                      setFilters(newFilters)
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove job type filter</span>
                  </Button>
                </Badge>
              )}

              {activeFilters.locationType && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {locationTypes.find((l) => l.id === activeFilters.locationType)?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      const newFilters = { ...activeFilters }
                      delete newFilters.locationType
                      onFilter(newFilters)
                      setFilters(newFilters)
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove location type filter</span>
                  </Button>
                </Badge>
              )}

              {activeFilters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Location: {activeFilters.location}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      const newFilters = { ...activeFilters }
                      delete newFilters.location
                      onFilter(newFilters)
                      setFilters(newFilters)
                      setLocation("")
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove location filter</span>
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
