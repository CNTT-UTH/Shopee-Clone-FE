import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Category } from "@uth/types/category.type";

 

// Custom nút Previous
const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-80"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

// Custom nút Next
const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-80"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

const width = window.innerWidth
export default function CategorySlider({Categories}: {Categories: Category[]}) {
  const settings = {
    dots: false,  
    infinite: false,   
    speed: 500,  
    slidesToShow: width >= 768 ? 6 : 4, 
    slidesToScroll: width >= 768 ? 6 : 4,  
    rows: 2, 
    nextArrow: <CustomNextArrow onClick={() => {}} />, 
    prevArrow: <CustomPrevArrow onClick={() => {}} />,  
  };

  return (
    <div className="bg-white p-6 rounded-lg relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4">DANH MỤC</h2>
      <Slider {...settings}>
        {Categories && Categories.map((category, index) => (
          <div key={index} className="p-2">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg transition cursor-pointer border shadow-sm hover:shadow-xl hover:-translate-y-[0.25rem]">
              <img
                src={category.image_url}
                alt={category.name}
                className="w-16 h-16 object-contain rounded-full"
              />
                <p className="mt-2 text-sm text-gray-700 text-center truncate w-[100%]">
                  {category.name}
                </p> 
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
