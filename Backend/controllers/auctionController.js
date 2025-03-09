import Auction from "../models/Auction.js";

// @desc    Create a new auction
// @route   POST /api/auction
// @access  Private
export const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, startTime, endTime } = req.body;

    // Validate input
    if (!title || !description || !startingPrice || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new auction
    const auction = await Auction.create({
      title,
      description,
      startingPrice,
      startTime,
      endTime,
      createdBy: req.user._id, // Logged-in user ID
    });

    res.status(201).json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
