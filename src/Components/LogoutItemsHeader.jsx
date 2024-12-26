/* eslint-disable react/prop-types */
import { upload } from "@/API/uploadApi";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, logout } from "../Store/Slices/userSlice";

export default function LogoutHeader({
  handleLogout,
  firstname,
  id,
  openUserInfoModal,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userimg: myImg } = useSelector((state) => state.user);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const dispatch = useDispatch();
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setIsUploading(true); // Show uploading state

      const formData = new FormData();
      formData.append("image", selectedFile); // Append the file
      const res = await upload(formData);
      dispatch(logout());
      dispatch(clearUser());
    } catch (error) {
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
          src={`${myImg || `https://i.pravatar.cc/48?u=${id + 122}`}`}
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
