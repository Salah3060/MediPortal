/* eslint-disable react/prop-types */
import Logo from "./Logo";
import Items from "./Items";
import { useState } from "react";
import { upload } from "@/API/uploadApi";

const Header = ({ openUserInfoModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
    <div className="bg-primary text-white flex justify-center items-center py-1 px-5">
      {/* CONTAINER */}
      <div
        className="
        lg:w-11/12 w-full
        flex justify-between items-center
        xl:h-[4.375rem] lg:h-[3.75rem] h-[3.125rem]"
      >
        <Logo />
        <Items openUserInfoModal={openUserInfoModal} />
        {/* Upload Section */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="bg-white text-primary px-4 py-2 rounded-md cursor-pointer"
          >
            {selectedFile ? "Change File" : "Select File"}
          </label>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`bg-secondary text-white px-4 py-2 rounded-md ${
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-secondary-dark"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
