import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search, CirclePlay } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Toaster/>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded font-bold ${
              activeTab === "movie" ? "bg-yellow-500" : "bg-gray-800"
            } hover:bg-yellow-600`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded font-bold ${
              activeTab === "tv" ? "bg-yellow-500" : "bg-gray-800"
            } hover:bg-yellow-600`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded font-bold ${
              activeTab === "person" ? "bg-yellow-500" : "bg-gray-800"
            } hover:bg-yellow-600`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-transparent p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full aspect-[2/3] overflow-hidden group rounded-md">
                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                        alt={result.name}
                         className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 text-xs font-semibold bg-orange-600 text-white rounded">
                          HD
                        </span>
                      </div>
                    </div>
                    <div className="p-4 w-full bg-gradient-to-t from-black to-transparent">
                      <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                    className="block relative w-full aspect-[2/3] overflow-hidden group rounded-md"
                  >

                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                        alt={result.title || result.name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <CirclePlay className="size-10 text-yellow-500" />
                    </div>
                      <div className="absolute top-2 left-2 flex gap-2">
                        <span className="px-2 py-1 text-xs font-semibold bg-orange-500 text-white rounded">
                          HD
                        </span>
                      </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
                      <h2 className="mt-2 text-xl font-bold">
                        {result.title || result.name}
                      </h2>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
