const FileUplaod = ({
  handleChangeFile,
  handleClick_postFiles,
  imgUrl,
  hanldeChangeTrexarea,
  inputTextarea,
}) => {
  return (
    <div className="upload_con">
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
      <div className="textArea_div">
        <textarea
          id="img-des"
          name="img-des"
          placeholder="write about your post..."
          rows="3"
          cols="30"
          value={inputTextarea}
          onChange={hanldeChangeTrexarea}
        />
        {imgUrl && <img src={URL.createObjectURL(imgUrl)} alt="post-image" />}
      </div>
    </div>
  );
};

export default FileUplaod;
