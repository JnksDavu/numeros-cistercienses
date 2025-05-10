import React, { useState } from "react";
import "../Main.css";
import Message from "./Message";
import ImageMessage from "./ImageMessage";
import InputSection from "./InputSection";
import LoadingIndicator from "./LoadingIndicator";
import { gerarNumero as gerarSimbolo, reconhecerNumero as identificarSimbolo, obterImagem as pegarImagem } from "../services/api";

const ConversorCisterciense = () => {
  const [historico, setHistorico] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [imagensSecundarias, setImagensSecundarias] = useState([]);
  const [valorDigitado, setValorDigitado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const aoEnviarTexto = async () => {
    if (entrada.trim() !== "" && !isNaN(entrada)) {
      const numeroConvertido = parseInt(entrada, 10);
      setValorDigitado(numeroConvertido);
      setHistorico([{ remetente: "Entrada", conteudo: entrada }]);
      setEntrada("");
      setCarregando(true);
      try {
        const resposta = await gerarSimbolo(numeroConvertido);
        if (resposta.imagem_principal) {
          setImagemPrincipal(pegarImagem(resposta.imagem_principal) + `?t=${Date.now()}`);
          setImagensSecundarias(resposta.imagens_auxiliares.map((nome) => pegarImagem(nome)));
          setHistorico([
            { remetente: "Entrada", conteudo: entrada },
            { remetente: "Saída", conteudo: "" }
          ]);
        } else {
          setHistorico([
            { remetente: "Entrada", conteudo: entrada },
            { remetente: "Saída", conteudo: "Erro ao gerar o símbolo." }
          ]);
        }
      } catch (erro) {
        setHistorico([
          { remetente: "Entrada", conteudo: entrada },
          { remetente: "Saída", conteudo: "Erro de conexão com o servidor." }
        ]);
      } finally {
        setCarregando(false);
      }
    } else {
      setHistorico([{ remetente: "Saída", conteudo: "Digite um número válido." }]);
    }
  };

  const aoEnviarImagem = async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
      setHistorico([]);
      const leitor = new FileReader();
      leitor.onload = () => {
        const base64 = leitor.result;
        setHistorico((anterior) => [
          ...anterior,
          {
            remetente: "Entrada",
            conteudo: "Imagem enviada:",
            imagem: base64,
          },
        ]);
      };
      leitor.readAsDataURL(arquivo);

      setCarregando(true);
      try {
        const resultado = await identificarSimbolo(arquivo);
        if (resultado.numero_reconhecido !== undefined) {
          setHistorico((anterior) => [
            ...anterior,
            {
              remetente: "Saída",
              conteudo: `O símbolo corresponde ao número ${resultado.numero_reconhecido}`,
            },
          ]);
        } else {
          setHistorico((anterior) => [
            ...anterior,
            {
              remetente: "Saída",
              conteudo: "Não foi possível reconhecer o símbolo.",
            },
          ]);
        }
      } catch (erro) {
        console.error("Erro ao enviar imagem:", erro);
        setHistorico((anterior) => [
          ...anterior,
          {
            remetente: "Saída",
            conteudo: "Falha ao processar a imagem.",
          },
        ]);
      } finally {
        setCarregando(false);
      }
    }
  };

  return (
    <div id="painel-container">
      <div id="painel-header">Conversor de Números Cistercienses</div>
  
      <InputSection
        input={entrada}
        setInput={setEntrada}
        onSendMessage={aoEnviarTexto}
        onImageUpload={aoEnviarImagem}
      />
  
      {carregando && <LoadingIndicator />}
  
      <div id="painel-logs">
        {historico.map((msg, idx) => (
          <Message key={idx} sender={msg.remetente} text={msg.conteudo} image={msg.imagem} />
        ))}
        {historico.some((msg) => msg.remetente === "Saída") && imagemPrincipal && (
          <ImageMessage
            imageUrl={imagemPrincipal}
            auxImages={imagensSecundarias}
            numeroSolicitado={valorDigitado}
          />
        )}
      </div>
    </div>
  );
  
  
};

export default ConversorCisterciense;
