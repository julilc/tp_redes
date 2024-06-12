from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
ruta = r'C:\Users\julil\OneDrive\Escritorio\tp_redes\movies.json'

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes de origen (en producción, deberías limitarlo a los orígenes específicos que necesitas)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/my-first-api")

def buscar(nombre = None, año = None):
    with open(ruta,'r+',encoding='ANSI') as file:
        data = json.load(file)

        peliculas = []
        if año is None and nombre is not None:
            for pelicula in data:
                if pelicula['title'] == nombre:
                    peliculas.append(pelicula)
            if len(peliculas) == 0:
                file.close()
                return('No hubo coincidencias')
            file.close()
            return peliculas
        if nombre is None and año is not None:
            for pelicula in data:
                if pelicula['year'] == int(año):
                    peliculas.append(pelicula)
            if len(peliculas) == 0:
                file.close()
                return('No hubo coincidencias')
            file.close()                
            return peliculas        
        if nombre is not None and año is not None:
            for pelicula in data:
                if pelicula['year'] == int(año) and pelicula['title'] == nombre:
                    peliculas.append(pelicula)
            if len(peliculas) == 0:
                file.close()
                return('No hubo coincidencias')
            file.close()
            return peliculas
        file.close()   
        return 'No se encontró'

@app.post("/my-first-api")
def agregar_peli(nombre:str,año:int,cast=None,genres=None, href=None, extract=None,thumbnail=None, thumbnail_width=None, thumbnail_height=None ):

    with open(ruta,'r+', encoding='ANSI') as file:
        data = json.load(file)
    
        nueva_pelicula = {
            'title' : nombre,
            'year' : año,
            'cast' : list(cast),
            'genres' : list(genres),
            'href' : href,
            'extract':extract,
            'thumbnail' : thumbnail,
            'thumbnail_width':thumbnail_width,
            'thumbnail_height':thumbnail_height
        }
    
        #va al inicio del archivo
        file.seek(0)

        data.append(nueva_pelicula)
        print('pelicula append')
        json.dump(data, file, indent=4, ensure_ascii=False)
        print('pelicula dump')

        #trunca el tamaño del archivo
        file.truncate()
    file.close()    


@app.delete("/my-first-api")
def borrar(nombre):
    with open(ruta, 'r+', encoding='ANSI') as file:
        data = json.load(file)
        for pelicula in data:
            if pelicula['title'] == nombre:
                data.remove(pelicula)
                with open(ruta, 'w', encoding='ANSI') as file:
                    json.dump(data, file, indent=4, ensure_ascii=False)
                    file.close()
                return 'Pelicula borrada'
        return 'No se encontro la pelicula'