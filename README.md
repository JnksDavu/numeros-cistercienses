# 🔢 Tradutor de Algarismos Cistercienses

## 🛠️ Ferramentas e Linguagens

Este projeto foi desenvolvido utilizando:

- **Python**  
- **OpenCV** – Responsável pelo tratamento e criação das imagens  
- **Flask** – Serve como motor do backend  
- **React** – Responsável pela exibição visual dos dados no navegador  

---

## 🚀 Rodando o Projeto

Para executar o sistema completo, será necessário iniciar o servidor backend e a interface frontend separadamente. Use dois terminais distintos para isso.

### ✅ Requisitos Necessários

- **Python 3.12**
- **Node.js 18.12.0** + **npm**

---

### 📥 Etapa 1: Baixar o Código

```bash
git clone https://github.com/JnksDavu/numeros-cistercienses.git
cd seu-repositorio
```

---

### 🧠 Etapa 2: Preparar o Backend

Acesse a pasta onde está o código da API:

```bash
cd API
```

Em seguida, crie um ambiente virtual para isolar as dependências e ative-o:

```bash
python -m venv venv
venv\Scripts\activate
```

Com o ambiente ativado, instale os pacotes necessários:

```bash
pip install -r requirements.txt
```

Agora, inicie o servidor Flask:

```bash
python main.py
```

A API estará disponível localmente no endereço: [http://localhost:5000](http://localhost:5000)

---

### 🖥️ Etapa 3: Executar o Frontend

Abra um segundo terminal e vá até a pasta do frontend:

```bash
cd frontend
```

Instale as dependências da interface web com o comando:

```bash
npm install
```

Depois, inicie a aplicação React:

```bash
npm start
```

A interface ficará disponível no navegador em: [http://localhost:3000](http://localhost:3000)
