import React from "react";
import "../Main.css";

const ImageMessage = ({ imageUrl, auxImages, numeroSolicitado }) => {

  const downloadImage = async () => {
    try {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Evita problemas com CORS
      image.src = imageUrl;
  
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
  
      const cropWidth = 93;
      const cropHeight = 133;
  
      // Você pode ajustar a origem do recorte se quiser centralizar
      const cropX = (image.width - cropWidth) / 2;
      const cropY = (image.height - cropHeight) / 2;
  
      const canvas = document.createElement("canvas");
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext("2d");
  
      ctx.drawImage(
        image,
        cropX, cropY, cropWidth, cropHeight,  // recorte da imagem original
        0, 0, cropWidth, cropHeight           // posição e tamanho no canvas
      );
  
      canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${numeroSolicitado}_93x133.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, "image/png");
  
    } catch (error) {
      alert("Erro ao baixar a imagem recortada.");
      console.error(error);
    }
  };
  

  return (
    <div className="image-container">
      <img src={imageUrl} alt="Número Cisterciense" className="numero-imagem" />
      <div className="image-actions">
        <button className="image-button" onClick={downloadImage}>
          <i className="fas fa-download"></i>
        </button>
      </div>
      {auxImages?.length > 0 && (
        <div className="aux-images">
          {auxImages.map((imgUrl, i) => (
            <img
              key={i}
              src={imgUrl}
              alt={`Parte ${i + 1}`}
              className="aux-imagem"
              style={{ margin: "5px", height: "120px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageMessage;
