import { create } from "zustand";

// Define the User interface
interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserStore {
  // State variables for the form
  formData: User;

  // Setters for form fields
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;

  // Function to reset form after submission
  resetForm: () => void;

  // Function to set the form data (useful for updating)
  setFormData: (user: User) => void;

  // Function for creating a user
  createForm: (userData: User) => Promise<void>;

  // Function for updating an existing user
  updateForm: (userData: User, userId: string) => Promise<void>;

  // Creating createUser alias for createForm
  createUser: (userData: User) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  // Initial form data state
  formData: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },

  // Setters for form fields
  setName: (name) =>
    set((state) => ({ formData: { ...state.formData, name } })),
  setEmail: (email) =>
    set((state) => ({ formData: { ...state.formData, email } })),
  setPhone: (phone) =>
    set((state) => ({ formData: { ...state.formData, phone } })),
  setAddress: (address) =>
    set((state) => ({ formData: { ...state.formData, address } })),

  // Function to reset form after submission
  resetForm: () =>
    set({
      formData: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    }),

  // Function to set the form data (useful for updating)
  setFormData: (user) =>
    set({
      formData: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    }),

  // Function for creating a user
  createForm: async (userData: User): Promise<void> => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST", // POST request for creating a new user
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User created successfully:", data);
        set({ formData: { name: "", email: "", phone: "", address: "" } }); // Clear the form after creating the user
        alert("User created successfully!");
      } else {
        const errorData = await res.json();
        console.error("Error creating user:", errorData);
        alert("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the user.");
    }
  },

  // Function for updating an existing user
  updateForm: async (userData: User, userId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user`, {
        method: "PUT", // PUT request for updating an existing user
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData, // spread user data
          id: userId, // Add the id to the body
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User updated successfully:", data);
        alert("User updated successfully!");
      } else {
        const errorData = await res.json();
        console.error("Error updating user:", errorData);
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the user.");
    }
  },

  // Create an alias for createForm as createUser
  createUser: async (userData: User): Promise<void> => {
    return useUserStore.getState().createForm(userData);
  },
}));

export default useUserStore;
