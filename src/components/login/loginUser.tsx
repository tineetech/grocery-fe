"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { StoreIcon, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginSchema } from "../../helper/validation-schema-login";
import type { LoginFormCustomerProps, LoginFormCustomerValues } from "../../types/auth-types";
import Image from "next/image";

const LoginUser: React.FC<LoginFormCustomerProps> = ({ onSubmit, handleGoogleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const initialValues: LoginFormCustomerValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormCustomerValues,
    { setSubmitting }: FormikHelpers<LoginFormCustomerValues>
  ) => {
    try {
      await onSubmit(values);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during login";
      setServerError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 bg-gradient-to-br from-black to-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <StoreIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Login user customer account 
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4 flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    placeholder="jhonyreva@example.com"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  "Sign in Now"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="">
          <div className="text-gray-500 flex flex-row justify-center mb-7">
            <hr className="w-50" />
            <p className="">Or</p>
            <hr className="w-50" />
          </div>
          <button onClick={() => handleGoogleLogin()} className="button flex justify-center items-center gap-3 border hover:bg-gray-100 rounded-md text-black w-full bg-white p-3">
            <Image src="/google.png" alt="google icon" width={20} height={20} />
            <span>Sign With Google</span>
          </button>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-gray-500 text-center mt-4">
          Don&apos;t have a account? <a href="/register-user-customer" className="text-blue-500">Register here.</a>
          <br />
          Forgot password? <a href="/reset-password" className="text-blue-500">Reset password here.</a>
          <br />
          Want to login as super admin? <a href="/login-super-admin" className="text-blue-500">Login Super Admin here.</a>
          {/* Want to login as store admin? <a href="/login-store-admin" className="text-blue-500">Login Store Admin here.</a> */}
          <br />
          This is a secure, encrypted connection. All login attempts are logged.
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
