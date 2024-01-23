import likeIcon from "../../assets/images/like2.png";
import disLikeIcon from "../../assets/images/dislike.png";
import heartIcon from "../../assets/images/heart.png";
import sendIcon from "../../assets/images/sendIcon.png";

const RenderPost = ({
  allProducts,
  handleClickOnLikes,
  handleClickSendComment,
  hanldeChangeComment,
  postComment,
}) => {
  return (
    <div className="files_uploaded_body">
      {allProducts?.map((item, i) => (
        <div className="body_wrapper" key={item._id}>
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
                onClick={() => handleClickOnLikes("like", item._id)}
              >
                <img name="like" className="like" src={likeIcon} alt="like" />
                <small>{item?.likes?.totalLikes}</small>
              </span>
              <span
                className="likes_common_span"
                onClick={() => handleClickOnLikes("dislike", item._id)}
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
                onClick={() => handleClickOnLikes("heart", item._id)}
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
                    item?._id === postComment.name ? postComment.comment : ""
                  }
                  placeholder="write comments..."
                  onChange={hanldeChangeComment}
                />
                <button
                  disabled={
                    postComment.comment === "" || postComment.name !== item?._id
                  }
                  onClick={() => handleClickSendComment(item._id)}
                >
                  <img src={sendIcon} alt="send" />
                </button>
              </div>
              {item.comments.map((comment, i) => {
                return <span key={i}>{comment}</span>;
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderPost;
