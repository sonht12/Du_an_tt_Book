import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '@/interface/products';
import { removeFromCart, decreaseProductQuantity, increaseProductQuantity } from '@/app/actions'; 

const Cart: React.FC = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId: any) => {
    dispatch(removeFromCart(productId));
  };

  const increaseQuantity = (productId: any) => {
    dispatch(increaseProductQuantity(productId));
  };

  const decreaseQuantity = (productId: any) => {
    dispatch(decreaseProductQuantity(productId));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className='py-8 px-4 mt-[150px]'>
  <table className="table-auto w-full text-left whitespace-no-wrap">
    <thead>
      <tr className="text-gray-800">
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Hình ảnh</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Tên sản phẩm</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Giá</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Số lượng</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Thành tiền</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Hành động</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <tr key={index} className="bg-white">
            <td className="px-4 py-3">
              <img
                src={item.img}
                alt={`Hình ảnh của ${item.name}`}
                className="w-20 h-20 object-cover rounded"
              />
            </td>
            <td className="px-4 py-3">{item.name}</td>
            <td className="px-4 py-3">{item.price} (Đồng)</td>
            <td className="px-4 py-3">
              <button className="mr-2 text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1" onClick={() => decreaseQuantity(item.id)}>-</button>
              {item.quantity}
              <button className="ml-2 text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1" onClick={() => increaseQuantity(item.id)}>+</button>
            </td>
            <td className="px-4 py-3">{item.price * item.quantity} (Đồng)</td>
            <td className="px-4 py-3">
              <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveFromCart(item.id)}>Xóa</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="text-center py-4">Giỏ hàng trống</td>
        </tr>
      )}
    </tbody>
  </table>
  <div className="total-price mt-4 text-right">
    <span className="text-lg font-semibold">Tổng cộng: </span>
    <span className="text-lg text-blue-500">{totalPrice} (Đồng)</span>
  </div>
</div>
  );
};

export default Cart;
