import { API_AUTH_URL, API_BASE_URL } from "../envConfig";
export const apiEndpoints = {
  //Auth
  loginEndpoint: `${API_AUTH_URL}/login`,

  //Post Data
  createPost: `${API_BASE_URL}/post`,
  getAllPost: `${API_BASE_URL}/get-posts`,
  updatePost: `${API_BASE_URL}/update-post`,
  likePost: `${API_BASE_URL}/like-post`,
  disLikePost: `${API_BASE_URL}/dislike-post`,
  heartPost: `${API_BASE_URL}/heart-post`,
  commentPost: `${API_BASE_URL}/comment`,
};
