import { Link, useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./client.css";
import {
  AiOutlineUserAdd,
  AiFillHome,
  AiFillPhone,
  AiOutlineMail,
  AiFillCaretRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegCircleUser } from 'react-icons/fa6';
import { Button, Drawer, Input, List } from "antd";
import "../../css/header.css"; 
import {
  BsFacebook,
  BsGithub,
  BsYoutube,
  BsInstagram,
  BsPinAngleFill,
} from "react-icons/bs";
import { Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IUsers } from "@/interface/user";
import { useGetOneUserQuery, useUpdateUserMutation } from "@/Api/userApi";

type UserType = {
  id: number;
  name: string;
  img: string | number;
  email: string;
  // ... other properties if any
} | null;
const LayoutlClinet = () => {
  const { data: productData, error, isLoading } = useGetProductsQuery();

  const { idUser } = useParams<{ idUser: string }>();
  const { data: DataUser } = useGetOneUserQuery(idUser || "");
  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (timer) clearTimeout(timer);

    setShowLoading(true); // Hiển thị biểu tượng loading

    const newTimer = setTimeout(() => {
      setDelayedSearchTerm(searchTerm);
      setShowLoading(false); // Ẩn biểu tượng loading sau 1,5 giây
    }, 1500);

    setTimer(newTimer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchTerm]);


  // ================ của trường xin đấy đừng động vào ===========================
  const headerClass = "bg-emerald-50";
  useEffect(() => {
    const header = document.querySelector(".fixed");

    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          // Kiểm tra xem lớp đã được áp dụng chưa
          const hasClass = header.classList.contains(headerClass);
          if (!hasClass) {
            header.classList.add(headerClass);
          }
        } else {
          header.classList.remove(headerClass);
        }
      };

      // Gọi handleScroll ngay khi effect được gắn kết
      handleScroll();

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [headerClass]);
  // =============================================================================

  const [userInfo, setUserInfo] = useState<UserType>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Xóa tất cả dữ liệu từ localStorage
    localStorage.clear();

    // Navigate to the home page
    navigate('/', { replace: true });

    // Tải lại trang
    window.location.reload(); // This might not be necessary if you're navigating away
  };
  return (
    <>
      {/* <!-- HEADER --> */}
      <div className="welcome-message bg-orange-400">
    <p className="animate-slide">Chào mừng bạn đến với Book Store</p>
</div>
      <header className={`bg-orange-400 mx-auto flex justify-between items-center py-6 px-20 mb-4 mt-0 transition-all w-[100%] z-50 fixed ${headerClass}  `}>
      
        <div className=" ">
          <h2 className="text-[35px] font-extrabold">Book Store</h2>

        </div>
        <nav className="text-lg text-[#000000] font-bold  hidden lg:flex">
          <ul className="flex space-x-12">
            <li className="relative group transition duration-150">
              <a href="/" className=" group-hover:text-blue-600 text-[30px]">
                Home
              </a>
            </li>

            <li className="relative group">

              <a href="/product" className=" group-hover:text-blue-600 text-[30px]">
                Sản phẩm

              </a>
            </li>

            <li className="relative group">
              <a href="#" className=" group-hover:text-blue-600 text-[30px]">
                About us
              </a>
            </li>
            <li className="relative group">
              <a href="/contact" className=" group-hover:text-blue-600 text-[30px]">
                Contact
              </a>
            </li>
          </ul>

        </nav>
        <button className="block lg:hidden ml-[70%] rounded focus:outline-none hover:bg-gray-200 group ">
          <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          <div className="w-5 h-1 bg-gray-600 "></div>
          <div className="absolute top-0 right-0  w-[30%] bg-white border opacity-0 group-focus:right-0 group-focus:opacity-100 transition-all duration-1000">
            <ul className="place-content-start flex flex-col items-center w-full text-base cursor-pointer pt-10">
              <div
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="text-center">

                  <FaRegCircleUser
                    style={{ fontSize: "32px", marginLeft: "15px" }}
                  />
                </div>
                {isMenuOpen && (
                  <div
                    className="border rounded-xl"
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Link to={`/profile/${userInfo && (userInfo.data ? userInfo.data._id : userInfo.userData._id)}`}>
                      {" "}
                      <div
                        className="hover:bg-[#0B7077] hover:text-white  rounded-xl"
                        style={{ padding: "10px 20px" }}
                      >
                        Profile
                      </div>
                    </Link>


                    <Link to="/changePassword">
                      {" "}
                      <div
                        className="hover:bg-[#0B7077] hover:text-white  rounded-xl"
                        style={{ padding: "10px 20px" }}
                      >
                        Đổi mật khẩu
                      </div>
                    </Link>
                    <button
                      className="hover:bg-[#0B7077]  hover:text-white   rounded-xl"
                      style={{ padding: "10px 20px" }}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>


                  </div>
                )}
                <span>{userInfo ? (userInfo.data ? userInfo.data.name : userInfo?.userData ? userInfo.userData.name : '') : ''}</span>


              </div>
              <div className="line"></div>
              <a href="/"><li className=" hover:bg-[#0B7077] hover:text-white rounded-2xl py-4 px-6 w-full">Home</li></a>
              <a href="/product"><li className=" hover:bg-[#0B7077] hover:text-white rounded-2xl py-4 px-6 w-full">Course</li></a>
              <a href="#"><li className=" hover:bg-[#0B7077] hover:text-white rounded-2xl py-4 px-6 w-full">Blog</li></a>
              <a href="#"><li className=" hover:bg-[#0B7077] hover:text-white rounded-2xl py-4 px-6 w-full">About us</li></a>
              <a href="/contact"><li className=" hover:bg-[#0B7077] hover:text-white rounded-2xl py-4 px-6 w-full">Contact</li></a>
            </ul>

          </div>
        </button>
       
        <div className="items-center space-x-4 flex hidden lg:flex">
        <Link to="/cart" className="cart-icon-link">
          <AiOutlineShoppingCart style={{ fontSize: '24px' }} />
        </Link>
          <div className="relative ">
            <Input
              className="text-white w-[200px] rounded-full border border-[#0B7077] hover:border-red-500 text-sm"
              placeholder="Tìm kiếm"
              prefix={
                showLoading ? (
                  <Spin />
                ) : (
                  <SearchOutlined className="text-[18px]  mr-2 text-gray-500 " />
                )
              }
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />

            <div className="absolute bg-white mt-2 w-full rounded-lg z-10  ">

              {/* Hiển thị kết quả tìm kiếm của sản phẩm */}
              {delayedSearchTerm &&
                productData &&
                productData.data.filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length > 0 && (
                  <>
                    <p className="text-xl ml-2">Sản phẩm</p>
                    {productData.data
                      .filter((val) => {
                        if (
                          val.name
                            .toLowerCase()
                            .includes(delayedSearchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((product: IProduct) => (
                        <div
                          key={product._id}
                          className="bg-white rounded-lg hover:border hover:shadow-md overflow-hidden  hover:scale-105 transition ease-out duration-500"
                        >
                          <Link to={`/detail/${product._id}`} className=" ">
                            <div className="p-2 flex ">
                              <img
                                className="w-[50px] h-[50px] rounded-full"
                                src={product.img}
                                alt=""
                              />
                              <h2 className="text-base text-center  ml-2">
                                {product.name}
                              </h2>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </>
                )}
              {delayedSearchTerm &&
                productData &&
                productData.data.filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length === 0 && (
                  <p className="p-4">
                    Không tìm thấy sản phẩm cho từ khóa bạn tìm.
                  </p>
                )}



            </div>
          </div>

          {userInfo ? (
            <>
              <div
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="text-center">

                  <FaRegCircleUser
                    style={{ fontSize: "32px", marginLeft: "15px" }}
                  />
                </div>
                {isMenuOpen && (
                  <div
                    className="border rounded-xl"
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Link to={`/profile/${userInfo && (userInfo.data ? userInfo.data._id : userInfo.userData._id)}`}>
                      {" "}
                      <div
                        className="hover:bg-[#0B7077] hover:text-white  rounded-xl"
                        style={{ padding: "10px 20px" }}
                      >
                        Profile
                      </div>
                    </Link>


                    <Link to="/changePassword">
                      {" "}
                      <div
                        className="hover:bg-[#0B7077] hover:text-white  rounded-xl"
                        style={{ padding: "10px 20px" }}
                      >
                        Đổi mật khẩu
                      </div>
                    </Link>
                    <button
                      className="hover:bg-[#0B7077]  hover:text-white   rounded-xl"
                      style={{ padding: "10px 20px" }}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>

                  </div>
                )}
                <span>{userInfo ? (userInfo.data ? userInfo.data.name : userInfo?.userData ? userInfo.userData.name : '') : ''}</span>


              </div>
            </>
          ) : (
            <>
              <Link to="signin">
                <button className="bg-white text-[#0B7077] px-4 py-2 rounded-[10px] hover:bg-[#0B7077] hover:text-white">
                  Đăng nhập
                </button>
              </Link>
              <Link to="signup">
                <button className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#0B7077] hover:text-white">
                  Đăng Ký
                </button>
              </Link>
            </>
          )}

        </div>
      </header>

      {/* =========================== */}
      <Outlet />
      {/* =========================== */}

      <footer className="relative text-white bg-cover bg-center bg-[#b1b1af] py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto">
          <div className=" ml-[10%] flex  flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 md:space-x-16 lg:space-x-20 text-black ">
            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Thông tin liên hệ</p>
              <p className="text-sm mt-4 flex items-center">
                <AiFillHome className=" text-[14px] mr-1" />
                Address: Số 1 Phố Trịnh Văn Bô
              </p>
              <p className="text-sm flex items-center">
                <AiOutlineMail className=" text-[13px] mr-1" />
                Email: strongcode@gmail.com
              </p>
              <p className="text-sm flex items-center">
                <AiFillPhone className="text-[15px] mr-1" />
                Hotline: 1800000
              </p>
              <p className="text-xl mt-2 font-bold">
                Đăng ký để nhận thông tin mới nhất
              </p>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-[200px] py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="mt-2 ml-5 bg-black hover:bg-yellow-500 text-white py-2 px-4 rounded-full"
                >
                  Đăng ký
                </button>
              </form>
            </div>

            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Liên kết nhanh</p>
              <p className="mt-4 text-sm">
                <a href="/" className="flex items-center">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1" />
                  Trang chủ
                </a>
              </p>
              <p className="text-sm">
                <a href="/product" className="flex items-center">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1" />
                  Khóa học
                </a>
              </p>
              <p className="text-sm">
                <a href="#" className="flex items-center">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1" />
                  Dịch vụ
                </a>
              </p>
              <p className="text-sm">
                <a href="/contact" className="flex items-center">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1" />
                  Liên hệ
                </a>
              </p>
            </div>

            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Theo dõi chúng tôi</p>
              <p className="mt-4 text-sm">
                <a href="https://www.facebook.com/photo.php?fbid=546379440492747&set=pb.100053620882304.-2207520000&type=3" className="flex items-center">
                  <BsFacebook className="mt-1.5 text-[14px] mr-1" />
                  Facebook
                </a>
              </p>
              <p className="text-sm">
                <a href="" className="flex items-center">
                  <BsGithub className="mt-1.5 text-[14px] mr-1" />
                  Github
                </a>
              </p>
              <p className="text-sm">
                <a href="" className="flex items-center">
                  <BsYoutube className="mt-2 text-[14px] mr-1" />
                  Youtube
                </a>
              </p>
              <p className="text-sm">
                <a href="" className="flex items-center">
                  <BsInstagram className="mt-1.5 text-[14px] mr-1" />
                  Instagram
                </a>
              </p>
            </div>

            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Phương thức thanh toán</p>
              <p>Thanh toán qua Momo, Zalopay</p>
              <div className="flex mt-2 mb-2">
                <img className="w-10 mr-4" src="../../../public/img/momo.png" alt="" />
                <img className="w-10" src="../../../public/img/zalopay.png" alt="" />
              </div>
              <p>Thanh toán qua ngân hàng nội địa</p>
              <div className="flex mt-2">
                <img className="w-20 h-10 mt-2 mr-2" src="../../../public/img/vcb.png" alt="" />
                <img className="w-20 h-10 mt-2 mr-2" src="../../../public/img/mb.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vietin.png" alt="" />
              </div>
              <div className="flex">
                <img className="w-20 mr-2" src="../../../public/img/tech.png" alt="" />
                <img className="w-20 h-4 mt-6 mr-2" src="../../../public/img/agr.png" alt="" />
                <img className="w-20 h-4 mt-5 mr-2" src="../../../public/img/bidv.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <img src="../../../public/img/anh2.svg" alt="" className="absolute bottom-0 right-0" />
        <div className="text-center text-[#0B7077] mt-8">

        </div>
      </footer>

    </>
  );
};

export default LayoutlClinet;
