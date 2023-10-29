import axios from "axios";
import { apiEndpoints } from "./apiEndPoints";

export const createPost = async (postData) => {
  try {
    return await axios.post(
      apiEndpoints.createPost,
      postData,
      // {
      //   name: postData.name,
      //   postMessage: postData.comments,
      //   images: postData.imgUrl,
      // },
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      }
    );
  } catch (error) {
    return error;
  }
};
