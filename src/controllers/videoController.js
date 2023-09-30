let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2mins ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 3,
    comments: 0,
    createdAt: "3days ago",
    views: 1000,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 2,
    comments: 4,
    createdAt: "10mins ago",
    views: 855,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Search Videos");
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: `Watch ${video.title}`, video });
};
export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");
