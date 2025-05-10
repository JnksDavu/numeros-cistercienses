import streamlit as st
from generator import desenhar_numero_cisterciense
from reader import interpretar_imagem
import os

os.makedirs("images", exist_ok=True)

st.title("Tradutor de Números Cistercienses")

opcao = st.radio("Escolha uma opção:", ["Arábico → Cisterciense", "Cisterciense → Arábico"])

if opcao == "Arábico → Cisterciense":
    numero = st.number_input("Digite um número (1-9999):", min_value=1, max_value=9999)
    if st.button("Gerar Imagem"):
        caminho = f"static/{numero}.png"
        img = desenhar_numero_cisterciense(numero, caminho)
        st.image(caminho, caption=f"Número Cisterciense para {numero}")
        st.write("Localização dos algarismos: (Exemplo fictício) [(x1, y1), (x2, y2)]")

else:
    arquivos = os.listdir("images/")
    imagem_selecionada = st.selectbox("Escolha uma imagem:", arquivos)
    if st.button("Interpretar"):
        path = f"images/{imagem_selecionada}"
        numero, coords = interpretar_imagem(path)
        st.image(path, caption=f"Número detectado: {numero}")
        st.write("Localização dos algarismos:", coords)
