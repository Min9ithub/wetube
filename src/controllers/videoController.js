import Video from "../models/Video";

/*
Video.find({}, (error, videos) => {
  return res.render("home", { pageTitle: "Home", videos });
});
*/

export const home = async (req, res) => {
  // Video.find({}) -> {} 안이 비어있으면 모든 형식을 찾는다는 것을 뜻한다.
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  //=> const id = req.params.id;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // Model.exists(_id : id) --> id의 존쟈 여부만을 확인한다.-> 아랫줄에 !video가 true인지 false인지 나타내기 위해서
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  // Video.findByIdAndRemove()도 있지만 특별한 이유가 없는 이상 findByIdAndDelete를 사용()
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        // i는 ignore의 약자로 대소문자 무시를 의미한다
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
