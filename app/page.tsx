"use client";

import { useState } from "react";
import Link from "next/link";
import data from "../public/data.json";

export default function Home() {
  const [items, setItems] = useState(data);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateCount = (id: number, increment: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              count: Math.max(0, item.count + (increment ? 1 : -1)),
            }
          : item
      )
    );
  };

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const query = {
    items: JSON.stringify(
      selectedItems.map((item) => ({
        id: item.id,
        count: item.count,
      }))
    ),
  };

  return (
    <div className="h-full p-4 bg-white text-black">
      <h1 className="text-lg font-bold text-center">Dinshaw's Order List</h1>
      <div className="max-w-3xl mx-auto">
        <table className="w-full bg-white overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-center">Select</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-center">Count</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-1 flex justify-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="h-4 w-4 text-gray-500 rounded text-center"
                  />
                </td>
                <td className="p-3 text-left">{item.name}</td>
                <td className="py-3 px-1">
                  {selectedIds.includes(item.id) ? (
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => updateCount(item.id, false)}
                        className="w-7 h-7 bg-gray-200 text-black rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.count}</span>
                      <button
                        onClick={() => updateCount(item.id, true)}
                        className="w-7 h-7 bg-gray-200 text-black rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        disabled
                        onClick={() => updateCount(item.id, false)}
                        className="w-7 h-7 bg-gray-200 text-black rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">0</span>
                      <button
                        disabled
                        onClick={() => updateCount(item.id, true)}
                        className="w-7 h-7 bg-gray-200 text-black rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href={{ pathname: "/selected", query }}>
          <div className="flex justify-center">
            <button
              className="mt-4 px-4 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:text-gray-500"
              disabled={selectedIds.length === 0}
            >
              Create Order ({selectedIds.length})
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
