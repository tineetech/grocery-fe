import { ordersCust } from '@/components/hooks/OrdersCust';
import { Orders } from '@/types/orders-types';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const base_url_be = process.env.NEXT_PUBLIC_BASE_URL_BE;

const services3 = () => {
  const [ordersData, setOrdersData] = useState<Orders[]>([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    getOrders();
  }, []);
    
  const showToast = (message, type, closeTime = 3000, onClose = null) => {
  toast.dismiss();
  toast[type](message, {
      position: "bottom-right",
      autoClose: closeTime,
      theme: "colored",
      hideProgressBar: false,
      onClose,
  });
  };

  const getOrders = async () => {
    setLoad(true)
    try {
        const data = await ordersCust.getOrders()
        console.log(data)
        if (data) {
        setLoad(false)
        setOrdersData(data);
      }
    } catch {
      showToast("Failed to get orders data.", "error");
    }
  }
  
  return {
    load,
    ordersData,
    setOrdersData,
  }
}

export default services3