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
    <div className="grid grid-cols-3 gap-5 my-10">
      {popular.map((item) => (
        <>
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
              <img className="h-96 w-full" src={item.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.instructor}</h2>
              <p>{item.instructor}</p>
              <p>Fees : ${item.price}</p>
              <p>Seats : {item.seats}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Select</button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default PopularClasses;
