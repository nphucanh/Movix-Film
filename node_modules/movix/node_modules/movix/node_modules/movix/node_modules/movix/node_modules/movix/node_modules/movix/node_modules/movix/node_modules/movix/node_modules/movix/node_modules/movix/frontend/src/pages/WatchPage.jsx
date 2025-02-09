import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight, Film, Play } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeleton/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto my-8"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance text-yellow-300">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
            <div className='flex mt-8'>
						<Link
							to={``}
							className='bg-yellow-500 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center'
						>
							<Play className='size-6 mr-2 fill-black' />
							Play
						</Link>						
					</div>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* movie trailers */}
        <div className="mt-12 max-w-6xl mx-auto relative">
          <p className="text-4xl font-bold mb-4"> Trailers </p>

          <div className="aspect-video p-2 sm:px-10 md:px-32">
            {trailers.length > 0 && (
              <>
                <ReactPlayer
                  controls={true}
                  width="100%"
                height="100%"
                  className="mx-auto overflow-hidden rounded-lg hover:cursor-auto"
                  url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                />
              </>
            )}
            {trailers?.length === 0 && (
              <div className="flex justify-center items-center h-[600px] w-full bg-gray-500/25 rounded-lg mt-28">
                <h2 className="sm:text-3xl md:text-5xl text-center ">
                  No trailers available for{" "}
                  <span className="font-bold text-yellow-500">
                    {content?.title || content?.name}
                  </span>{" "}
                  😥
                </h2>
              </div>
            )}
          </div>
          {trailers.length > 0 ? (
          <div className="w-full bg-zinc-900 py-4 sm:px-6 md:px-24 mb-4 rounded-md overflow-x-auto my-6">
            <div className="flex flex-row items-center px-2">
            <Film className="size-7 pb-2 fill-yellow-800" />
            <p className="pb-2 underline text-lg sm:text-sm md:text-lg ">Episode List </p>  
            </div>
            <div className='h-0.5 w-full bg-[#232323]' aria-hidden='true' />
            
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 py-3 px-2">
              {trailers.map((trailer, index) => (
                <button
                  key={trailer.key}
                  onClick={() => setCurrentTrailerIdx(index)}
                  className={`py-2 md:px-3 md:py-3 rounded transition-colors text-sm sm:text-base  ${
                    currentTrailerIdx === index
                      ? "bg-yellow-500 text-black font-semibold"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  Trailer {index + 1}
                  {index === trailers.length - 1}
                </button>
              ))}
            </div>
          </div>
          ) : null}
        </div>
        

        {similarContent.length > 0 && (
          <div className="mt-8 md:mt-12 max-w-6xl mx-auto relative pb-8 md:pb-12">
            <h3 className="text-4xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group "
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 size-12
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-yellow-500/80 text-white rounded-full p-2 border border-yellow-300/60"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 size-12 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-yellow-500 
								text-white rounded-full p-2 border border-yellow-300/60"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WatchPage;
