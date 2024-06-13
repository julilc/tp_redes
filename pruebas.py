import json
ruta = r'C:\Users\julil\OneDrive\Escritorio\tp_redes\movies.json'


def buscar(nombre, año):
    with open(ruta, 'r', encoding='ANSI') as file:
        try:
            data = json.load(file)
            for pelicula in data:
                if pelicula['title'] == nombre and pelicula['year'] == año:
                    return pelicula
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return None
    return None

def actualizar(nombre, año, **updates):
    with open(ruta, 'r+', encoding='ANSI') as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return
        
        pelicula_actualizar = None

        for pelicula in data:
            if pelicula['title'] == nombre and pelicula['year'] == año:
                pelicula_actualizar = pelicula
                break

        if not pelicula_actualizar:
            print('Película no encontrada')
            return

        for key, value in updates.items():
            if value is not None:
                if value == 'borrar':
                    if key == 'year':
                        pelicula_actualizar[key] = 0
                    else:
                        pelicula_actualizar[key] = ''
                else:
                    pelicula_actualizar[key] = value

        file.seek(0)
        json.dump(data, file, indent=4, ensure_ascii=False)
        file.truncate()

actualizar('Iron Man', 2008, title='Iron Man: el hombre de hierro')