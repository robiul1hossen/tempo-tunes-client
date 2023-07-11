import React from "react";

const ClientReview = () => {
  return (
    <div>
      <div className="mb-10 mt-20">
        <p className="text-center">
          <small>Students words</small>
        </p>
        <h2 className="text-center text-4xl font-semibold  my-5">What our Students say</h2>
        <p className="text-center    mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br /> ut
          labore et dolore magna aliqua.
        </p>
      </div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="lg:flex">
            <div className="ms-7 flex items-center lg:w-1/2">
              <p className="" style={{ fontSize: "24px", lineHeight: "1.5", color: "#111" }}>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.”
                <p className="fs-2 mt-4 ">David Adam</p>
              </p>
            </div>
            <img src="https://i.ibb.co/10QWDs5/download.png" className="lg:w-1/2" />
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="lg:flex">
            <div className="ms-7 flex items-center lg:w-1/2">
              <p style={{ fontSize: "24px", lineHeight: "1.5", color: "#111" }}>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin pharetra felis
                nec rhoncus. Nam et varius magna, sit amet scelerisque mi. In sit amet eros vel risus
                porttitor convallis. Curabitur in massa in magna posuere viverra. Sed convallis justo eu ”
                <p className="fs-2 mt-4 ">Christopher Nolan</p>
              </p>
            </div>
            <img src="https://i.ibb.co/THxHgRj/choose.png" alt="Second slide" className="lg:w-1/2" />
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div className="lg:flex">
            <div className="ms-7 flex items-center lg:w-1/2">
              <p style={{ fontSize: "24px", lineHeight: "1.5", color: "#111" }}>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.”
                <p className="fs-2 mt-4 ">David Adam</p>
              </p>
            </div>
            <img src="https://i.ibb.co/10QWDs5/download.png" className="lg:w-1/2" />
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <div className="lg:flex">
            <div className="ms-7 flex items-center lg:w-1/2">
              <p style={{ fontSize: "24px", lineHeight: "1.5", color: "#111" }}>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin pharetra felis
                nec rhoncus. Nam et varius magna, sit amet scelerisque mi. In sit amet eros vel risus
                porttitor convallis. Curabitur in massa in magna posuere viverra. Sed convallis justo eu ”
                <p className="fs-2 mt-4 ">Christopher Nolan</p>
              </p>
            </div>
            <img src="https://i.ibb.co/whkZ5Pb/image6.png" className="lg:w-1/2" />
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;
