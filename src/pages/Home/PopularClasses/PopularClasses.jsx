import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PopularClasses = () => {
  const [popular, setPopular] = useState([]);
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    fetch("https://tempo-tunes-server.vercel.app/classes", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPopular(data);
      });
  }, []);

  return (
    <>
      <div className="mt-5">
        <h2 className="text-center text-secondary text-4xl mb-5 mt-40">
          All our <span className="text-warning">Famous</span> and{" "}
          <span className="text-warning">Best Enrolled</span> class here
        </h2>
        <p className="text-center text-muted  mb-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem <br /> perspiciatis quia
          cupiditate voluptatum repudiandae officia.
        </p>
        <div className="divider w-1/2 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-4 gap-5 my-10">
        {popular &&
          popular.map((item) => (
            <div key={item._id}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="card bg-base-100 shadow-xl space-y-0">
                  <figure>
                    <img className="h-[300px] w-full" data-aos="flip-left" src={item.image} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title"> Class Name :{item.instrument}</h2>
                    <h2 className="card-title">Instructor : {item.instructor}</h2>
                    <p>Fees : ${item.price}</p>
                    <p>Seats : {item.seats}</p>
                    <p>Students : {item.enrolled || 0}</p>
                    <div className="w-full">
                      <button className="btn btn-primary btn-outline w-full">Select</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PopularClasses;
