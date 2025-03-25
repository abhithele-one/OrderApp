"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import data from "../../public/data.json";
import { jsPDF } from "jspdf";
import { Suspense } from "react";

interface Item {
  id: number;
  name: string;
  count: number;
}

function SelectedItemsContent() {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");

  const selectedItemsData = itemsParam ? JSON.parse(itemsParam) : [];

  const selectedItems: Item[] = selectedItemsData.map(
    (item: { id: number; count: number }) => ({
      ...data.find((d) => d.id === item.id),
      count: item.count,
    })
  );

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const handleDownload = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Laxmi Ice Cream & Dry Fruit Corner", 20, 20);
    doc.text(`Date: ${formattedDate}`, 20, 30);

    doc.setFontSize(12);
    doc.text("Order List", 20, 40);
    selectedItems.forEach((item: Item, index: number) => {
      const y = 50 + index * 10;
      doc.text(`${index + 1}. ${item.name} - ${item.count} Nos`, 20, y);
    });

    doc.save("order.pdf");
  };

  return (
    <div className="h-full min-h-screen p-4 bg-white">
      <h1 className="text-lg font-bold text-black text-center">
        Laxmi Ice Cream & Dry Fruit Corner
      </h1>
      <h1 className="text-md font-bold text-black text-center">
        Date : {formattedDate}
      </h1>
      <div className="w-full mx-auto">
        {selectedItems.length === 0 ? (
          <p className="text-center text-gray-600">No items selected</p>
        ) : (
          <ul className="bg-white p-4 space-y-1">
            {selectedItems.map((item, index) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-black px-3"
              >
                <span>({index + 1}) {item.name}</span>
                <span>{item.count} Nos</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="/">
            <button className="px-4 py-1 bg-gray-200 text-black rounded hover:bg-gray-300">
              Back to List
            </button>
          </Link>
          <button
            onClick={handleDownload}
            className="px-4 py-1 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Download Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SelectedItems() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectedItemsContent />
    </Suspense>
  );
}
