import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from '@/helper/supabase-config';
import { toast } from "react-toastify";
import { ValuesSetPassAccGoogle } from "@/types/setpass-types";

const base_url_be = process.env.NEXT_PUBLIC_BASE_URL_BE;

const ProfileServices = () => {
  const router = useRouter();
  const defaultAvatar = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  const [profile, setProfile] = useState({
    avatar: "",
    username: "Loading..",
    userId: "Loading..",
    firstName: "Loading..",
    lastName: "Loading..",
    email: "Loading..",
    phone: 0,
    password: "Loading..",
    role: "Loading..",
    status: "Loading..",
  });

  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const [newFile, setNewFile] = useState({ file: null, url: "" });

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const res = await fetch(`${base_url_be}/customer/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        const { data } = await res.json();
        setProfile(prev => ({
          ...prev, avatar: data.avatar || defaultAvatar, username: data.username ?? "", password: data.password ?? "", userId: data.user_id, firstName: data.first_name ?? "", lastName: data.last_name ?? "", email: data.email ?? "", phone: data.phone ?? "", role: data.role, status: data.verified ? "Aktif" : "Tidak Aktif",
        }));
      }
    } catch {
      showToast("Failed to get user data.", "error");
    }
  };

  const saveChanges = async () => {
    try {
      const res = await fetch(`${base_url_be}/customer/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstName: profile.firstName, lastName: profile.lastName, email: profile.email, phone: profile.phone,
        }),
      });
      if (res.ok) {
        showToast("Profile updated successfully.", "success", () => router.push("/profile"));
      }
    } catch {
      showToast("Failed to update profile.", "error");
    }
  };

  const setPasswordHandle = async (values: ValuesSetPassAccGoogle) => {
    try {
      const res = await fetch(`${base_url_be}/customer/profile/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: values.password, confirmPassword: values.password
        }),
      });
      if (res.ok) {
        showToast("Profile updated successfully.", "success", () => location.reload());
      }
    } catch {
      showToast("Failed to update profile.", "error");
    }
  };

  const handlePickImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!validateFileSize(file)) return;

    const fileURL = URL.createObjectURL(file);
    setNewFile({ file, url: fileURL });
    setIsChangeAvatar(true);
  };

  const handleChangeAvatar = async () => {
    if (!newFile.file) return;
    try {
      await removeOldAvatar();
      const filePath = await uploadNewAvatar(newFile.file);
      await updateAvatarInDb(filePath);
      showToast("Avatar updated successfully.", "success", () => location.reload());
    } catch {
      showToast("Failed to update avatar.", "error");
    }
  };

  const validateFileSize = (file) => {
    const maxSize = 1 * 1024 * 1024; // 1 MB
    if (file.size > maxSize) {
      showToast("Max file size is 1MB. Please select another file.", "error");
      return false;
    }
    return true;
  };

  const removeOldAvatar = async () => {
    if (profile.avatar === defaultAvatar) return;
    const oldFilePath = profile.avatar.replace(`${process.env.NEXT_PUBLIC_BASE_URL_SUPABASE}/storage/v1/object/public/user_avatar/`, "");
    const { error } = await supabase.storage.from("user_avatar").remove([oldFilePath]);
    if (error) throw new Error("Failed to delete old image.");
  };

  const uploadNewAvatar = async (file) => {
    const extension = file.name.split(".").pop();
    const filePath = `user-${Date.now()}.${extension}`;
    const { data, error } = await supabase.storage.from("user_avatar").upload(filePath, file, { cacheControl: "3600" });
    if (error) throw error;
    return filePath;
  };

  const updateAvatarInDb = async (filePath) => {
    const res = await fetch(`${base_url_be}/customer/profile/avatar/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar: `${process.env.NEXT_PUBLIC_BASE_URL_SUPABASE}/storage/v1/object/public/user_avatar/${filePath}`,
      }),
    });
    if (!res.ok) throw new Error("Failed to update avatar in database.");
  };

  const showToast = (message, type, onClose = null) => {
    toast.dismiss();
    toast[type](message, {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
      hideProgressBar: false,
      onClose,
    });
  };

  return {
    profile,
    isChangeAvatar,
    newFile,
    setProfile,
    setPasswordHandle,
    getDataUser,
    saveChanges,
    handlePickImage,
    handleChangeAvatar,
  };
};

export default ProfileServices;
