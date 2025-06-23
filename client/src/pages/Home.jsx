import React, { useEffect, useState } from 'react';
import './Home.css'; // Importing the CSS
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Importing images for destinations
import parisImage from '../assets/images/paris.jpg';
import baliImage from '../assets/images/bali.jpg';
import tokyoImage from '../assets/images/tokyo.jpg';
import nycImage from '../assets/images/nyc.jpg';
import romeImage from '../assets/images/rome.jpg';
import packItUpImage from '../assets/images/packitup.jpg'; // Replace with the correct path to your image
import axiosInstance from '../utils/axiosConfig';

const Home = () => {
  const [packages, setPackages] = useState([]);

  // Fetch trending packages from the backend API
  useEffect(() => {
    const fetchTrendingPackages = async () => {
      try {
        const response = await axiosInstance.get('/review/best-trending-packages');
        if (response.data.success) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching trending packages:', error);
      }
    };
    fetchTrendingPackages();
  }, []);

  console.log("packages", packages);
  
  return (
    <div className="home-container">

      {/* New Section: Quote with Image */}
      <section className="quote-section" style={{ backgroundImage: `url(${packItUpImage})`, backgroundSize: 'cover', alignItems: 'center' }}>

        <div className="quote-container">
          <div className="quote-text">

            <h1>"Pack It Up, <br></br>Adventure Awaits"</h1>
            <p>Your journey begins the moment you decide to explore the world.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Destination Section */}
        <section className="destinations">
          <h2>Popular Destinations</h2>
          <p>Explore some of the most sought-after travel destinations:</p>
          <ul>
            <li className="destination paris">
              <div className="destination-image-container">
                <img src={parisImage} alt="Paris" className="destination-image" />
              </div>
            </li>
            <li className="destination bali">
              <div className="destination-image-container">
                <img src={baliImage} alt="Bali" className="destination-image" />
              </div>
            </li>
            <li className="destination tokyo">
              <div className="destination-image-container">
                <img src={tokyoImage} alt="Tokyo" className="destination-image" />
              </div>
            </li>
            <li className="destination nyc">
              <div className="destination-image-container">
                <img src={nycImage} alt="New York City" className="destination-image" />
              </div>
            </li>
            <li className="destination rome">
              <div className="destination-image-container">
                <img src={romeImage} alt="Rome" className="destination-image" />
              </div>
            </li>
          </ul>
        </section>
        <section className="destinations">
      {/* <h2>Trending Packages</h2> */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {packages.map((pkg) => (
          <SwiperSlide key={pkg._id}>
            <div className="destination-image-container">
              <img
                src={pkg.productDetails.image}
                alt={pkg.productDetails.name}
                className="destination-image"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>


        {/* About Travel Planner Section */}
        <section className="about-travel">
          <h2>About Travel Planner</h2>
          <p>
            Welcome to the Travel Planner, your ultimate guide to exploring the world.
            Whether you're looking for a relaxing beach vacation, an adventurous hiking trip, or a cultural city tour,
            we’ve got you covered! We offer personalized travel planning to make your dream vacations a reality.
          </p>
        </section>

        {/* Services Section */}
        <section className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Custom Travel Itinerary Creation</li>
            <li>Accommodation Booking</li>
            <li>Flight and Transportation Booking</li>
            <li>Travel Insurance Assistance</li>
            <li>Local Guide and Tours</li>
          </ul>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Travel Planner. All rights reserved.</p>
        <p>Follow us on <a href="https://twitter.com">Twitter</a>, <a href="https://facebook.com">Facebook</a>, and <a href="https://instagram.com">Instagram</a>.</p>
      </footer>
    </div>
  );
};

export default Home;
