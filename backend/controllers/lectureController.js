export const updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, video, youtubeLink, files } = req.body;

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Update fields
    if (title) lecture.title = title;
    if (description) lecture.description = description;
    if (video) lecture.video = video;
    if (youtubeLink) lecture.youtubeLink = youtubeLink;
    if (files) lecture.files = files;
    await lecture.save();
    res.status(200).json({ message: "Lecture updated successfully", lecture });
  } catch (error) {
    res.status(500).json({ message: "Failed to update lecture", error: error.message });
  }
};