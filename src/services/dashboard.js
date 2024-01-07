import axios from "axios";
import { apiEndpoints } from "./apiEndPoints";
//login user
export const getUserLogin = async (loginData) => {
  try {
    await axios.post(apiEndpoints.loginEndpoint, loginData);
  } catch (error) {
    return error;
  }
};

//create post
export const createPost = async (postData) => {
  try {
    return await axios.post(apiEndpoints.createPost, postData, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTUwODdjNTdkMjE3NzIwOGZkY2M3N2YiLCJpYXQiOjE3MDA1ODM1MDAsImV4cCI6MTcwMDY2OTkwMH0.6TxTat6DgVmemIYulCG9gbK_rWErowhVplF_KYypSFg",
        // "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });
  } catch (error) {
    return error;
  }
};

//Get all post
export const getAllPostApi = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  try {
    return await axios.get(apiEndpoints.getAllPost, {
      headers: {
        Authorization: user.token,
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTUwODdjNTdkMjE3NzIwOGZkY2M3N2YiLCJpYXQiOjE3MDA1ODM1MDAsImV4cCI6MTcwMDY2OTkwMH0.6TxTat6DgVmemIYulCG9gbK_rWErowhVplF_KYypSFg",
        // "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });
  } catch (error) {
    return error;
  }
};
// update post
export const updatePost = async (likeDislike, imgId) => {
  try {
    return await axios.put(`${apiEndpoints.updatePost}/${imgId}`, likeDislike);
  } catch (error) {
    return error;
  }
};

// like post
export const userLikePostApi = async (imgId) => {
  let user = JSON.parse(localStorage.getItem("user"));
  try {
    return await axios.get(`${apiEndpoints.likePost}/${imgId}`, {
      headers: {
        Authorization: user.token,
      },
    });
  } catch (error) {
    return error;
  }
};
// dislike post
export const userDisLikePostApi = async (imgId) => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    return await axios.get(`${apiEndpoints.disLikePost}/${imgId}`, {
      headers: {
        Authorization: user.token,
      },
    });
  } catch (error) {
    return error;
  }
};
// like post
export const userGiveHeartPostApi = async (imgId) => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    return await axios.get(`${apiEndpoints.heartPost}/${imgId}`, {
      headers: {
        Authorization: user.token,
      },
    });
  } catch (error) {
    return error;
  }
};
// comments post
export const postCommentsApi = async (imgId, comments) => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    return await axios.post(
      `${apiEndpoints.commentPost}/${imgId}`,
      { comments: comments.comment },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
