import axios from "axios";

export const downloadLectureFile = async (req, res) => {
  try {
    const { url, name } = req.query;

    if (!url || !name) {
      return res.status(400).json({ message: "File url and name required" });
    }

    const response = await axios.get(url, {
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(name)}"`
    );

    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "application/octet-stream"
    );

    response.data.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Download failed" });
  }
};