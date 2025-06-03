import { useEffect, useState } from 'react';
import Image from 'next/image';
import { updateUser } from '@/services/userService';
import { addProperty, deletePropertieById, getPropertiesByUserId, updateProperty } from '@/services/bienimmobilierService';

export type UserData = {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PropertyData = {
  id?: string;
  Titre: string;
  Description: string;
  Type: string;
  Prix: string;
  Localisation: string;
  imageUrl?: string;
};

type PropertyFormData = Omit<PropertyData, 'id'> & {
  images: File[];
};

type AccountPageProps = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

type TabType = 'profile' | 'properties' | 'add-property' | 'edit-property';

const AccountPage = ({ userData, setUserData }: AccountPageProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [properties, setProperties] = useState<PropertyData[]>([]);

  const [propertyForm, setPropertyForm] = useState<PropertyFormData>({
    Titre: '',
    Description: '',
    Type: 'Apartment',
    Prix: '',
    Localisation: '',
    images: []
  });

  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePropertyInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPropertyForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPropertyForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setPropertyForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
        throw new Error("New password and confirmation do not match.");
      }

      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error("User information is missing. Please log in again.");
      }

      const { id } = JSON.parse(storedUser);

      const response = await updateUser(id, userData);

      if (!response.success) {
        throw new Error(response.data.message || "Failed to update user.");
      }

      const updatedUser = response.data;

      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess("User updated successfully!");
    } catch (error: unknown) {
      let errorMessage = "Update failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;

        if ("response" in error) {
          const axiosError = error as {
            response?: {
              data?: {
                error?: string;
                message?: string;
                details?: string;
              };
              status?: number;
            };
          };

          errorMessage = axiosError.response?.data?.error ||
            axiosError.response?.data?.message ||
            errorMessage;

          console.log("Response data:", axiosError.response?.data);
          console.log("Response status:", axiosError.response?.status);
        }
      }

      setError(errorMessage);
      console.log("Full error object:", error);
    }
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPropertyId) {
        const updated = await updateProperty(editingPropertyId, propertyForm);
        const updatedProperties = properties.map(prop =>
          prop.id === updated.id ? updated : prop
        );
        setProperties(updatedProperties);
      } else {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("No user in localStorage");

        const { id: userId } = JSON.parse(storedUser);

        const newPropertyData = {
          ...propertyForm,
          ProprietarieID: userId
        };

        const created = await addProperty(newPropertyData);
        setProperties([...properties, created]);
      }

      setPropertyForm({
        Titre: "",
        Description: "",
        Type: "Apartment",
        Prix: "",
        Localisation: "",
        images: [],
      });

      setEditingPropertyId(null);
      setActiveTab("properties");
    } catch (error) {
      console.error("Failed to submit property:", error);
    }
  };

  const handleEditProperty = (id: string) => {
    const propertyToEdit = properties.find(prop => prop.id === id);
    if (propertyToEdit) {
      setPropertyForm({
        Titre: propertyToEdit.Titre,
        Description: propertyToEdit.Description,
        Type: propertyToEdit.Type,
        Prix: propertyToEdit.Prix,
        Localisation: propertyToEdit.Localisation,
        images: []
      });
      setEditingPropertyId(id);
      setActiveTab('edit-property');
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this property?");
      if (!confirmDelete) return;
      await deletePropertieById(id);

      setProperties(prev =>
        prev.filter(property => property.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const handleCancelProperty = () => {
    setPropertyForm({
      Titre: '',
      Description: '',
      Type: 'Apartment',
      Prix: '',
      Localisation: '',
      images: []
    });
    setEditingPropertyId(null);
    setActiveTab('properties');
  };

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("No user found in localStorage");

        const { id } = JSON.parse(storedUser);
        const properties = await getPropertiesByUserId(id);
        setProperties(properties);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };
    fetchUserProperties();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8 gap-2">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-[#23371c] border-b-2 border-[#4D812C]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
            aria-label="Profile settings"
            aria-current={activeTab === 'profile' ? 'page' : undefined}
          >
            Profile Settings
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'properties' ? 'text-[#23371c] border-b-2 border-[#4D812C]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('properties')}
            aria-label="My properties"
            aria-current={activeTab === 'properties' ? 'page' : undefined}
          >
            My Properties
          </button>
          {(activeTab === 'add-property' || activeTab === 'edit-property') && (
            <button
              className={`py-2 px-4 font-medium ${(activeTab === 'add-property' || activeTab === 'edit-property') ? 'text-[#23371c] border-b-2 border-[#4D812C]' : 'text-gray-500'}`}
              aria-label={editingPropertyId ? 'Edit property' : 'Add property'}
              aria-current={(activeTab === 'add-property' || activeTab === 'edit-property') ? 'page' : undefined}
            >
              {editingPropertyId ? 'Edit Property' : 'Add Property'}
            </button>
          )}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleUserSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleUserInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-[#23371c] mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={userData.currentPassword}
                      onChange={handleUserInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={handleUserInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleUserInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex-1">
                  {error && (
                    <div className="text-red-600 text-sm font-medium mb-4">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="text-green-600 text-sm font-medium mb-4">
                      {success}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#23371c] text-white rounded-md hover:bg-[#4D812C] transition-colors"
                  aria-label="Save changes"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Properties List Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#23371c]">My Properties</h2>
              <button
                onClick={() => {
                  setEditingPropertyId(null);
                  setActiveTab('add-property');
                }}
                className="px-4 py-2 bg-[#4D812C] text-white rounded-md hover:bg-[#23371c] transition-colors flex items-center"
                aria-label="Add new property"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Property
              </button>
            </div>

            {/* Property Listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.length > 0 ? (
                properties.map(property => (
                  <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-[#EBEBE1] flex items-center justify-center relative">
                      {property.imageUrl ? (
                        <Image
                          src={property.imageUrl}
                          alt={property.Titre}
                          layout="fill"
                          objectFit="cover"
                          className="absolute inset-0"
                        />
                      ) : (
                        <span className="text-gray-400">Property Image</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{property.Titre}</h3>
                      <p className="text-gray-600 text-sm mb-2">{property.Localisation}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#23371c]">${Number(property.Prix).toLocaleString()}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProperty(property.id!)}
                            className="p-1 text-[#4D812C] hover:text-[#23371c]"
                            aria-label={`Edit ${property.Titre}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id!)}
                            className="p-1 text-red-500 hover:text-red-700"
                            aria-label={`Delete ${property.Titre}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No properties listed yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first property.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setEditingPropertyId(null);
                        setActiveTab('add-property');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#4D812C] hover:bg-[#23371c] focus:outline-none"
                      aria-label="Add new property"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      New Property
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Property Tab */}
        {(activeTab === 'add-property' || activeTab === 'edit-property') && (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={handleCancelProperty}
                className="mr-4 p-1 text-gray-500 hover:text-[#23371c]"
                aria-label="Back to properties"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">
                {editingPropertyId ? 'Edit Property' : 'Add New Property'}
              </h1>
            </div>

            <form onSubmit={handlePropertySubmit} className="max-w-3xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="Titre" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title
                  </label>
                  <input
                    type="text"
                    id="Titre"
                    name="Titre"
                    value={propertyForm.Titre}
                    onChange={handlePropertyInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={propertyForm.Type}
                    onChange={handlePropertyInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    aria-required="true"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Condo">Loft</option>
                    <option value="Condo">Flat</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Studio">Studio</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Land">Land</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="Description"
                  name="Description"
                  value={propertyForm.Description}
                  onChange={handlePropertyInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                  required
                  aria-required="true"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="Prix" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="Prix"
                    name="Prix"
                    value={propertyForm.Prix}
                    onChange={handlePropertyInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="Localisation" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="Localisation"
                    name="Localisation"
                    value={propertyForm.Localisation}
                    onChange={handlePropertyInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C]"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#4D812C] hover:text-[#23371c] focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          aria-label="Upload property images"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {propertyForm.images.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {propertyForm.images.map((file, index) => (
                      <div key={index} className="relative h-24 rounded-md overflow-hidden border border-gray-200">
                        <div className="absolute inset-0 bg-[#EBEBE1] flex items-center justify-center">
                          <span className="text-xs text-gray-500 truncate px-1">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                          aria-label={`Remove image ${file.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancelProperty}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  aria-label="Cancel property editing"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4D812C] text-white rounded-md hover:bg-[#23371c] transition-colors"
                  aria-label={editingPropertyId ? 'Update property' : 'Save property'}
                >
                  {editingPropertyId ? 'Update Property' : 'Save Property'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;