'use client';

import { useState } from "react";

type SidebarProps = {
  onSearch: (query: string) => void;
  onFilter: (tag: string) => void;
  tags: string[];
  selectedTag: string;
};

export default function Sidebar({ onSearch, onFilter, tags, selectedTag }: SidebarProps) {
  const [searchValue, setSearchValue] = useState("");

  // PUBLIC_INTERFACE
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <aside className="w-full sm:w-56 max-w-xs sm:flex-shrink-0 sm:h-[calc(100vh-64px)] bg-[#f8f9fa] border-r border-gray-200 p-4">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          className="w-full px-3 py-2 border rounded shadow-inner focus:outline-primary"
          placeholder="Search images..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </form>
      <div>
        <span className="block font-semibold mb-2">Tags</span>
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              className={`px-3 py-1 rounded border ${
                selectedTag === '' ? 'bg-accent text-white' : 'bg-gray-100'
              }`}
              onClick={() => onFilter('')}
              type="button"
            >
              All
            </button>
          </li>
          {tags.map(tag => (
            <li key={tag}>
              <button
                className={`px-3 py-1 rounded border ${
                  selectedTag === tag ? 'bg-accent text-white' : 'bg-gray-100'
                }`}
                onClick={() => onFilter(tag)}
                type="button"
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
