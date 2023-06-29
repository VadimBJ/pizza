import React from "react";
import "./AboutUs.css";
import about1 from "../../img/about1.jpg";
import about2 from "../../img/about2.jpg";
import about3 from "../../img/about3.jpg";
import about4 from "../../img/about4.jpg";
import about5 from "../../img/about5.jpg";
import about6 from "../../img/about6.jpg";
import about7 from "../../img/about7.jpg";
import about8 from "../../img/about8.jpg";

export default function AboutUs():JSX.Element {
  return (
    <div className="aboutContainer">
      <p className="aboutText">
        Welcome to our pizzeria, a place where passion for pizza and a rich
        history collide! Let us take you on a journey through time and flavor as
        we share the story of our beloved pizza company.
      </p>
      <div className="aboutDiv">
        <img src={about1} alt="about1" className="about1" />
        <p className="aboutText">
          It all began many moons ago, back in the days when floppy disks were
          cool and dial-up internet was a thing. A group of friends, united by
          their love for pizza, embarked on a mission to bring the most
          delicious and mouthwatering slices to their community.
        </p>
      </div>
      <p className="aboutText">
        In a small corner of the city, they opened a humble pizzeria with a
        wood-fired oven and a dream. Word spread like wildfire, and soon people
        from all walks of life flocked to our little slice of heaven. The aroma
        of freshly baked dough, the sizzle of bubbling cheese, and the symphony
        of toppings tantalized taste buds far and wide.
      </p>
      <div className="aboutDiv">
      <p className="aboutText">
        As the years rolled by, our pizzeria evolved with the times. We embraced
        technology, crafting an easy-to-use online ordering system that brought
        pizza directly to your fingertips. No longer did you have to leave the
        comfort of your couch to experience pizza perfection – it was just a few
        clicks away.
      </p>
      <img src={about2} alt="about2" className="about2" />
      </div>
      <p className="aboutText">
        But through all the changes, one thing remained constant: our commitment
        to quality. We sourced the finest ingredients, carefully handpicked by
        our team of pizza connoisseurs. From locally grown vegetables bursting
        with flavor to premium meats and cheeses that melted like poetry in your
        mouth, every bite was an ode to taste and craftsmanship.
      </p>
      <div className="aboutDiv">
        <img src={about3} alt="about3" className="about3" />
      <p className="aboutText">
        Our pizzeria became a hub of creativity and innovation, where daring
        flavor combinations collided to create signature pizzas that captured
        the hearts and palates of pizza enthusiasts everywhere. We introduced
        toppings like never before, from exotic spices and international cheeses
        to unconventional delights that challenged traditional notions of pizza.
      </p>
      </div>
      <div className="aboutDiv">
      <p className="aboutText">
        But our success was not solely measured by our pizzas. We believed in
        giving back to the community that embraced us. We partnered with local
        charities, organized fundraising events, and sponsored youth sports
        teams, spreading the joy of pizza beyond our restaurant walls.
      </p>
        <img src={about4} alt="about4" className="about4" />
      </div>
      <p className="aboutText">
        Today, our pizzeria stands tall as an icon of tradition and innovation,
        a place where generations have gathered to share laughter, stories, and
        the universal love for pizza. Our legacy continues as we pass down the
        secret recipes and techniques that have been carefully guarded and
        perfected over the years.
      </p>
      <div className="aboutDiv">
      <img src={about6} alt="about6" className="about6" />
      <img src={about7} alt="about7" className="about7" />
      <img src={about5} alt="about5" className="about5" />
      </div>
      <p></p>
      <p className="aboutText">
        So join us on this delicious adventure, where the past meets the
        present, and every bite tells a story. Welcome to our pizzeria, where
        passion, flavor, and community converge to create an experience like no
        other.
      </p>
      <img src={about8} alt="about8" className="about8" />
    </div>
  );
}
