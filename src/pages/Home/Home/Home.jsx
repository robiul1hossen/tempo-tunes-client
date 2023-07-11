import PopularClasses from "../PopularClasses/PopularClasses";
import Slider from "../Slider/Slider";
import Banner from "../Banner/Banner";
import Instructor from "../Instructor/Instructor";
import ClientReview from "../ClientReviews/ClientReviews";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <Instructor></Instructor>
      <ClientReview></ClientReview>
      <Contact></Contact>
    </div>
  );
};

export default Home;
