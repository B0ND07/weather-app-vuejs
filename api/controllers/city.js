import User from "../models/user.js";

export const saveCity = async (req, res) => {
  try {
    const { email, cityData } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.saved.push(cityData);

    await user.save();

    res.status(200).json({ message: "City added successfully" });
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCity = async (req, res) => {
  try {
    console.log(req.user.email);
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ savedCities: user.saved });
  } catch (error) {
    console.error("Error retrieving saved cities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { email, updatedCities } = req.body;

    await User.findOneAndUpdate({ email }, { saved: updatedCities });

    res.status(200).json({ message: "Saved cities updated successfully" });
  } catch (error) {
    console.error("Error updating saved cities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
