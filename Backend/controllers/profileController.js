// controllers/profileController.js
import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const updateProfile = async (req, res) => {
  const { username, bio } = req.body;

  const updatedData = {
    username,
    bio,
  };

  // 👇 check if a file was uploaded
  const baseUrl = req.protocol + '://' + req.get('host');
  updatedData.profilePicture = `${baseUrl}/uploads/${req.file.filename}`;


  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};

