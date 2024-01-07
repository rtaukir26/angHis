import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import EidIcon1 from "../../assets/images/eid1.avif";
import EidIcon2 from "../../assets/images/eid2.avif";
import EidIcon3 from "../../assets/images/eid3.jpg";
import EidIcon4 from "../../assets/images/eid4.jpg";
import DiwaliIcon1 from "../../assets/images/diwali1.avif";
import DiwaliIcon2 from "../../assets/images/diwali2.avif";
import DiwaliIcon3 from "../../assets/images/diwal3.avif";
import DiwaliIcon4 from "../../assets/images/diwali4.avif";
import likeIcon from "../../assets/images/like2.png";
import disLikeIcon from "../../assets/images/dislike.png";
import heartIcon from "../../assets/images/heart.png";
import sendIcon from "../../assets/images/sendIcon.png";
import {
  createPost,
  getAllPostApi,
  postCommentsApi,
  userDisLikePostApi,
  userGiveHeartPostApi,
  userLikePostApi,
} from "../../services/dashboard.js";
export const bannerEidImg = [
  { imgName: EidIcon1 },
  { imgName: EidIcon2 },
  { imgName: EidIcon3 },
  { imgName: EidIcon4 },
];
export const bannerDiwaliImg = [
  { imgName: DiwaliIcon1 },
  { imgName: DiwaliIcon2 },
  { imgName: DiwaliIcon3 },
  { imgName: DiwaliIcon4 },
];
const Home = () => {
  const [products, setAllproducts] = useState(null);
  const [image] = useState([]);
  const [dynamicImgClass, setDynamicImgClass] = useState("banner_img1");
  const [source, setSource] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [inputTextarea, setInputTextarea] = useState("");
  const [postComment, setPostComment] = useState({ name: "", comment: "" });

  console.log("dd products", products);

  //imges changes dynamacally, loader
  // const callAfterdelay = (i) => {
  //   setTimeout(() => {
  //     for (let i = 0; i <= bannerEidImg.length; i++) {
  //       seqOfIndex(i);
  //     }
  //   }, 10000 * i);
  // };
  // const seqOfIndex = (index) => {
  //   setTimeout(() => {
  //     setTimeout(() => {
  //       if (index < bannerEidImg.length) {
  //         setImage(bannerEidImg[index]);
  //         setDynamicImgClass("banner_img1");
  //         console.log(index, dynamicImgClass);
  //         setTimeout(() => {
  //           setDynamicImgClass("");
  //         }, 1500);
  //       } else {
  //         callAfterdelay(0);
  //       }
  //     }, 2000);
  //   }, 8000 * index);
  // };
  // useEffect(() => {
  //   callAfterdelay();
  // }, []);

  //file uplaod

  const handleChangeFile = (e) => {
    // let files = e.target.files[0];
    // // const url = URL.createObjectURL(files);
    setImgUrl(e.target.files[0]);
    // const files = Array.from(e.target.files);
    // setImgUrl([]);
    // files.forEach((file) => {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setImgUrl((old) => [...old, reader.result]);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // });
  };

  //hanlde change trexarea
  const hanldeChangeTrexarea = (e) => {
    setInputTextarea(e.target.value);
  };
  //video upalod
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource((pre) => [...pre, url]);
  };

  //Create post
  const handleClick_postFiles = () => {
    let userId = JSON.parse(localStorage.getItem("user"));
    const postData = new FormData();
    postData.append("inputTextarea", inputTextarea);
    postData.append("photo", imgUrl);
    postData.append("user", userId.user.id);

    createPost(postData)
      .then((res) => {
        if (res.status === 201) {
          getAllPost();
          setImgUrl("");
          setInputTextarea("");
        }
      })
      .catch((err) => console.log("err", err));
  };
  let getAllPost = () => {
    getAllPostApi().then((res) => {
      if (res.status === 200) {
        const base64ImagesArray = res.data.posts.map((dataItem) => {
          try {
            const binaryData = new Uint8Array(dataItem.photo.data.data);
            let binaryString = "";
            for (let i = 0; i < binaryData.length; i++) {
              binaryString += String.fromCharCode(binaryData[i]);
            }
            const base64Image = btoa(binaryString);
            return {
              ...dataItem,
              photo: {
                ...dataItem.photo,
                data: {
                  ...dataItem.photo.data,
                  data: base64Image,
                },
              },
            };
          } catch (error) {
            console.error(
              `Error converting binary data for image with ID ${dataItem._id}`,
              error
            );
            return { ...dataItem, base64Image: null }; // or handle the error in an appropriate way
          }
        });
        setAllproducts(base64ImagesArray);
      }
    });
  };
  //get all post data
  useEffect(() => {
    getAllPost();
  }, []);

  //Handle click on likeDislike
  // const handleClickOnLikes = (likeDislike, imgId) => {
  //   let userDetails = JSON.parse(localStorage.getItem("user"));
  //   const likeDislikeData = new FormData();
  //   likeDislikeData.append("likeDislike", likeDislike);
  //   likeDislikeData.append("userId", userDetails.user.id);

  //   if (likeDislike === "like") {
  //     updatePost(likeDislikeData, imgId)
  // .then((res) => {
  //   const binaryData = new Uint8Array(res.data.post.photo.data.data);
  //   let binaryString = "";
  //   for (let i = 0; i < binaryData.length; i++) {
  //     binaryString += String.fromCharCode(binaryData[i]);
  //   }
  //   const base64Image = btoa(binaryString);
  //   res.data.post.photo.data.data = base64Image;
  //   setAllproducts(
  //     products.map((item) => {
  //       if (item._id === res.data.post._id) {
  //         item = res.data.post;
  //       }
  //       return item;
  //     })
  //   );
  // })
  //       .catch((err) => err);
  //   } else if (likeDislike === "dislike") {
  //     updatePost(likeDislikeData, imgId)
  //       .then((res) => {
  //         const binaryData = new Uint8Array(res.data.post.photo.data.data);
  //         let binaryString = "";
  //         for (let i = 0; i < binaryData.length; i++) {
  //           binaryString += String.fromCharCode(binaryData[i]);
  //         }
  //         const base64Image = btoa(binaryString);
  //         res.data.post.photo.data.data = base64Image;
  //         setAllproducts(
  //           products.map((item) => {
  //             if (item._id === res.data.post._id) {
  //               item = res.data.post;
  //             }
  //             return item;
  //           })
  //         );
  //       })
  //       .catch((err) => err);
  //   } else if (likeDislike === "heart") {
  //     updatePost(likeDislikeData, imgId)
  //       .then((res) => {
  //         const binaryData = new Uint8Array(res.data.post.photo.data.data);
  //         let binaryString = "";
  //         for (let i = 0; i < binaryData.length; i++) {
  //           binaryString += String.fromCharCode(binaryData[i]);
  //         }
  //         const base64Image = btoa(binaryString);
  //         res.data.post.photo.data.data = base64Image;
  //         setAllproducts(
  //           products.map((item) => {
  //             if (item._id === res.data.post._id) {
  //               item = res.data.post;
  //             }
  //             return item;
  //           })
  //         );
  //       })
  //       .catch((err) => err);
  //   }
  // };

  //Handle click on like image
  const handleClickOnLikes = (likeDislike, imgId) => {
    if (likeDislike === "like") {
      userLikePostApi(imgId)
        .then((res) => {
          if (res.data.success) {
            getAllPost();
          }
        })
        .catch((err) => console.log("err in like post", err));
    } else if (likeDislike === "dislike") {
      userDisLikePostApi(imgId)
        .then((res) => {
          if (res.data.success) {
            getAllPost();
          }
        })
        .catch((err) => console.log("err in dislike post", err));
    } else {
      userGiveHeartPostApi(imgId)
        .then((res) => {
          if (res.data.success) {
            getAllPost();
          }
        })
        .catch((err) => console.log("err in heart post", err));
    }
  };

  //handle change comment
  const hanldeChangeComment = (e) => {
    setPostComment({ name: e.target.name, comment: e.target.value });
  };
  //Handle click send comment
  const handleClickSendComment = (imgId) => {
    setPostComment({ name: "", comment: "" });

    postCommentsApi(imgId, postComment)
      .then((res) => {
        if (res.data.success) {
          getAllPost();
        }
      })
      .catch((err) => console.log("err in comments post", err));
  };

  console.log("products", products);
  return (
    <section className="super_main_sec">
      <Header />
      <div className="main_body">
        <div className="sub_body">
          {/* ===left side menu==== */}
          <div className="left_menu">
            <div className="search_div">
              <input type="text" placeholder="search by festival name" />
            </div>
            <ul>
              <li>All</li>
              {/* <li>Eid</li>
              <li>Diwali</li>
              <li>Bakrid</li>
              <li>Muharram</li>
              <li>Durga Puja</li> */}
              <li>Rakshbandhan</li>
              <li>Independence day</li>
              <li>Republic day</li>
              <li>Wedding</li>
              <li>Function</li>
            </ul>
          </div>

          {/* ===right side body=== */}
          <div className="right_div">
            <div className="banner_div">
              <div className={`banner1 ${dynamicImgClass}`}>
                <img
                  // className="banner_img1"
                  src={
                    image?.imgName ? image?.imgName : bannerEidImg[0]?.imgName
                  }
                  alt="b1"
                />
              </div>
              <div className="banner1">2</div>
              <div className="banner1">3</div>
            </div>

            <div className="right_body_div">
              {/* ===uplaod image/video=== */}
              <div className="upload_div">
                <div className="uplaod_image_div">
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    id="file-input"
                    name="file-input"
                    accept="image/*"
                    // multiple
                  />

                  <label id="file-input-label" htmlFor="file-input">
                    Select an Image
                  </label>
                </div>
                {/* <div className="upload_video_div">
                    <input
                      // ref={inputRef}
                      className="VideoInput_input"
                      type="file"
                      onChange={handleVideoChange}
                      accept=".mov,.mp4"
                      id="video-file"
                    />
                    <label id="video-file-input-label" htmlFor="video-file">
                      Select video
                    </label>
                  </div> */}
                <button onClick={handleClick_postFiles}>Post</button>
              </div>

              {/* ===file uploaded=== */}
              <div className="files_uploaded_div">
                <div className="post_div">
                  <textarea
                    id="img-des"
                    name="img-des"
                    placeholder="write about your post..."
                    rows="3"
                    cols="30"
                    value={inputTextarea}
                    onChange={hanldeChangeTrexarea}
                  />
                  {imgUrl && (
                    <img src={URL.createObjectURL(imgUrl)} alt="post-image" />
                  )}
                </div>

                {products?.length > 0 ? (
                  <div className="files_uploaded_body">
                    {products?.map((item, i) => {
                      return (
                        <div className="body_wrapper" key={item.key}>
                          <p className="post_header">{item?.postMessage}</p>
                          <img
                            className="uplaoded_img"
                            src={`data:image/jpeg;base64,${item.photo.data.data}`}
                            alt="post image"
                          />

                          {/* ===like/comments=== */}
                          <div className="like_main_div">
                            <div className="like_sub_div">
                              <span
                                className="likes_common_span"
                                onClick={() =>
                                  handleClickOnLikes("like", item._id)
                                }
                              >
                                <img
                                  name="like"
                                  className="like"
                                  src={likeIcon}
                                  alt="like"
                                />
                                <small>{item?.likes?.totalLikes}</small>
                              </span>
                              <span
                                className="likes_common_span"
                                onClick={() =>
                                  handleClickOnLikes("dislike", item._id)
                                }
                              >
                                <img
                                  name="dislike"
                                  className="dislike"
                                  src={disLikeIcon}
                                  alt="dis-like"
                                />
                                <small>{item?.disLikes.totalDislikes}</small>
                              </span>
                              <span
                                className="likes_common_span"
                                onClick={() =>
                                  handleClickOnLikes("heart", item._id)
                                }
                              >
                                <img
                                  name="heart"
                                  className="heart"
                                  src={heartIcon}
                                  alt="heart"
                                />
                                <small>{item?.hearts.totalHearts}</small>
                              </span>
                            </div>
                            {/* Comments */}

                            <div className="displayed_comments_div">
                              <div className="comment_div">
                                <input
                                  type="text"
                                  name={item?._id}
                                  value={
                                    item?._id === postComment.name
                                      ? postComment.comment
                                      : ""
                                  }
                                  placeholder="write comments..."
                                  onChange={hanldeChangeComment}
                                />
                                <button
                                  disabled={
                                    postComment.comment === "" ||
                                    postComment.name !== item?._id
                                  }
                                  onClick={() =>
                                    handleClickSendComment(item._id)
                                  }
                                >
                                  <img src={sendIcon} alt="send" />
                                </button>
                              </div>
                              {item.comments.map((comment) => {
                                return <span>{comment}</span>;
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
