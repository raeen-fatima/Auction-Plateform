import React, { useEffect, useState } from 'react';
import { FaPen, FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Payment from './Payment'; // Import Payment Component

const ProfileSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(''); // For storing the amount user wants to add
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile');
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const getProfileImage = () => {
    if (!profile?.profilePicture) return 'https://via.placeholder.com/150';
    return profile.profilePicture.startsWith('http')
      ? profile.profilePicture
      : `http://localhost:4001/${profile.profilePicture}`;
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentSuccess = async (addedAmount) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/add-funds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: addedAmount }),
      });
  
      const data = await res.json();
      if (res.ok) {
        // Successfully updated wallet on backend
        setProfile((prevProfile) => ({
          ...prevProfile,
          walletBalance: data.updatedBalance, // Assume server returns updated wallet balance
        }));
      } else {
        console.error('Failed to update wallet:', data.message);
      }
    } catch (error) {
      console.error('Error updating wallet:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-base text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-base text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-base text-gray-400">Profile not found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-16 bg-white px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={getProfileImage()}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border border-indigo-300"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-gray-800">{profile.name || 'Unnamed User'}</h1>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-100 text-primary rounded-full">
                {profile.role}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-sm font-medium text-gray-700 mb-1">Bio</h2>
            <p className="text-sm text-gray-500">{profile.bio || 'No bio added yet.'}</p>
          </div>

          {/* Wallet */}
          <div className="mt-4 border-t border-gray-200 pt-4 flex items-center gap-2 text-gray-700 text-sm">
            <FaWallet className="text-primary" />
            <span className="font-medium">Wallet:</span> ₹{profile.walletBalance?.toFixed(2) || '0.00'}
          </div>

          {/* Amount Input */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Add Funds</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount to add"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Payment Button */}
          {amount > 0 && (
            <div className="mt-6">
              <Payment bidAmount={parseFloat(amount)} onPaymentSuccess={handlePaymentSuccess} />
            </div>
          )}

          {/* Edit Button */}
          <div className="mt-6 text-center">
            <Link to="/EditProfile">
              <button className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-white rounded-full hover:bg-blue-950 transition-all">
                <FaPen />
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSection;
