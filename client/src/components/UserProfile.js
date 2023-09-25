import React from "react";
import { FiX } from "react-icons/fi";

const UserProfile = ({ user, onClose }) => {
  const { _id, firstname, lastname, email, mobile } = user;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with a blurred background */}
      <div className="fixed inset-0 backdrop-blur-md backdrop-filter backdrop-opacity-75 z-40" />

      <div className="modal-container bg-white rounded-lg shadow-xl p-6 relative z-50">
        <div className="modal-content">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <div className="mb-4">
            <strong>User ID:</strong> {_id}
          </div>
          <div className="mb-4">
            <strong>Customer Name:</strong> {firstname + " " + lastname}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {email}
          </div>
          <div className="mb-4">
            <strong>Mobile Number:</strong> {mobile}
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn absolute top-0 right-0 p-2"
          >
            <FiX className="text-2xl"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
