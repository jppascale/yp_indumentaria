import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS

class Catalogo():

    def __init__(self):
        host = ''
        user = 'root'
        password = ''
        database = 'ypindumentaria'
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
            sql = f'INSERT INTO ypindumentaria.producto (descripcion, precio, img_url, img_alt) VALUES ("{descripcion}", {precio}, "{img_url}", "{img_alt}")'
            self.cursor.execute(sql)
            self.conn.commit()
            return True






if __name__ == '__main__':
    app = Flask('__name__')
    CORS(app)
    
    @app.route('/productos', methods=['GET'])
    def consultar_productos():
        catalogo = Catalogo()
        return jsonify(catalogo.consultar_productos())
    
    @app.route("/producto", methods=["POST"])
    def nuevo_producto():
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
        

    app.run(debug=True)