import React from "react";


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
          Si vous êtes un acheteur, vous pouvez parcourir notre large sélection de produits, trouver ce que vous cherchez, ajouter des articles à votre panier et passer une commande. Nous offrons également un système de notation et d'avis pour les vendeurs, ce qui vous permet de voir les commentaires des autres acheteurs avant de faire un achat.

Si vous êtes un vendeur, vous pouvez créer votre propre boutique en ligne, ajouter des produits à vendre.
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
          <span className="logo">YSF's Cyber Mall</span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;