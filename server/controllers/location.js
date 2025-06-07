let workerLocations = {}; // Temporary storage

const postLocation = (req, res) => {
  const { lat, lng } = req.body;
  workerLocations = { lat, lng };
  console.log("Worker location updated:", workerLocations);

};

const getLocation = (req, res) => {
  res.json(workerLocations || { message: "No live location available" });
};

module.exports = { postLocation, getLocation };

