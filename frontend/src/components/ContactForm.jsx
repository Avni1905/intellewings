import React, { useState } from "react";

const ContactForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_1: "",
    phone_2: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError("First name, last name, and email are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newContact = await response.json();
        console.log("Contact added:", newContact);
        onSubmit(); 
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          phone_1: "",
          phone_2: "",
          address: "",
        });
        setError(""); 
      } else {
        setError("Failed to add contact. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen rounded-xl p-4 m-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg sm:max-w-md bg-white shadow-xl rounded-lg p-6 sm:p-4 border border-opacity-20 border-white"
      >
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Contact Form
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1">
            <input
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              placeholder="Middle Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1">
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1">
            <input
              name="phone_1"
              value={formData.phone_1}
              onChange={handleChange}
              placeholder="Phone 1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1">
            <input
              name="phone_2"
              value={formData.phone_2}
              onChange={handleChange}
              placeholder="Phone 2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 text-black"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 bg-blue-700 bg-opacity-80 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} 
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <button
              type="button"
              onClick={onClose} 
              className="w-full py-3 bg-blue-700 bg-opacity-80 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
