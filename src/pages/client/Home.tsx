import { useGetProductsQuery, useGetProductsByPriceQuery, useGetProductsFreeQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addToCart } from "@/app/actions";
import { RaceBy } from '@uiball/loaders'
import SLider1 from '../../../public/img/mau-banner-quang-cao-khuyen-mai.jpg'
import SLider2 from '../../../public/img/Banner-sach-moi-xuat-ban-thang-7 (1).png'
import SLider3 from '../../../public/img/banner1.jpg'
import SLider4 from '../../../public/img/thiet-ke-bia-sach-chuyen-nghep-baabrand-4.jpg'
import SLider5 from '../../../public/img/PODIUM_RED_1.jpg'
import SLider6 from '../../../public/img/banner-truyện-trọn-bộ.gif'
import SLider7 from '../../../public/img/banner_sach_phat_trien_nang_luc_copy_e8a1cddc3f88484ca1b7f05dc9248a6e_grande.jpg'
import SLider8 from '../../../public/img/thiet-ke-bia-sach-chuyen-nghep-baabrand-4.jpg'
import { Empty } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const List_khoa_hoc = () => {
  const { data: productData, error, isLoading: productIsLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  console.log(handleAddToCart);

  const { data: productFree } = useGetProductsFreeQuery();//sản phẩm có giá = 0
  const [showFullDescription, setShowFullDescription] = useState(false); // Đặt showFullDescription ở đây
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const customPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const customNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  
  const navigate = useNavigate();
  const renderCourseList = () => {
    if (isLoading) {
      return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
        <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
      </div>
    }

    if (error) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    if (!productData || !productData.data || productData.data.length === 0) {
      return <p>No courses available</p>;
    }
    const isLoggedIn = !!localStorage.getItem('userInfo');
    const handlePurchase = () => {
      const isLoggedIn = !!localStorage.getItem('userInfo');


      if (!isLoggedIn) {
        // Show a message that user needs to login
        alert('Bạn cần đăng nhập để tiếp tục mua hàng!');
        window.location.href = '/signin';
        return;
      }

      // ... your purchase logic here (if the user is logged in)
    }
    const handleClick = (product: any) => {
      if (product.price === "0" || product.price.toLowerCase() === "Miễn phí") {
        // Use your routing method to navigate to the lesson page
        navigate(`/detail/${product._id}`);
      } else {
        handlePurchase();
        navigate(`/pay/${product._id}`);
      }
    }
    return (
      <div className="pt-[30px]">
        <>
          <div>
            <h1 className=" font-bold text-[35px] text-center py-4">Sản Phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 m-auto mb-8 max-w-7xl ">
              {productData?.data?.map((product: any) => (
                <div
                  key={product._id}
                  className="border-2 p-2 group mb-8 bg-white rounded-lg max-w-[296px] transition-transform transform hover:scale-95 hover:shadow-xl border-gray-200"
                >
                  <Link to={`/detail/${product._id}`} className="">
                    <div className="block relative">
                      <div className="rounded-t-lg overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full text-[10px] h-[300px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
                        />
                        <img src="" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 hover:bg-orange-600 transition-opacity rounded-full ">
                          Xem chi tiết 
                        </button>

                      </div>
                    </div>
                    </Link>
                    <div className="p-2">
                      <h2 className="text-[28px] font-bold text-center mt-4  text-black">
                        {product.name.length <= 25
                          ? product.name
                          : product.name.slice(0, 25) + " ..."}
                      </h2>
                      <div className=" mt-2  max-w-[278px]">
                        <div className=" text-base font-bold mt-1">
                          <p className="text-red-600 text-[15px]">
                            {product.price === "0" ? 'Miễn phí' : `${parseFloat(product.price).toLocaleString('vi-VN')}đ`}
                          </p>
                          <div className="flex justify-center px-4 py-2">
                          <button className="bg-red-400 hover:bg-blue-600 flex-1 w-64" >Mua</button>
                          <p className="bg-red-400 ">|</p>
                          <button className="bg-red-400 hover:bg-blue-600 flex-1 w-64" onClick={() => handleAddToCart(product)}>Thêm vào giỏ</button>
                          </div>
                         
                        </div>
                       
                      </div>
                    </div>
                  

                </div>

              ))}
            </div>


          </div>
        </>
       
      </div>
    );
  };

  return (
    <>
      
      <main className="container mx-auto p-2 ">
        <div className="flex justify-start">
        <div className="relative py-40 w-[900px] h-[500px] ">
          <Slider {...settings} ref={sliderRef}>
            <div className="slide">
              <img src={SLider1} alt="Image 1" className="w-screen max-h-96" />
            </div>
            <div className="slide">
              <img src={SLider2} alt="Image 2" className="w-screen max-h-96" />
            </div>
            <div className="slide">
              <img src={SLider3} alt="Image 3" className="w-screen max-h-96" />
            </div>
            <div className="slide">
              <img src={SLider4} alt="Image 4" className="w-screen max-h-96" />
            </div>
          </Slider>
          <button onClick={customPrev} className="prev-button"><MdNavigateBefore /></button>
          <button onClick={customNext} className="next-button"><MdNavigateNext /></button>
        </div>
        <div className="pt-[160px] grid gap-x-8 gap-y-4 grid-cols-2 pl-2">
          <img src={SLider5} alt="" className="w-[300px] h-[182px] rounded-md" />
          <img src={SLider6} alt="" className="w-[300px] h-[182px] rounded-md" />
          <img src={SLider7} alt="" className="w-[300px]  h-[182px] rounded-md" />
          <img src={SLider8} alt="" className="w-[300px] h-[182px] rounded-md" />
        </div>
        </div>
      
        {renderCourseList()}

        
        {/* <!-- =============== --> */}
       
      

        
      </main>
    </>
  );
};

export default List_khoa_hoc;