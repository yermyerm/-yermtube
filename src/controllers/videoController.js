export const trending = (req, res) => res.send("Trend Videos");
export const search = (req, res) => res.send("Search Videos");

export const see = (req, res) => {
  return res.send(`Watch Video #${req.params.id}`);
};
export const edit = (req, res) => {
  console.log(req.params);
  res.send("Edit Video");
};
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");
