// src/components/EditProfile.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    profilePicture: ''
  });
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL
}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProfile(data);
      setPreview(data.profilePicture);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('bio', profile.bio);
    if (file) formData.append('profilePicture', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL
}/api/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      setProfile(data);
      toast.success('Profile updated successfully!');

      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Error updating profile!');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Edit Your Profile</h2>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={preview || 'https://media.istockphoto.com/vectors/blue-sign-design-for-photo-placeholder-on-app-design-user-interface-vector-id1330180806?k=20&m=1330180806&s=612x612&w=0&h=ke_UbEg9dYp9-yUfe3fKWTtR5RbjqWifuAsK8O0QapI='}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
            />
            <label className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-950 shadow">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              Edit
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-950 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;