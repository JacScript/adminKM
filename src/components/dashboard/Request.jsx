import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Activity,
  Mail,
  Filter,
  X,
} from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequests } from "../../http";

const Request = () => {
  const [requests, setRequests] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [editingRequest, setEditingRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActivity, setFilterActivity] = useState("");
  // const [formData, setFormData] = useState({
  //   destination: "",
  //   activity: "",
  //   email: "",
  // });
  // const [errors, setErrors] = useState({});

  // React Query for fetching requests
  const { data: resData, isError, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      return await getRequests();
    },
    placeholderData: keepPreviousData,
  });

  // console.log("Response Data:", resData?.data?.data);

  // Update requests state with fetched data
  useEffect(() => {
    if (resData?.data?.data) {
      // Fix: Use the correct nested data structure
      setRequests(resData.data.data);
    }
  }, [resData]);

  // Get unique activities for filter - fix to handle empty requests array
  const uniqueActivities = requests.length > 0 
    ? [...new Set(requests.map((req) => req.activity).filter(Boolean))]
    : [];

  // Filter requests based on search and filter criteria
  const filteredRequests = requests.filter((request) => {
    // Add safety checks for undefined/null values
    const destination = request.destination || "";
    const activity = request.activity || "";
    const email = request.email || "";
    
    const matchesSearch =
      destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActivity === "" || activity === filterActivity;

    return matchesSearch && matchesFilter;
  });

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.destination.trim()) {
  //     newErrors.destination = "Destination is required";
  //   } else if (formData.destination.trim().length < 2) {
  //     newErrors.destination = "Destination must be at least 2 characters long";
  //   }

  //   if (!formData.activity.trim()) {
  //     newErrors.activity = "Activity is required";
  //   } else if (formData.activity.trim().length < 2) {
  //     newErrors.activity = "Activity must be at least 2 characters long";
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (
  //     !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
  //   ) {
  //     newErrors.email = "Please enter a valid email address";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = () => {
  //   if (!validateForm()) return;

  //   const newRequest = {
  //     _id: editingRequest ? editingRequest._id : Date.now().toString(),
  //     ...formData,
  //     destination: formData.destination.trim(),
  //     activity: formData.activity.trim(),
  //     email: formData.email.trim().toLowerCase(),
  //     createdAt: editingRequest ? editingRequest.createdAt : new Date(),
  //     updatedAt: new Date(),
  //   };

  //   if (editingRequest) {
  //     setRequests(
  //       requests.map((req) =>
  //         req._id === editingRequest._id ? newRequest : req
  //       )
  //     );
  //   } else {
  //     setRequests([newRequest, ...requests]);
  //   }

  //   resetForm();
  // };

  // const resetForm = () => {
  //   setFormData({ destination: "", activity: "", email: "" });
  //   setErrors({});
  //   setShowForm(false);
  //   setEditingRequest(null);
  // };

  // const handleEdit = (request) => {
  //   setFormData({
  //     destination: request.destination || "",
  //     activity: request.activity || "",
  //     email: request.email || ""
  //   });
  //   setEditingRequest(request);
  //   setShowForm(true);
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this request?')) {
  //     setRequests(requests.filter(req => req._id !== id));
  //   }
  // };

  const formatDate = (date) => {
    // Add safety check for date
    if (!date) return "N/A";
    
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Activity size={48} className="mx-auto" />
          </div>
          <p className="text-red-600 text-lg">Error loading requests</p>
          <p className="text-gray-600 text-sm">{error?.message || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Request Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage travel requests and applications
              </p>
            </div>
            {/* <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus size={16} />
              New Request
            </button> */}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <CiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by destination, activity, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={filterActivity}
                onChange={(e) => setFilterActivity(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Activities</option>
                {uniqueActivities.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Request Form Modal */}
        {/* {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingRequest ? "Edit Request" : "New Request"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destination: e.target.value,
                        })
                      }
                      placeholder="e.g., Paris, France"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.destination
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.destination && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.destination}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity
                  </label>
                  <div className="relative">
                    <Activity
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={formData.activity}
                      onChange={(e) =>
                        setFormData({ ...formData, activity: e.target.value })
                      }
                      placeholder="e.g., Visa Application, Tour Booking"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.activity ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.activity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.activity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="user@example.com"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingRequest ? "Update Request" : "Create Request"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Requests ({filteredRequests.length})
            </h2>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Activity className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-lg">No requests found</p>
              <p className="text-sm">
                {requests.length === 0 
                  ? "No requests have been created yet"
                  : "Try adjusting your search or filter criteria"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="text-gray-400 mr-2" size={16} />
                          <div className="text-sm font-medium text-gray-900">
                            {request.destination || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Activity className="text-gray-400 mr-2" size={16} />
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {request.activity || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail className="text-gray-400 mr-2" size={16} />
                          <a
                            href={`mailto:${request.email}`}
                            className="text-sm text-gray-900 hover:underline hover:text-blue-500"
                          >
                            {request.email || "N/A"}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="text-gray-400 mr-2" size={16} />
                          {formatDate(request.createdAt)}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="text-gray-400 mr-2" size={16} />
                          {formatDate(request.updatedAt)}
                        </div>
                      </td> */}
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(request)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;