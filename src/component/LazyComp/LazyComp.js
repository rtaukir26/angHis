const LazyComp = ({ data }) => {
  return (
    <div>
      <img
        className="uplaoded_img"
        src={`data:image/png;base64,${btoa(
          String.fromCharCode(...new Uint8Array(data?.photo?.data?.data))
        )}`}
        alt="display-image"
      />
    </div>
  );
};

export default LazyComp;
