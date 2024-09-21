"use client"; 
import axios from "axios";
import React, { useEffect, useState } from "react";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import apiUrl from "@/utils/api";

export interface DataType {
  user_id:string
  full_name: string;
  phone_number: string;
}

const BlogList = () => {
  const { header, user } = useGlobalContext();
  const [blogs, setBlogs] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [match, setMatch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);

  const handleDeleteProduct = (id: string) => {
    axios
      .delete(
        `${apiUrl}/users/${id}`,
        header
      )
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          const remainingBlogs = blogs.filter((item) => item.user_id !== id);
          setBlogs(remainingBlogs);
          toast.success(`Foydalanuvchi o'chirildi`, {
            position: "top-left",
          });
        }
        if (res.data.message === "something is wrong") {
          toast.error(`Something Is Wrong`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      });
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/users`, header)
      .then((res) => { 
        setBlogs(res?.data?.data?.data);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, [page, limit]);
  // get search products
  return (
    <>
      <div className="cashier-content-area mt-[100px] ml-[300px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">      

          {blogs?.length ? (
            <>
              <div className="cashier-salereturns-table-area">
                <div className="cashier-salereturns-table-innerD">
                  <div className="cashier-salereturns-table-inner-wrapperD border border-solid border-grayBorder border-b-0 mb-7">
                    <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                   
                      <div className="cashier-salereturns-table-dateF  ml-5">
                        <h5>Foydalanuvchi ismi</h5>
                      </div>  

                      <div className="cashier-salereturns-table-dateF ml-5">
                        <h5>Foydalanuvchi telefon raqami</h5>
                      </div> 
                      

                      <div className="cashier-salereturns-table-actionF">
                        <h5>Action</h5>
                      </div>
                    </div>

                    {blogs?.map((item:any) => (
                      <div
                        key={item.user_id}
                        className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                      >
                       
                        <div className="cashier-salereturns-table-dateF ml-5">
                          <span className="capitalize"> {item.full_name ?? "---"} </span>
                        </div> 

                        <div className="cashier-salereturns-table-dateF ml-5">
                          <span className="capitalize"> {item.phone_number ?? "---"} </span>
                        </div> 
                        

                        <div className="cashier-salereturns-table-actionF">
                          <div className="dropdown">
                          
                          <button
                                onClick={() => handleDeleteProduct(item.user_id)}
                                className="dropdown-menu-item"
                              >
                                <Image src={deleteIcon} alt="icon not found" />
                                <span>Delete</span>
                              </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
               <ChartPreloader/>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
