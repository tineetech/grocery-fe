import { useAddressCustomer } from '@/components/hooks/useAddressCustomer';
import { Address, AddressAdd } from '@/types/address-types';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const base_url_be = process.env.NEXT_PUBLIC_BASE_URL_BE;
type ToastType = "success" | "error" | "info" | "warning";
const services2 = () => {
  const [addressData, setAddressData] = useState<Address[]>([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    getAddress();
  }, []);
    
  const showToast = (message: string, type: ToastType, closeTime = 3000, onClose?: () => void) => {
  toast.dismiss();
  toast[type](message, {
      position: "bottom-right",
      autoClose: closeTime,
      theme: "colored",
      hideProgressBar: false,
      onClose,
  });
  };

  const getAddress = async () => {
    setLoad(true)
    try {
        const data = await useAddressCustomer.getAddress()
        if (data) {
        setLoad(false)
        setAddressData(data.data);
      }
    } catch {
      showToast("Failed to get user data.", "error");
    }
  }
    
  const addAddress = async (formData: AddressAdd) => {
    try {
        const data = await useAddressCustomer.createAddress(formData)
        if (data) {
            showToast(data.message, "success", () => location.reload());
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    } catch {
      showToast("Failed to Create new address.", "error");
    }

  };
    
  const setPrimaryAddressEdit = async (addres_id: number) => {
    try {
        const data = await useAddressCustomer.updatePrimaryAddress(addres_id)
        console.log(data)
        if (data.status === "success") {
            showToast(data.message, "success", () => location.reload());
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    } catch (error) {
      showToast("Failed to Edit address, " + error, "error");
    }

  };
    
  const editAddress = async (addres_id: number, formData: Address) => {
    try {
        const data = await useAddressCustomer.updateAddress(addres_id, formData)
        console.log(data)
        if (data.status === "success") {
            showToast(data.message, "success", () => location.reload());
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    } catch (error) {
      showToast("Failed to Edit address, " + error, "error");
    }

  };

  const deleteAddress = async (address_id: number) => {
    try {
        const data = await useAddressCustomer.deleteAddress(address_id)
        console.log("tes" + data)
        if (data.ok) {
            showToast("Success Delete Address.", "success", 1500, () => location.reload());
        }
    } catch {
      showToast("Failed to delete address.", "error");
    }

  };
  return {
    load,
    addressData,
    setAddressData,
    setPrimaryAddressEdit,
    addAddress,
    editAddress,
    deleteAddress
  }
}

export default services2