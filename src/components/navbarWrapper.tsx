"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { useEffect } from "react";

export default function NavbarWrapper() {
  const pathname = usePathname();
  useEffect(() => {
    if (!localStorage.getItem('first_new_update')) {
      localStorage.setItem('first_new_update', "true")
      localStorage.removeItem('token')
      localStorage.removeItem('is_login')
      localStorage.removeItem('exp_token')
      console.log('success updated and set to firebase')
    }
    console.log('now going in new version web application')
  })

  // Untuk misahin navbar customer dan promotor
  const noNavbarRoutes = [
    "/dashboard-superAdmin",
    "/dashboard-superAdmin/store/create-store",
    "/dashboard-superAdmin/store",
    "/dashboard-superAdmin/user",
    "/dashboard-superAdmin/categories",
    "/dashboard-superAdmin/product",
    "/dashboard-superAdmin/inventory",
    "/dashboard-storeAdmin",
  ];

  return noNavbarRoutes.includes(pathname) ? null : <Navbar />;
}
