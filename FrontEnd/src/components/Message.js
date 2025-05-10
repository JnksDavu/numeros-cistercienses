import React from "react";
import "../Main.css";

const Message = ({ sender, text, image }) => (
  <div className="mensagem">
    <strong>{sender}:</strong> {text}
    {image && <img src={image} alt="Imagem enviada" />}
  </div>
);

export default Message;
