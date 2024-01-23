import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header.js";
// import { io } from "socket.io-client";

import {
  createPost,
  getAllPostApi,
  postCommentsApi,
  userDisLikePostApi,
  userGiveHeartPostApi,
  userLikePostApi,
} from "../../services/dashboard.js";

import Sidebar from "../../component/Sidebar/Sidebar.js";
import Banner from "../../component/Banner/Banner.js";
import FileUplaod from "./FileUplaod.js";
import RenderPost from "./RenderPost.js";
import { createSocketConnection, socket } from "../../socket/index.js";

const Home = () => {
  const [allProducts, setAllproducts] = useState(null);

  const [source, setSource] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [inputTextarea, setInputTextarea] = useState("");
  const [postComment, setPostComment] = useState({ name: "", comment: "" });

  console.log("dd allProducts", allProducts);

  // const [onLineUsersList, setOnLineUsersList] = useState([]);
  // console.log("onLineUsersList", onLineUsersList);

  //--------------socket io--------------
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    createSocketConnection()
      .then((socket) => {
        console.log("user is connected", socket.id);
      })
      .catch((err) => err);

    socket.on("welcome", (data) => {
      console.log("message", data);
    });

    socket.emit("userLogin", { user: user.user, room: "room" });

    return () => {
      // socket.disconnect();
      if (socket.readyState === 1) {
        // This is important
        socket.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   socket.on("userOnline", ({ user }) => {
  //     setOnLineUsersList([...onLineUsersList, user]);
  //   });
  // }, [onLineUsersList]);

  //----------------------------

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

  return (
    <section className="super_main_sec">
      <Header />
      <div className="main_body">
        <div className="sub_body">
          <Sidebar />

          {/* Right side body*/}
          <div className="right_div">
            <Banner />

            <div className="right_body_div">
              {/* ===uplaod image/video=== */}
              <FileUplaod
                handleClick_postFiles={handleClick_postFiles}
                handleChangeFile={handleChangeFile}
                imgUrl={imgUrl}
                hanldeChangeTrexarea={hanldeChangeTrexarea}
                inputTextarea={inputTextarea}
              />

              {/* ===file uploaded=== */}
              <div className="files_uploaded_div">
                {allProducts?.length > 0 ? (
                  <RenderPost
                    allProducts={allProducts}
                    handleClickOnLikes={handleClickOnLikes}
                    handleClickSendComment={handleClickSendComment}
                    hanldeChangeComment={hanldeChangeComment}
                    postComment={postComment}
                  />
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
