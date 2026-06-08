"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Truck,
  Zap,
  Star,
  Map as MapIcon,
  List,
  ChevronRight,
} from "lucide-react";

const mockLocations = [
  {
    id: "pier-14",
    name: "Pier 14 Water Terminal",
    category: "Waterfront",
    price: 180,
    occupancy: 92,
    capacity: "Up to 32ft truck",
    power: "50A Grid Connection",
    rating: 4.9,
    reviewsCount: 38,
    coords: { x: 250, y: 180 },
    description:
      "Flanked by beautiful waterfront paths and skyscraper office exits. Extremely heavy evening traffic.",
    features: ["Water hookup", "Trash valet", "Overnight parking"],
  },
  {
    id: "soma-plaza",
    name: "Soma Plaza Courtyard",
    category: "Office Hubs",
    price: 220,
    occupancy: 85,
    capacity: "Up to 28ft truck",
    power: "30A Grid Connection",
    rating: 4.8,
    reviewsCount: 47,
    coords: { x: 580, y: 220 },
    description:
      "Located in the heart of tech offices. Premium lunch spot with quick rushes.",
    features: ["WiFi access", "Dining tables", "Security patrol"],
  },
  {
    id: "mission-park",
    name: "Mission Park Meadow",
    category: "Parks",
    price: 110,
    occupancy: 64,
    capacity: "Up to 40ft truck",
    power: "Generator Only",
    rating: 4.6,
    reviewsCount: 22,
    coords: { x: 380, y: 480 },
    description:
      "Scenic neighborhood park. Heavy weekend family traffic and dining events.",
    features: ["Pet friendly", "Restrooms nearby", "Spacious bays"],
  },
  {
    id: "broadway-plaza",
    name: "Broadway Food Plaza",
    category: "Downtown",
    price: 195,
    occupancy: 78,
    capacity: "Up to 35ft truck",
    power: "50A Grid Connection",
    rating: 4.7,
    reviewsCount: 54,
    coords: { x: 650, y: 390 },
    description:
      "Broadway retail corridor. High student and theatre crowd foot traffic late into the evening.",
    features: ["Electrical supply", "Trash valet", "Lighting"],
  },
  {
    id: "sunset-beach",
    name: "Sunset Beach Promenade",
    category: "Waterfront",
    price: 140,
    occupancy: 50,
    capacity: "Up to 30ft truck",
    power: "30A Grid Connection",
    rating: 4.5,
    reviewsCount: 19,
    coords: { x: 180, y: 620 },
    description:
      "Beachfront view. High summer tourist volume, perfect for weekend brunch or dessert options.",
    features: ["Beach access", "Water hookup", "Restrooms"],
  },
  {
    id: "tech-parkway",
    name: "Tech Hub Parkway",
    category: "Office Hubs",
    price: 175,
    occupancy: 70,
    capacity: "Up to 25ft truck",
    power: "30A Grid Connection",
    rating: 4.6,
    reviewsCount: 31,
    coords: { x: 720, y: 150 },
    description:
      "Corporate campus green space. Steady lunchtime volume Tuesday to Thursday.",
    features: ["WiFi access", "Trash valet", "Tables"],
  },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredLocationId, setHoveredLocationId] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // Mobile toggling
  const [maxPrice, setMaxPrice] = useState(250);
  const [sortBy, setSortBy] = useState("recommended");

  const categories = ["All", "Downtown", "Waterfront", "Parks", "Office Hubs"];

  // Filter and Sort locations
  const filteredLocations = useMemo(() => {
    return mockLocations
      .filter((loc) => {
        const matchesSearch =
          loc.name.toLowerCase().includes(search.toLowerCase()) ||
          loc.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || loc.category === selectedCategory;
        const matchesPrice = loc.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.occupancy - a.occupancy; // Default Recommended (by occupancy rate)
      });
  }, [search, selectedCategory, maxPrice, sortBy]);

  // Selected details popup card for map
  const activeDetailSpot = useMemo(() => {
    const activeId = selectedLocationId || hoveredLocationId;
    return mockLocations.find((loc) => loc.id === activeId) || null;
  }, [selectedLocationId, hoveredLocationId]);

  return (
    <div className="pt-24 flex flex-col h-screen overflow-hidden bg-brand-warm-white">
      {/* Search and Category Filtering Sub-bar */}
      <div className="bg-brand-cream/60 border-b border-brand-navy/5 px-4 sm:px-6 py-4 relative z-10 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories list */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-brand-navy border-brand-navy text-brand-warm-white"
                    : "bg-white border-brand-navy/5 hover:border-brand-navy/15 text-brand-slate"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Inputs & Sort */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search coordinates..."
                className="w-full text-xs bg-white border border-brand-navy/5 rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-white border border-brand-navy/5 rounded-full px-4 py-2.5 focus:outline-none focus:border-brand-teal text-brand-slate font-semibold"
            >
              <option value="recommended">Sort: Occupancy</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: Highest</option>
            </select>

            {/* Mobile Map/List Toggle */}
            <button
              onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
              className="md:hidden p-2.5 rounded-full bg-brand-navy text-brand-warm-white flex items-center justify-center shrink-0"
            >
              {viewMode === "list" ? (
                <MapIcon className="w-4 h-4" />
              ) : (
                <List className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Screen Area */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* Left Hand side: Cards Catalog */}
        <div
          className={`w-full md:w-[500px] xl:w-[600px] flex-col overflow-y-auto px-4 sm:px-6 py-6 space-y-6 shrink-0 border-r border-brand-navy/5 bg-brand-warm-white transition-all ${
            viewMode === "map" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Subheading */}
          <div className="flex items-center justify-between pb-2 border-b border-brand-navy/5">
            <span className="text-xs font-bold text-brand-slate uppercase font-mono">
              Available Locations ({filteredLocations.length})
            </span>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-brand-slate font-medium">
                Max Daily Rate:
              </span>
              <span className="font-extrabold text-brand-navy font-mono">
                ${maxPrice}
              </span>
              <input
                type="range"
                min="100"
                max="250"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-brand-teal"
              />
            </div>
          </div>

          {/* Cards Loop */}
          {filteredLocations.length > 0 ? (
            <div className="space-y-4">
              {filteredLocations.map((loc) => {
                const isHovered = hoveredLocationId === loc.id;
                const isSelected = selectedLocationId === loc.id;
                return (
                  <div
                    key={loc.id}
                    onMouseEnter={() => setHoveredLocationId(loc.id)}
                    onMouseLeave={() => setHoveredLocationId(null)}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`group rounded-2xl bg-white border p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "border-brand-teal ring-2 ring-brand-teal/15 shadow-md"
                        : isHovered
                          ? "border-brand-navy/15 shadow-lg transform hover:-translate-y-0.5"
                          : "border-brand-navy/5 shadow-sm"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-cream border border-brand-navy/5 text-brand-slate mb-1">
                            {loc.category}
                          </span>
                          <h3 className="text-base font-extrabold text-brand-navy leading-tight">
                            {loc.name}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1 text-xs shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-brand-navy">
                            {loc.rating}
                          </span>
                          <span className="text-[10px] text-brand-slate font-medium">
                            ({loc.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-brand-slate font-medium leading-relaxed">
                        {loc.description}
                      </p>

                      {/* Details Badge grid */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <div className="flex items-center space-x-1 bg-brand-cream/50 px-2.5 py-1 rounded-full text-[10px] font-semibold text-brand-navy">
                          <Truck className="w-3 h-3 text-brand-teal" />
                          <span>{loc.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-brand-cream/50 px-2.5 py-1 rounded-full text-[10px] font-semibold text-brand-navy">
                          <Zap className="w-3 h-3 text-brand-teal" />
                          <span>{loc.power}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between border-t border-brand-navy/5 mt-5 pt-3.5 bg-white">
                      <div>
                        <span className="block text-[8px] font-bold text-brand-slate uppercase">
                          DAILY RATE
                        </span>
                        <span className="text-sm font-extrabold text-brand-navy font-mono">
                          ${loc.price}
                          <span className="text-[10px] font-normal text-brand-slate">
                            /day
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/marketplace/${loc.id}`}
                          className="px-4 py-2 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 hover:bg-brand-cream/40 text-[10px] font-bold text-brand-navy transition-all"
                        >
                          View Metrics
                        </Link>
                        <Link
                          href={`/reserve/${loc.id}`}
                          className="px-4 py-2 rounded-full bg-brand-navy group-hover:bg-brand-teal text-brand-warm-white text-[10px] font-bold transition-colors flex items-center space-x-1 shadow-sm"
                        >
                          <span>Reserve Spot</span>
                          <ChevronRight className="w-3.5 h-3.5 text-brand-teal" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-brand-slate text-xs space-y-2">
              <span className="block font-bold">
                No available spots matched filters.
              </span>
              <span>
                Try increasing the price slider or checking another category.
              </span>
            </div>
          )}
        </div>

        {/* Right Hand side: Interactive 60fps Vector map */}
        <div
          className={`flex-grow h-full bg-brand-cream/35 relative overflow-hidden flex items-center justify-center p-4 md:p-8 ${
            viewMode === "list" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Map canvas */}
          <div className="w-full h-full max-w-4xl max-h-[750px] relative rounded-3xl overflow-hidden border border-brand-navy/5 bg-brand-cream/65 shadow-inner flex items-center justify-center">
            {/* SVG Background map Grid */}
            <svg
              viewBox="0 0 1000 800"
              className="w-full h-full text-brand-cream-dark opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              {/* Grid Roads */}
              <path
                d="M200,0 L200,800"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />
              <path
                d="M400,0 L400,800"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />
              <path
                d="M600,0 L600,800"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />
              <path
                d="M800,0 L800,800"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />
              <path
                d="M0,200 L1000,200"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />
              <path
                d="M0,400 L1000,400"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />
              <path
                d="M0,600 L1000,600"
                strokeDasharray="6 6"
                className="text-brand-slate/15"
              />

              {/* Waterway Shoreline */}
              <path
                d="M-50,600 C300,580 500,200 1100,150"
                stroke="#E0F2FE"
                strokeWidth="70"
                strokeLinecap="round"
              />

              {/* Central Park block */}
              <rect
                x="250"
                y="250"
                width="300"
                height="200"
                rx="16"
                fill="#F0FDF4"
                stroke="#DCFCE7"
                strokeWidth="1"
              />
            </svg>

            {/* Pins Loop */}
            {filteredLocations.map((loc) => {
              const isHovered = hoveredLocationId === loc.id;
              const isSelected = selectedLocationId === loc.id;
              const isActive = isHovered || isSelected;

              return (
                <div
                  key={loc.id}
                  style={{
                    position: "absolute",
                    top: `${loc.coords.y / 8}%`,
                    left: `${loc.coords.x / 10}%`,
                  }}
                  onMouseEnter={() => setHoveredLocationId(loc.id)}
                  onMouseLeave={() => setHoveredLocationId(null)}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className="cursor-pointer -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <span
                    className={`absolute inline-flex h-12 w-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 -top-1/2 -left-1/2 transition-colors ${
                      isActive
                        ? "bg-brand-teal/25 pulse-ring"
                        : "bg-transparent"
                    }`}
                  ></span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform duration-300 relative ${
                      isActive
                        ? "bg-brand-teal border-white scale-125 text-white"
                        : "bg-brand-navy border-brand-warm-white text-brand-teal"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>
              );
            })}

            {/* Dynamic Glass Details Popup Panel */}
            <AnimatePresence>
              {activeDetailSpot && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel shadow-2xl border border-brand-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center shrink-0">
                      <Truck className="w-6 h-6 text-brand-teal" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-extrabold text-brand-navy">
                          {activeDetailSpot.name}
                        </h4>
                        <span className="text-[10px] font-bold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full shrink-0">
                          {activeDetailSpot.occupancy}% Occupied
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-slate font-medium mt-1 leading-relaxed">
                        {activeDetailSpot.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-navy/5">
                    <div>
                      <span className="block text-[8px] text-brand-slate font-bold uppercase sm:text-right">
                        DAILY RATE
                      </span>
                      <span className="text-sm font-extrabold text-brand-navy font-mono">
                        ${activeDetailSpot.price}
                      </span>
                    </div>
                    <div className="flex space-x-2 w-full justify-end">
                      <Link
                        href={`/marketplace/${activeDetailSpot.id}`}
                        className="px-3.5 py-1.5 rounded-full border border-brand-navy/10 bg-white hover:bg-brand-cream/50 text-[10px] font-bold text-brand-navy text-center transition-all"
                      >
                        View Stats
                      </Link>
                      <Link
                        href={`/reserve/${activeDetailSpot.id}`}
                        className="px-3.5 py-1.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-[10px] font-bold text-center transition-all"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
