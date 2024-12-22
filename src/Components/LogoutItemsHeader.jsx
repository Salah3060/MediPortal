/* eslint-disable react/prop-types */
import { upload } from "@/API/uploadApi";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";

export default function LogoutHeader({
  handleLogout,
  firstname,
  id,
  openUserInfoModal,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      setIsUploading(true); // Show uploading state

      const formData = new FormData();
      formData.append("image", selectedFile); // Append the file

      // Upload the file and get the file path from the server
      const res = await upload(formData);
      alert("File uploaded successfully!");

      console.log("Upload response:", res);
      const filePath = res.filePath; // Assuming your server returns the file path
      console.log("Uploaded file path:", filePath); // Use the file path as needed
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file. Please try again.");
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };
  return (
    <div className="hidden md:flex gap-x-5 items-center">
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={openUserInfoModal}
      >
        <img
          src={`https://i.pravatar.cc/48?u=${id + 122}`}
          alt="user's photo"
          className="w-10 rounded-full"
        />
        welcome {firstname}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition"
        >
          {selectedFile ? "Change File" : "Select File"}
        </label>
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`btn-2 ${
            isUploading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 transition"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <IoIosLogOut
        className="text-xl hover:text-tertiary cursor-pointer "
        onClick={handleLogout}
      />
    </div>
  );
}
