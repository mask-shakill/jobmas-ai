"use client";

import useUserStore from "@/stores/formStore";
import { useState, useEffect } from "react";

export default function UpdatePage() {
  const { formData, setFormData, updateForm } = useUserStore();

  const userId = "680e520da695405bde3c9067";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user?id=${userId}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        if (data) {
          // স্টোরে data সেট করা
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        }
      } catch (error) {
        alert("Error fetching user data");
        console.error("Error:", error);
      }
    };
    fetchUserData();
  }, [userId, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateForm(formData, userId);
      alert("User updated successfully!");
    } catch (error) {
      alert("An error occurred during the update");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Update User</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
