import React, { useEffect, useState } from "react";
import styled from "styled-components"; //psuedo class "before",content will be dynamic
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

// import SessionLog from "../../../src/SessionLog";
// import DiwaliIcon5 from "../../assets/images/diwali5.avif";
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
  const [image, setImage] = useState([]);
  const [dynamicImgClass, setDynamicImgClass] = useState("banner_img1");
  // const [source, setSource] = useState({ videoUrl: [], imgUrl: [] });
  const [source, setSource] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [inputTextarea, setInputTextarea] = useState("");
  const [postData, setPostData] = useState(null);
  console.log("dd imgUrl", imgUrl);

  //imges changes dynamacally, loader
  const callAfterdelay = (i) => {
    setTimeout(() => {
      for (let i = 0; i <= bannerEidImg.length; i++) {
        seqOfIndex(i);
      }
    }, 10000 * i);
  };
  const seqOfIndex = (index) => {
    setTimeout(() => {
      setTimeout(() => {
        if (index < bannerEidImg.length) {
          setImage(bannerEidImg[index]);
          setDynamicImgClass("banner_img1");
          console.log(index, dynamicImgClass);
          setTimeout(() => {
            setDynamicImgClass("");
          }, 1500);
        } else {
          callAfterdelay(0);
        }
      }, 2000);
    }, 8000 * index);
  };
  useEffect(() => {
    callAfterdelay();
  }, []);

  //file uplaod
  const handleChangeFile = (e) => {
    let files = e.target.files[0];
    const url = URL.createObjectURL(files);
    setImgUrl((pre) => [...pre, url]);
    // setSource((pre) => {
    //   return { ...pre,...pre.imgUrl,[pre.imgUrl, url] };
    // });
    // let reader = new FileReader();
    // reader.readAsDataURL(files);
    // reader.onload = (e) => {
    //   // this.setstate{image:(e.target.result)}
    //   setSource(e.target.result);
    //   /*
    // const url="http://localhost:3000/api/service";
    // const formData={file:e.target.result}
    // return post(url,formData)
    // .then(response=>console.log(response));
    // */
    // };
  };

  //hanlde change trexarea
  const hanldeChangeTrexarea = (e) => {
    setInputTextarea(e.target.value);
  };
  //video upalod
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    // setSource((pre) => [...pre, [...videoUrl, url]]);
    setSource((pre) => [...pre, url]);
  };

  //handle click post files
  const handleClick_postFiles = () => {
    setPostData({ comments: inputTextarea, imgUrl: imgUrl });
  };
  console.log("dd postdata", postData);

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
              <li>Eid</li>
              <li>Diwali</li>
              <li>Bakrid</li>
              <li>Muharram</li>
              <li>Durga Puja</li>
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
                  />

                  <label id="file-input-label" htmlFor="file-input">
                    Select an Image
                  </label>
                </div>
                <div className="upload_video_div">
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
                </div>
                <button
                  onClick={handleClick_postFiles}
                  disabled={imgUrl.length < 1}
                >
                  Post
                </button>
              </div>

              {/* ===file uploaded=== */}
              {imgUrl.length > 0 ? (
                <div className="files_uploaded_div">
                  <div className="post_div">
                    <textarea
                      id="img-des"
                      name="img-des"
                      placeholder="write about your post..."
                      rows="2"
                      cols="30"
                      value={inputTextarea}
                      onChange={hanldeChangeTrexarea}
                    />
                    {/* <button>Post</button> */}
                  </div>

                  {imgUrl?.map((img) => (
                    <img className="uplaoded_img" src={img} alt="" />
                  ))}

                  {/* ===like/comments=== */}
                  {/* <div className="like_main_div">
                    <div className="like_sub_div">
                      <img className="like" src={likeIcon} alt="like" />
                      <img
                        className="dislike"
                        src={disLikeIcon}
                        alt="dis-like"
                      />
                      <img className="heart" src={heartIcon} alt="heart" />
                    </div>

                    <div className="comment_div">
                      <input
                        type="text"
                        name="comment"
                        placeholder="write comments..."
                      />
                      <button>
                        <img src={sendIcon} alt="send" />
                      </button>
                    </div>
                  </div> */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
