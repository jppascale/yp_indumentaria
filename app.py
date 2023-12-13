import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import time

class Catalogo():

    def __init__(self):
        #Producción:
        host = 'jotapy79.mysql.pythonanywhere-services.com'
        user = 'jotapy79'
        password = 'mysqlroot'
        database = 'jotapy79$ypindumentaria'
        self.ruta_imagenes = '/home/jotapy79/yp_indumentaria/img/catalogo'

        #Desarrollo:
        # host = ''
        # user = 'root'
        # password = ''
        # database = 'ypindumentaria'
        # self.ruta_imagenes = './img/catalogo/'

        self.conn = mysql.connector.connect(host = host, user = user, password = password, database = database )
        self.cursor = self.conn.cursor(dictionary=True)
        
        #Se intenta acceder a la base de datos. Si no existe, se crea. Si se produce un error, se dispara una excepción y se aborta la app.
        try:
            self.cursor.execute(f'USE {database}')
        except mysql.connector.error as err:
            #No se pudo conectar
            if err.err_no == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f'CREATE DATABASE {database}')
                self.conn.database = database
            else:
                raise err

        #Creación de la tabla (si no existe)
        sql = f'''CREATE TABLE IF NOT EXISTS PRODUCTO(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    descripcion VARCHAR(50) NOT NULL,
                    precio DECIMAL(10,2) DEFAULT 0,
                    img_url VARCHAR(400),
                    img_alt VARCHAR(100)
                    )
                '''
        self.cursor.execute(sql)
        self.conn.commit()
        
    def consultar_productos(self):
        sql = "SELECT * FROM producto"
        self.cursor.execute(sql)
        return self.cursor.fetchall()
    
    def existe_producto(self, descripcion):
        sql = f"SELECT 1 FROM producto WHERE upper(descripcion)='{descripcion.upper()}'"
        try:
            self.cursor.execute(sql)
            return self.cursor.fetchone()
        except Exception as e:
            print(e)

    def agregar_producto(self, descripcion, precio, img_url, img_alt):
        if self.existe_producto(descripcion):
            return False
        else:
            sql = f'INSERT INTO producto (descripcion, precio, img_url, img_alt) VALUES ("{descripcion}", {precio}, "{img_url}", "{img_alt}")'
            self.cursor.execute(sql)
            self.conn.commit()
            return True

    def alta_producto(self, descripcion, precio, img_url, img_alt):
        if self.existe_producto(descripcion):
            return False, "Ya existe el producto"
        else:
            sql = f'INSERT INTO producto (descripcion, precio, img_url, img_alt) VALUES ("{descripcion}", {precio}, "{img_url}", "{img_alt}")'
            self.cursor.execute(sql)
            id = self.cursor.lastrowid
            self.conn.commit()
            return True, id

    def actualizar_producto(self, id, descripcion, precio, img_url, img_alt):
        try:
            sql = f'UPDATE producto SET descripcion = "{descripcion}", precio = {precio}, img_url = "{img_url}", img_alt = "{img_alt}" WHERE id = {id}'
            self.cursor.execute(sql)
            self.conn.commit()
            return True
        except:
            return False

    def obtener_producto(self, id):
        sql = f'SELECT * FROM producto WHERE id={id}'
        self.cursor.execute(sql)
        return self.cursor.fetchone()

    def eliminar_producto(self, id):
        try:
            sql = f'DELETE FROM producto WHERE id={id}'
            self.cursor.execute(sql)
            self.conn.commit()
            return True
        except:
            return False



app = Flask('__name__')
CORS(app)

@app.route('/productos', methods=['GET'])
def consultar_productos():
    catalogo = Catalogo()
    return jsonify(catalogo.consultar_productos())


@app.route("/productoJS", methods=["POST"])
def nuevo_productoJS():
    #se obtienen los datos desde un JSON
    producto = request.get_json()
    descripcion = producto.get('descripcion')
    precio = producto.get('precio')
    img_url = producto.get('img_url')
    img_alt = producto.get('img_alt')

    catalogo = Catalogo()

    if catalogo.agregar_producto(descripcion, precio, img_url, img_alt):
        return jsonify({"resultado":"OK"}), 200
    else:
        return jsonify({"resultado":"Error al crear el producto"}), 400
    

@app.route('/producto', methods=['POST'])
def nuevo_producto():
    #Alta de producto a partir de un FormData (para cargar una imagen)
    #Además, se incluye el ID del nuevo producto en la respuesta.

    descripcion = request.form.get('descripcion')
    precio = request.form.get('precio')
    img_alt = request.form.get('img_alt')

    archivo = request.files['archivo']
    nombre_archivo = secure_filename(archivo.filename)
    nombre_base, extension = os.path.splitext(nombre_archivo)
    archivo_imagen =  f'{nombre_base}_{int(time.time())}{extension}'

    catalogo = Catalogo()
    archivo.save(os.path.join(catalogo.ruta_imagenes, archivo_imagen))

    resultado = catalogo.alta_producto(descripcion, precio, archivo_imagen, img_alt)
    return jsonify({'resultado': resultado[1]}), 200 if resultado[0] else 400


@app.route("/producto/<int:codigo>", methods=['DELETE'])
def eliminar_producto(codigo):
    catalogo = Catalogo()
    producto = catalogo.obtener_producto(codigo)
    if not producto is None:
        #Primero hay que eliminar el archivo de imagen
        imagen = os.path.join(catalogo.ruta_imagenes, producto['img_url'])
        if os.path.exists(imagen):
            os.remove(imagen)
        #Luego eliminar el producto de la BD
        if catalogo.eliminar_producto(codigo):
            return jsonify({'resultado': 'ok'}), 200
        else:
            return jsonify({'resultado': 'Error al eliminar el producto'}), 400
        
@app.route('/producto/<int:codigo>', methods=['GET'])
def get_producto(codigo):
    catalogo = Catalogo()
    producto = catalogo.obtener_producto(codigo)
    if not producto is None:
        return jsonify(producto), 200
    else:
        return jsonify({'resultado': 'El producto no existe'}), 400

@app.route('/producto/<int:codigo>', methods=['PUT'])
def actualizar_producto(codigo):
    descripcion = request.form.get('descripcion')
    precio = request.form.get('precio')
    img_alt = request.form.get('img_alt')

    archivo = request.files['archivo']
    nombre_archivo = secure_filename(archivo.filename)
    nombre_base, extension = os.path.splitext(nombre_archivo)
    archivo_imagen =  f'{nombre_base}_{int(time.time())}{extension}'

    catalogo = Catalogo()
    archivo.save(os.path.join(catalogo.ruta_imagenes, archivo_imagen))

    actualizado = catalogo.actualizar_producto(codigo, descripcion, precio, archivo_imagen, img_alt)

    return jsonify({'resultado': 'ok'}), 200 if actualizado else 400


if __name__ == '__main__':
    app.run(debug=True)

