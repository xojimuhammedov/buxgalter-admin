"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import apiUrl from "@/utils/api";
import { useRouter } from "next/navigation";


interface FormData {
  phone_number: string;
  password: string;
}
const CreateServiceMain = () => {
  const [upload, setupload] = useState<boolean>(false);
  const navigate = useRouter()
  const now = moment();
  const [loginError, setloginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    
    const formData = new FormData();
    
    formData.append('phone_number', data.phone_number); 
    formData.append('password', data.password); 

    axios
      .post(
        `${apiUrl}/users/`,
        formData,
        {
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type":"multipart/form-data", 
          }
        }
      )
      .then((res) => { 
        switch (res.data.message) {
          case "User was created succesfully!":
            toast.success(`Foydalanuvchi yaratildi!🎉`, {
              position: "top-left",
            });
            reset();
            setupload(false);
            navigate.push('/news')
            break; 
          case "custom error":
            reset();
            setupload(false);
            setloginError("something is wrong");
            toast.error(`something is wrong`, {
              position: "top-left",
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 403  || error.response.status === 403) {
          toast.error(`Qaytadan login qiling!`, {
            position: "top-left",
          });
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] ml-[300px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Foydalanuvchi yaratish
          </h4>
          <div className="grid grid-cols-12 gap-x-5"> 
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Phone Number
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="PhoneNumber"
                      {...register("phone_number", {
                        required: "PhoneNumber is required",
                      })}
                    />
                    {errors.phone_number && (
                      <span>{errors.phone_number.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Password
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <span>{errors.password.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>    

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Yaratish
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateServiceMain;
