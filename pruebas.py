import json
ruta = r'C:\Users\julil\OneDrive\Escritorio\tp_redes\movies.json'

def agregar_peli(nombre:str,año:int,cast=None,genres=None, href=None, extract=None,thumbnail=None, thumbnail_width=None, thumbnail_height=None ):

    with open(ruta,'r+', encoding='ANSI') as file:
        data = json.load(file)
    
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
        print('pelicula append')
        json.dump(data, file, indent=4, ensure_ascii=False)
        print('pelicula dump')

        #trunca el tamaño del archivo
        file.truncate()
    file.close() 

agregar_peli('Me case con un boludo',2008)