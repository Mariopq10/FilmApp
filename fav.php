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

    // Método para obtener todas las peliculas favoritas
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
                // $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = "Favorita eliminada correctamente.";
                    // $this->data = $id_vacante;
                } else {
                    $this->message = "Error al eliminar la favorita.";
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
 

        // Cierra la conexión
        $this->closeConnection();
    }

?>