import React from "react";
import "../Main.css";

const InputSection = ({ input, setInput, onSendMessage, onImageUpload }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        className="input-teclado"
        placeholder="Digite um número romano"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
      />

      <button className="clip-button" title="Enviar imagem">
        <label htmlFor="upload-image" style={{ cursor: "pointer", margin: 0 }}>
          <i > Carregar Imagem</i>
        </label>
      </button>
      <input
        type="file"
        id="upload-image"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onImageUpload}
      />

      <button className="btn-enviar" onClick={onSendMessage}>
        <i></i> Enviar
      </button>
    </div>
  );
};

export default InputSection;
