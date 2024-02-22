<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Favorito extends Conexion
{

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'film';

    function __construct()
    {
        parent::__construct();
    }

    // Método para obtener todas las vacantes
    public function get($id_usuario)
    {
        $sql = $this->conexion->prepare("SELECT * FROM a_peliculas WHERE id_usuario = $id_usuario");
        $exito = $sql->execute();

        if ($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }
        $this->closeConnection();
    }

    // Método para crear una vacante
    public function create($id_usuario,$id_pelicula)
    {
        // $id = isset($data['id']) ? $data['id'] : null;
        $id_usuario = isset($data['id_usuario']) ? $data['id_usuario'] : null;
        $id_pelicula = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;

        if (isset($id_usuario) && isset($id_pelicula)) {
            $sql = $this->conexion->prepare("INSERT INTO a_peliculas (id_usuario, id_pelicula )
                    VALUES (:id_usuario, :id_pelicula)");
            $sql->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
            $sql->bindParam(":id_pelicula", $id_pelicula, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = "Pelicula agredada a fav.";
            } else {
                $this->message = "Error al añadir Favorita.";
            }

            $this->closeConnection();
        }
    }

    

    // Método para borrar una vacante por ID
    public function delete($id_usuario, $id_pelicula)
    {
        if (isset($id_usuario)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM a_peliculas WHERE id_usuario = $id_usuario AND id_pelicula = $id_pelicula");
                $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = "Vacante eliminada correctamente.";
                    $this->data = $id_vacante;
                } else {
                    $this->message = "Error al eliminar la vacante.";
                }
            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    $this->message = CONSTRAINT_NIVEL;
                }
            }
            $this->closeConnection();
        }
    }

    // Método para obtener los alumnos de una determinada id_vacante y de una determinada unidad,
    // seleccionados o no, si ya fue seleccionado 'estado' se pondrá en 1, si no fue seleccionado 'estado' se pondrá en 0
    public function getAlumnado($data)
    {

        $sql = $this->conexion->prepare("SELECT a.id_alumno, a.nombre, a.apellidos, CASE
            WHEN a.id_alumno IN (
                SELECT sgi_alumnos.id_alumno
                FROM sgi_alumnos
                INNER JOIN sgi_vacantes_x_alumnos ON sgi_vacantes_x_alumnos.id_alumno = sgi_alumnos.id_alumno
                WHERE sgi_vacantes_x_alumnos.id_vacante = :id_vacante
            ) THEN 1
            ELSE 0
            END AS estado
            FROM sgi_alumnos a
            WHERE a.unidad = :unidad ");
        $sql->bindParam(":id_vacante", $data['id_vacante'], PDO::PARAM_INT);
        $sql->bindParam(":unidad", $data['unidad'], PDO::PARAM_INT);

        $exito = $sql->execute();

        if ($exito) {
            $this->status = true;
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $this->message = "Error al obtener los valores de la tabla 'sgi_vacantes_x_alumnos'.";
        }

        $this->closeConnection();
    }

    // Método para insertar los alumnos seleccionados en la vacante seleccionada
    public function insertarAlumnosSeleccionados($data)
    {
        $id_vacante = $data['id_vacante'];
        // Primero elimina todos los alumnos de esa vacante para luego insertar los seleccionados
        // y no tener que recorrer la lista controlando cuál está y cuál no
        if (isset($id_vacante)) {
            $sql = $this->conexion->prepare("DELETE FROM sgi_vacantes_x_alumnos WHERE id_vacante = :id_vacante");
            $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);
            $sql->execute();
        }

        if (isset($id_vacante) && !empty($data['alumnosSeleccionados'])) {
            try {
                // Comienza una transacción
                $this->conexion->beginTransaction();

                // Prepara la sentencia SQL para insertar los alumnos seleccionados
                $sql = $this->conexion->prepare("INSERT INTO sgi_vacantes_x_alumnos (id_vacante, id_alumno) VALUES (:id_vacante, :id_alumno)");

                foreach ($data['alumnosSeleccionados'] as $id_alumno) {
                    // Asigna los valores y ejecuta la sentencia SQL para cada alumno seleccionado
                    $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);
                    $sql->bindParam(":id_alumno", $id_alumno, PDO::PARAM_INT);
                    $sql->execute();
                }

                // Confirma la transacción
                $this->conexion->commit();

                // Establece el estado y mensaje de éxito
                $this->status = true;
                $this->message = "Alumnos seleccionados insertados correctamente.";
            } catch (PDOException $e) {
                // Si hay un error, se revierte la transacción
                $this->conexion->rollBack();

                // Establece el estado y mensaje de error
                $this->message = "Error al insertar alumnos seleccionados: " . $e->getMessage();
            }
        } else {
            // Si faltan datos, establece un mensaje de error
            $this->message = "Falta información necesaria para insertar los alumnos seleccionados.";
        }

        // Cierra la conexión
        $this->closeConnection();
    }
}
