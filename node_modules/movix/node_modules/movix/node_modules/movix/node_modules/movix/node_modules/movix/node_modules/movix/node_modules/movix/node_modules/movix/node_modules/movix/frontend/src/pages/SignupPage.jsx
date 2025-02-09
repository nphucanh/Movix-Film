import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import toast,{ Toaster } from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [errors, setErrors] = useState({});

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signup({ email, username, password });
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes("Email already exists")) {
        setErrors({ ...errors, email: "This email is already registered. Please use a different email or try logging in." });
      } else if (errorMessage.includes("Username already exists")) {
        setErrors({ ...errors, username: "This username is already taken. Please choose a different username." });
      } else if (errorMessage.includes("Invalid email")) {
        setErrors({ ...errors, email: "Please enter a valid email address." });
      } else if (errorMessage.includes("Password must be at least 6 characters")) {
        setErrors({ ...errors, password: "Password must be at least 6 characters long." });
      } else {
        setErrors({ ...errors, general: errorMessage });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col hero-bg">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="relative top-0 left-0 right-0 bg-opacity-90 shadow-lg z-10 ">
        <div className="container mx-auto p-4 flex items-center">
          <div className="ml-24">
            <Link to="/" className="mr-auto">
              <img
                src="/movix-logo.png"
                alt="logo"
                width={120}
                height={40}
                className="w-auto h-14"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              Sign Up
            </h1>
            
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="you@example.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                    required
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
              <button
                className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md
							hover:bg-yellow-600
						"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Loading..." : "Sign Up"}
              </button>
            </form>
            
            <div className="text-center text-gray-400">
              Already a member?{" "}
              <Link to={"/login"} className="text-yellow-500 hover:underline">
                Login
              </Link>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
