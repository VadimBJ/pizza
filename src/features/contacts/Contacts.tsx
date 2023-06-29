import React from "react";
import "./Contacts.css";
import contacts1 from "../../img/Contacs1.jpg";
import maps from "../../img/map.jpg";
import socials from "../../img/social.jpg";


export default function Contacts(): JSX.Element {
  return (
    <div className="contactsContainer">
      <img src={socials} alt="socials" className="socials" />
      <div className="contactsBlock">
        <div className="address">
          <br />
          Address: 10553 Berlin, Huttenstraße 39
          <br />
          Phone: +49 (173) 456 123 78
          <br />
          Email: info@ait-pizzaplace.com
          <br />
          <p className="openingHours">
          Opening Hours:
          </p>
          Monday - Sunday: 11:00 AM - 10:00 PM
        </div>
        <img src={contacts1} alt="contacts1" className="contacts1" />
      </div>
      <a href="https://goo.su/LeIs2Yr">
        <img src={maps} alt="maps" className="maps" />
      </a>
    </div>
  );
}
