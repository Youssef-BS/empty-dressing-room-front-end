import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Femmes</span>
          <span>Hommes</span>
          <span>Enfants</span>
          <span>Animaux</span>
          <span>Maison</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>A propos</h1>
          <span>
           cette application de pfe 2023 en iset kebili se creere par 2 etudiants youssef
           ben said et mohamed harizi en utilisez react node mongodb et autres outiles .
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
          linkdin youssef ben said , mohamed said  <br />
          insatgram youssef_ben_said__ , mohamed_hrizi<br />
          telephone +214 95 791 673 .
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Gachar</span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;