import EidIcon1 from "../../assets/images/bannerImg/bn1.JPG";
import EidIcon2 from "../../assets/images/bannerImg/bn2.JPG";
import EidIcon3 from "../../assets/images/bannerImg/bn3.jpg";
import EidIcon4 from "../../assets/images/bannerImg/bn4.JPG";
import DiwaliIcon1 from "../../assets/images/bannerImg/bn2.JPG";
import DiwaliIcon2 from "../../assets/images/bannerImg/bn1.JPG";
import DiwaliIcon3 from "../../assets/images/bannerImg/bn1.JPG";
import DiwaliIcon4 from "../../assets/images/bannerImg/bn12.JPG";
import { useEffect, useState } from "react";

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

const Banner = () => {
  const [dynamicImgClass, setDynamicImgClass] = useState("banner_img1");
  const [image, setImage] = useState([]); //For banner

  // imges changes dynamacally, loader
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
  return (
    <div className="banner_div">
      <div className={`banner1 ${dynamicImgClass}`}>
        <img
          // className="banner_img1"
          src={image?.imgName ? image?.imgName : bannerEidImg[0]?.imgName}
          alt="b1"
        />
      </div>
      <div className="banner1">
        <img src={bannerDiwaliImg[0].imgName} alt="banner2" />
      </div>
      <div className="banner1">
        <img src={bannerDiwaliImg[2].imgName} alt="banner2" />
      </div>
    </div>
  );
};

export default Banner;
