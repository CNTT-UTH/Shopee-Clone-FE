import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import images from "@uth/assets/images/sliders";

// Component nút Previous
const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-80"
      onClick={onClick}
    >
      <FaChevronLeft size={20} />
    </button>
  );
};

// Component nút Next
const CustomNextArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-2 hover:bg-opacity-80"
      onClick={onClick}
    >
      <FaChevronRight size={20} />
    </button>
  );
};

export default function ShopeeSlider() {
  const settings = {
    infinite: true, 
    speed: 800, 
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    nextArrow: <CustomNextArrow onClick={() => {}} />, 
    prevArrow: <CustomPrevArrow onClick={() => {}} /> 
  };

  return (
    <div className="bg-white mb-8">
          <div className="container flex justify-center items-center gap-4 p-4 bg-red-white py-8">
        <div className="w-2/3 relative">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-1/3 flex flex-col gap-4">
          <img
            src="https://cf.shopee.vn/file/sg-11134258-7rd6k-m6w177wrd5sr33_xhdpi"
            alt="Fixed Image 1"
            className="w-full h-auto rounded-lg"
          />
          <img
            src="https://cf.shopee.vn/file/sg-11134258-7rd50-m6v789a2ulqyc5_xhdpi"
            alt="Fixed Image 2"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
        </div>
  );
}
