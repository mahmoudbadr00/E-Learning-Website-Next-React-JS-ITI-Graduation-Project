"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import "./CoursePage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";

import { CourseBuyerContext } from "./../../BuyerContext";
const Page = ({ params }) => {
  let {
    courseBuyerCart,
    setCourseBuyerCart,
    courseBuyerWish,
    setCourseBuyerWish,
  } = useContext(CourseBuyerContext);
  const [courses, setCourses] = useState();
  const { push } = useRouter();
  const [cTitle, setCTitle] = useState("");
  const [cPrice, setCPrice] = useState(0);
  const [cImage, setCImage] = useState("");
  const [cDetails, setCDetails] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  console.log(courseBuyerCart);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCTitle(result.title);
        setCPrice(result.price);
        setCDetails(result.details);
        setCImage(result.image);
        setCInstructor(result.instructor);
        setCourses(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const savedCart = localStorage.getItem("courseBuyerCart");
    if (savedCart) {
      setCourseBuyerCart(JSON.parse(savedCart));
    }

    const savedWish = localStorage.getItem("courseBuyerWish");
    if (savedWish) {
      setCourseBuyerWish(JSON.parse(savedWish));
    }
  }, []);
  function addCourse() {
    const isAlreadyInCart = courseBuyerCart.some(
      (item) => item.id === courses.id
    );

    if (isAlreadyInCart) {
      Swal.fire({
        position: "center-center",
        icon: "info",
        title: "This course is already in your Course Cart",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem(
        "courseBuyerCart",
        JSON.stringify([...courseBuyerCart, courses])
      );
      push(`/buyer`);
    } else {
      setCourseBuyerCart((prevCart) => [...prevCart, courses]);

      console.log(courseBuyerCart);

      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Course added to cart successfully to Course Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    push(`/buyer`);
  }
  function addCourseWish() {
    const isAlreadyInCart = courseBuyerWish.some(
      (item) => item.id === courses.id
    );

    if (isAlreadyInCart) {
      Swal.fire({
        position: "center-center",
        icon: "info",
        title: "This course is already in your Course Wish list",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem(
        "courseBuyerWish",
        JSON.stringify([...courseBuyerWish, courses])
      );
      push(`/buyer`);
    } else {
      setCourseBuyerWish((prevCart) => [...prevCart, courses]);

      console.log(courseBuyerWish);

      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Course added to cart successfully to course Wish List",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    push(`/buyer`);
  }
  ///////////////////////////////////////////
  const productDetailItem = {
    images: [
      {
        original: `${cImage}`,
      },
    ],
    title: `${cTitle}`,
    reviews: "150",
    // availability: true,
    instructor: `${cInstructor}`,
    duration: "22 hours",
    // sku: "BE45VGTRK",
    price: `${cPrice}`,
    previousPrice: `${parseInt(cPrice) + 500}`,
    description: `${cDetails}`,
    language: ["Ar", "En"],
    // color: ["gray", "violet", "red"],
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  ///////////////////////////////////////////
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container mx-auto px-4">
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={productDetailItem.images}
          additionalClass="custom-image-gallery"
        />
        {/* /image gallery  */}
      </div>
      {/* description  */}
      <div className="mx-auto text-color px-5 lg:px-5">
        <h2 className="pt-3 text-3xl font-bold lg:pt-0">
          {productDetailItem.title}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{
                fontSize: "20px",
                display: "flex",
                flexDirection: "row",
              }}
              total={5}
              interactive={false}
              rating={3}
            />
            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div>

        <p className="font-bold">
          Instructor:{" "}
          <span className="font-normal">{productDetailItem.instructor}</span>
        </p>
        <p className="font-bold">
          Duration:{" "}
          <span className="font-normal">{productDetailItem.duration}</span>
        </p>

        <p className="mt-4 text-4xl font-bold text-violet-900">
          ${productDetailItem.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${productDetailItem.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {productDetailItem.description}
        </p>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Language</p>
          <div className="flex gap-1">
            {productDetailItem.language.map((x, index) => (
              <div
                key={index}
                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-row items-center gap-6">
          <button
            onClick={addCourse}
            className="flex h-12 w-40 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
          >
            <BiShoppingBag className="text-lg mr-2" />
            Add to cart
          </button>
          <button
            onClick={addCourseWish}
            className="flex h-12 w-40 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
          >
            <AiOutlineHeart className="text-lg mr-2" />
            Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
