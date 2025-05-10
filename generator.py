import cv2
import numpy as np
import os

os.makedirs("static", exist_ok=True)

def desenhar_numero_cisterciense(numero: int, path_output: str):
    assert 1 <= numero <= 9999, "Número fora do intervalo válido (1-9999)"

    # Canvas branco
    img = np.ones((400, 400, 3), dtype=np.uint8) * 255
    centro = (200, 200)
    cv2.line(img, (centro[0], 50), (centro[0], 350), (0, 0, 0), 3)  # traço vertical central

    # Separar dígitos
    milhar = (numero // 1000) % 10
    centena = (numero // 100) % 10
    dezena = (numero // 10) % 10
    unidade = numero % 10

    # Aqui você desenha os traços de cada parte do número nos quadrantes apropriados
    # Exemplo simplificado (você vai precisar desenhar traços reais baseados em regras do sistema cisterciense)
    cv2.putText(img, f"{milhar}{centena}{dezena}{unidade}", (120, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

    cv2.imwrite(path_output, img)
    return img
