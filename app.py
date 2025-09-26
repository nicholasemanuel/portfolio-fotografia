import os
from flask import Flask, render_template

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_FOLDER = os.path.join(BASE_DIR, 'static', 'images')

@app.route('/')
def galeria():
    image_files = []
    try:
        image_files = [f for f in os.listdir(IMAGE_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    except FileNotFoundError:
        print(f"AVISO: A pasta de imagens '{IMAGE_FOLDER}' não foi encontrada.")
    
    return render_template('index.html', images=image_files, active_page='galeria')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html', active_page='sobre')

# O if __name__ == '__main__' não é usado pela Vercel, mas é bom para testes locais
if __name__ == '__main__':
    app.run(debug=True)