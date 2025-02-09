import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
        <p className="text-white text-lg font-semibold">Are you sure?</p>
        <p className="text-gray-300 text-sm mt-2">Do you want to delete this item?</p>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/search/history`, {
          signal: controller.signal,
        });
        setSearchHistory(res.data.content);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSearchHistory([]);
        }
      }
    };

    getSearchHistory();
    return () => controller.abort();
  }, []);

  const handleDeleteClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedEntry) return;
    try {
      await axios.delete(`/api/search/history/${selectedEntry.id}`);
      setSearchHistory((prev) => prev.filter((item) => item.id !== selectedEntry.id));
      toast.success("Deleted successfully!", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to delete search item", { position: "top-center" });
    } finally {
      setIsModalOpen(false);
      setSelectedEntry(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">
          History
        </h1>

        {searchHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchHistory.map((entry) => (
              <div key={entry.id} className="bg-gray-800 p-4 rounded flex items-start">
                <img
                  src={`${SMALL_IMG_BASE_URL}${entry.image}`}
                  alt="History image"
                  className="size-16 rounded-full object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">{entry.title}</span>
                  <span className="text-gray-400 text-sm">
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(
                      new Date(entry.createdAt)
                    )}
                  </span>
                </div>

                <span
                  className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                    entry.searchType === "movie"
                      ? "bg-yellow-600"
                      : entry.searchType === "tv"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
                </span>

                <Trash className="size-5 ml-4 cursor-pointer hover:text-red-600" onClick={() => handleDeleteClick(entry)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal isOpen={isModalOpen} onConfirm={confirmDelete} onCancel={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SearchHistoryPage;
