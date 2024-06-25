from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
ruta = r'movies.json'

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
    pelicula_agregar = buscar(nombre, año)
    print(type(pelicula_agregar))
    if type(pelicula_agregar) != list:
        with open(ruta,'r+', encoding='ANSI') as file:
            data = json.load(file)
            if cast != None:
                cast = cast.split(sep = ',')
            if genres != None:
               genres = genres.split(sep = ',')
            nueva_pelicula = {
                'title' : nombre,
                'year' : año,
                'cast' : cast,
                'genres' : genres,
                'href' : href,
                'extract':extract,
                'thumbnail' : thumbnail,
                'thumbnail_width':thumbnail_width,
                'thumbnail_height':thumbnail_height
            }
        
            #va al inicio del archivo
            file.seek(0)

            data.append(nueva_pelicula)
            json.dump(data, file, indent=4, ensure_ascii=False)

            #trunca el tamaño del archivo
            file.truncate()
        file.close()
        return('Pelicula agregada')
    else:
        return('Ya existe la pelicula')    


@app.put("/my-first-api")
def actualizar(nombre: str, año: int, title = None,year = None,cast=None,genres=None, href=None, extract=None,thumbnail=None, thumbnail_width=None, thumbnail_height=None ):
    if cast != None:
        cast = cast.split(sep = ',')
    if genres != None:
        genres = genres.split(sep = ',')
    
    variables_actualizar = {'title':title, 'year':year, 'cast':cast, 'genres':genres, 'href':href,'extract':extract, 'thumbnail':thumbnail, 'thumbnail_width':thumbnail_width, 'thumbnail_height':thumbnail_height} 
    #Usamos la funcion buscar para ver si existe la película
    pelicula_actualizar = buscar(nombre, año)
    if pelicula_actualizar != str:
        #Si no es un str, entonces existe la película, por lo que realizamos la actualización.
        with open(ruta,'r+', encoding='ANSI') as file:

            data = json.load(file)

            for pelicula in data:
                if pelicula['title'] == nombre and pelicula['year'] == int(año):
                    for nombre_variable, valor_variable in variables_actualizar.items():

                        #si la variable tiene un valor para actualizar la actualiza
                        if valor_variable != None and valor_variable != 'borrar' and valor_variable != 0:
                            pelicula[nombre_variable] = valor_variable

                        #si la variable tiene un valor para borrar la borra
                        elif valor_variable == 'borrar' or valor_variable == 0:
                            if nombre_variable == 'year':
                                pelicula[nombre_variable] = 0
                            else:
                                pelicula[nombre_variable] = ''
                              
                    file.seek(0)
                    json.dump(data, file, indent=4, ensure_ascii=False)
                    #trunca el tamaño del archivo
                    file.truncate()
                    
        file.close()
        return 'variable actualizada'
    else:
        return 'pelicula no encontrada'

        


@app.delete("/my-first-api")
def borrar(nombre,año):
    with open(ruta, 'r+', encoding='ANSI') as file:
        data = json.load(file)
        for pelicula in data:
            if pelicula['title'] == nombre and pelicula['year'] == int(año):
                data.remove(pelicula)
                with open(ruta, 'w', encoding='ANSI') as file:
                    json.dump(data, file, indent=4, ensure_ascii=False)
                    file.close()
                return 'Pelicula borrada'
        return 'No se encontro la pelicula'