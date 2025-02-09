import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  LogOut,
  ChevronDown,
  MessageCircleQuestion,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  return (
    <header className="relative max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 z-10">
      {/* Mobile layout */}
      <div className="flex items-center justify-between w-full sm:hidden">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center flex-row">
              <img
                src={user.image}
                alt="Avatar"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span>{user.username}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="mt-2 bg-black/70 text-white border border-gray-400 w-52"
            >
              <DropdownMenuLabel className="flex flex-row items-center gap-2 text-yellow-400">
                <span>{user.username}</span>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="size-4 mr-2" />
                Manage Profiles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MessageCircleQuestion className="size-4 mr-2" />
                <span>Help Center</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="size-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          to={"/"}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img src="/movix-logo.png" alt="Movix Logo" className="w-32" />
        </Link>

        <div className="flex items-center">
          <Link to={"/search"} className="mr-4">
            <Search className="size-6 cursor-pointer" />
          </Link>
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <div className="flex items-center gap-10 z-50">
          <Link to="/">
            <img src="/movix-logo.png" alt="Movix Logo" className="w-40" />
          </Link>
        </div>

        <nav className="flex flex-grow justify-start items-center ml-10">
          <div className="flex gap-8 items-center">
            <div className="relative group">
              <Link
                className=" text-lg p-2 hover:bg-gray-500/25 hover:rounded-lg hover:p-2 hover:text-yellow-500"
                onClick={() => setContentType("movie")}
                to={"/"}
              >
                Movies
              </Link>
              <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-black/75 shadow-lg rounded-lg z-10">
                <ul className="w-40 h-auto p-2">
                  <li>
                    <Link
                      to="genre/movies/action"
                      className="block px-4 py-2 hover:bg-gray-600/30 hover:rounded-lg hover:text-yellow-500"
                    >
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="genre/movies/drama"
                      className="block px-4 py-2 hover:bg-gray-600/30 hover:rounded-lg hover:text-yellow-500"
                    >
                      Drama
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="genre/movies/comedy"
                      className="block px-4 py-2 hover:bg-gray-600/30 hover:rounded-lg hover:text-yellow-500"
                    >
                      Comedy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative group">
              <Link
                className=" text-lg p-2 hover:bg-gray-500/25 hover:rounded-lg hover:p-2 hover:text-yellow-500"
                onClick={() => setContentType("tv")}
                to={"/"}
              >
                Tv Shows
              </Link>
              <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-black/75 shadow-lg rounded-lg z-10">
                <ul className="w-40 h-auto p-2">
                  <li>
                    <Link
                      to="/genre/tv/comedy"
                      className="block px-4 py-2 hover:bg-gray-600/30 hover:rounded-lg hover:text-yellow-500"
                    >
                      Comedy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/genre/tv/documentary"
                      className="block px-4 py-2 hover:bg-gray-600/30 hover:rounded-lg hover:text-yellow-500"
                    >
                      Documentary
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/genre/tv/reality"
                      className="block px-4 py-2 hover:bg-gray-600/30 hover:rounded-lg hover:text-yellow-500"
                    >
                      Reality
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              to="/history"
              className=" text-lg p-2 hover:bg-gray-500/25 hover:rounded-lg hover:p-2 hover:text-yellow-500"
            >
              History
            </Link>
          </div>
        </nav>

        <div className="flex gap-8 items-center z-50">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer" />
          </Link>
          <div className="flex flex-row items-center gap-2">
            <img
              src={user.image}
              alt="Avatar"
              className="h-8 rounded cursor-pointer"
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="mt-4 bg-black/70 text-white border border-gray-400 w-40"
              >
                <DropdownMenuLabel className="flex flex-row items-center gap-2 text-yellow-400">
                  <img
                    src={user.image}
                    alt="Avatar"
                    className="h-8 rounded cursor-pointer"
                  />
                  <span className="ml-2">{user.username}</span>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="size-8 mr-2" />
                  <Link to={`/profile`}>Manage Profiles</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MessageCircleQuestion className="size-8 mr-2" />
                  <Link to={`/help-center`}>Help Center</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-8 mr-2" />
                  <Link to={`/settings`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="size-6 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full sm:hidden px-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
