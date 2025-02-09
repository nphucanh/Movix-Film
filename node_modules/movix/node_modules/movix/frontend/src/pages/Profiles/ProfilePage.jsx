"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        image: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    if (formData.password) {
      data.append("password", formData.password);
    }
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.put("/api/profile/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = response.data.user;
      setUser(updatedUser);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      console.error("Error during update:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-8 flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Card className="bg-black/70 text-white border border-yellow-500 w-full max-w-5xl">
          <CardHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative inline-block">
                <img
                  src={user.image || "/placeholder.svg"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <Label>First Name</Label>
                  <div className="font-medium text-lg">{user.firstname}</div>
                </div>
                <div>
                  <Label>Last Name</Label>
                  <div className="font-medium text-lg">{user.lastname}</div>
                </div>
                <div>
                  <Label>Username</Label>
                  <div className="font-medium text-lg">{user.username}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="font-medium text-lg">{user.email}</div>
                </div>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg py-6 px-8">
                    
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 text-white border border-yellow-500">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div>
                      <Label htmlFor="firstname" className="p-2">
                        First Name
                      </Label>
                      <Input
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="bg-gray-500/25 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastname">Last Name</label>
                      <Input
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="bg-gray-500/25 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-gray-500/25 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-500/25 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          className="bg-gray-500/25 text-white"
                        />
                        <Button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="image-upload">Profile Image</Label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-gray-500/25 text-white rounded-md p-2 w-full border border-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-yellow-500 text-black hover:bg-yellow-600 "
                    >
                      {isUploading ? "Updating..." : "Save Changes"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
