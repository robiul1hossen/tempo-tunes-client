import React from "react";
import "./Banner.css";
import banner from "../../../assets/banner/banner3.jpg";

const Banner = () => {
  return (
    <div>
      <div className="mt-5 featured w-full h-screen flex items-center">
        <div className="md:flex justify-center items-center z-10 gap-x-10 px-20">
          <div className="w-1/2" data-aos="fade-right">
            {" "}
            <img src={banner} alt="" />
          </div>
          <div className="text-white w-1/2" data-aos="fade-left">
            <h3 className="text-3xl font-bold">Heading Here</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi nisi fuga eaque a, laborum vel
              tempore quia, vero consequuntur sit doloribus nulla omnis hic optio neque iste? Perspiciatis
              vitae voluptatem veritatis officia illum veniam labore!
            </p>
            <div className="z-20">
              <button className="btn btn-outline  mt-3 text-white"> Top Classes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
