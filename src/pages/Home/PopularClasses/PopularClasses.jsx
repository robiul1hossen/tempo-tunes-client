import { useEffect, useState } from "react";

const PopularClasses = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => {
        setPopular(data);
      });
  }, []);

  return (
    <div className="grid md:grid-cols-4 gap-5 my-10">
      {popular.map((item) => (
        <>
          <div className="card bg-base-100 shadow-xl space-y-0">
            <figure>
              <img className="h-[300px] w-full" src={item.image} alt="Shoes" />
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
        </>
      ))}
    </div>
  );
};

export default PopularClasses;
