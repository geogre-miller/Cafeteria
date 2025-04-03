import React, { useState } from "react";
import { cafeData } from "../../lib/constant";
import { Search } from "lucide-react"; // Icon từ Lucide

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // Lọc dữ liệu theo tên quán cafe hoặc địa chỉ
    const filteredResults = cafeData.filter((cafe) =>
      cafe.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="relative w-100 items-center">
      {/* Ô nhập liệu */}
      <div className="relative">
        <input
          type="text"
          placeholder="Ăn gì hôm nay?"
          value={query}
          onChange={handleSearch}
          className="w-full h-9 pl-10 pr-4 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all outline-none"
        />
        {/* Icon tìm kiếm */}
        <Search className="absolute left-3 top-1.5 w-6 h-6 text-gray-400" />
      </div>

      {/* Kết quả tìm kiếm */}
      {results.length > 0 && (
        <ul className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {results.map((cafe) => (
            <li
              key={cafe.id}
              className="p-3 hover:bg-gray-100 cursor-pointer transition-all"
              onClick={() => alert(`Bạn đã chọn: ${cafe.name}`)}
            >
              {cafe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
