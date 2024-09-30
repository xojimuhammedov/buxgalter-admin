"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
import apiUrl from "@/utils/api";
import NiceSelectThree from "@/utils/NiceSelectThree";

interface FormData {
  user_id: string;
  course_id: string;
}

const CreateServiceMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogImg, setBlogImg] = useState<string>("");
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const [loginError, setloginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    formData.append("course_id", data.course_id);
    formData.append("user_id", data.user_id);

    axios
      .post(`${apiUrl}/courses/user/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
            toast.success(`Foydalanuvchi uchun kurs biriktirildi!🎉`, {
              position: "top-left",
            });
            reset();
            setupload(false);
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          toast.error(`Qaytadan login qiling!`, {
            position: "top-left",
          });
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/courses/main`,{})
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/users`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUsers(res?.data?.data?.data);
      })
      .catch((e) => console.log(e));
  }, []);



  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area ml-[300px] mt-[90px] px-7">
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
           Foydalanuvchi uchun kurs biriktirish
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
           

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Foydalanuvchi tanlang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <select
                      {...register("user_id", {
                        required: "User is required",
                      })}
                      name="user_id">
                      <option selected value="Tanlang">
                       Tanlang
                      </option>
                      {users?.map((item: any, index: any) => (
                        <option key={index} value={item.user_id}>
                          {item.phone_number}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Kurs tanlang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <select
                      {...register("course_id", {
                        required: "Course is required",
                      })}
                      name="course_id">
                      <option selected value="Tanlang">
                       Tanlang
                      </option>
                      {blogs.map((item: any, index: any) => (
                        <option key={index} value={item.course_id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
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
