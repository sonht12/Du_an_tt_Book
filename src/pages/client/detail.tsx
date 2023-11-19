import React, { useEffect, useState } from "react";
import { useGetProductByIdQuery, useGetProductsQuery } from "@/Api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { RaceBy } from '@uiball/loaders';
import { Link } from "react-router-dom";
import { useGetOneUserQuery } from "@/Api/userApi";
import { useAddCommentMutation, useGetCoursesForIdproductQuery } from "@/Api/CommentApi";

const ProductDetail = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const idUser = userInfo.userData?._id || "";
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading: productIsLoading, isError } = useGetProductByIdQuery(idProduct || "");
  const { data: productDataAll } = useGetProductsQuery();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { data: userData } = useGetOneUserQuery(idUser);
  const [addComment] = useAddCommentMutation();
  const [commentadd, setComment] = useState(""); // State để lưu giá trị của input comment
  const { data: commentData } = useGetCoursesForIdproductQuery(idProduct);
  const handleCommentChange = (event) => {
    setComment(event.target.value); // Cập nhật giá trị comment mỗi khi người dùng nhập vào input
  };
  const isUserLoggedIn = Boolean(idUser);

  const handleCommentSubmit = async () => {
    try {
      // Sử dụng mutation để thêm comment vào API
      const response = await addComment({
        userId: idUser,
        nameuser:userData?.name,
        productId:idProduct,
        content: commentadd
      });
      // Sau khi gửi comment, có thể cần cập nhật giao diện hoặc làm những công việc khác
      setComment('');
    } catch (error) {
      console.error("Lỗi khi thêm comment:", error);
    }
  };
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
        <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
      </div>
    );
  }

  return (
    <div className=" pt-[88px] bg-white relative ">
      <div className="bg-[#D2E6E4] h-[106px] w-full absolute top-0 "></div>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-t-lg py-10 px-4 mt-10 ">
          <div className="grid grid-cols-2 ">
            <div>
              <img
                src={productData?.data.img}
                alt={productData?.data.name}
                className="w-[500px] h-[400px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-[40px]">Name:{productData?.data.name}</h2>
              <h2 className="text-[40px] text-red-400">Tác giả: {productData?.data.author}</h2>
              <h2 className="text-[40px] text-red-400">Mô tả: {productData?.data.description}</h2>
              <p className="text-red-900 text-[30px] font-bold">Gía: {productData?.data.price}đ</p>
            </div>
          </div>
        </div>
        <div className="rounded-t-lg py-24 px-10 mt-10 ">
          <h2 className="text-[40px] font-bold">Thông tin sản phẩm</h2>
          <div className="flex space-x-64">
            <div>
              <h2>Độ Tuổi</h2>
              <h2>Tên Nhà Cung Cấp</h2>
              <h2>Tác giả</h2>
              <h2>Người Dịch</h2>
              <h2>NXB</h2>
              <h2>Năm XB</h2>
              <h2>Ngôn Ngữ</h2>
              <h2>Trọng lượng (gr)</h2>
              <h2>Kích Thước Bao Bì</h2>
              <h2>Số trang</h2>
              <h2>Hình thức</h2>
            </div>
            <div>

              <h2>	16+</h2>
              <h2>Nhà Xuất Bản Kim Đồng</h2>
              <h2>	Ao Jyumonji, Eiri Shirai</h2>
              <h2>Hồ Trung Đức</h2>
              <h2>Kim Đồng</h2>
              <h2>2023</h2>
              <h2>	Tiếng Việt</h2>
              <h2>870</h2>
              <h2>	19 x 13 x 4 cm</h2>
              <h2>	752</h2>
              <h2>	Bìa mềm</h2>
            </div>
          </div>
        </div>
        <div className="rounded-t-lg py-24 px-10 mt-10 flex justify-start ">
          {productDataAll?.data?.map((product: any) => (
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
                    <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <h2 className="text-[18px]  mt-4  text-[#6c6d6d]">
                    {product.name.length <= 25
                      ? product.name
                      : product.name.slice(0, 25) + " ..."}
                  </h2>
                  <div className=" mt-2  max-w-[278px]">
                    <div className=" text-base font-bold mt-1">
                      <p className="text-red-600 text-[15px]">
                        {product.price === "0" ? 'Miễn phí' : `${parseFloat(product.price).toLocaleString('vi-VN')}đ`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4">
        {isUserLoggedIn && (
          <div className="flex items-start space-x-2 mb-6 ">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{userData?.name}</p>
            </div>
          </div>
        )}
        {isUserLoggedIn && (
          <>
            <input
              className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300 px-4"
              placeholder="Viết bình luận của bạn..."
              value={commentadd}
              onChange={handleCommentChange}
            />
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md"
                onClick={handleCommentSubmit}
              >
                Gửi bình luận
              </button>
            </div>
          </>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
          {commentData?.map((comment) => (
            <div key={comment._id} className="border p-4 mb-4">
              <div className="flex items-start space-x-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{comment?.nameuser}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;