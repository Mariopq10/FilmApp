export interface User {
  id_usuario?: string;
  usuario: string;
  id_rol: string;
  rol: string;
  observaciones?: string;
  nombre_publico: string;
  habilitado: string;
  peliculas_favs: number[] | null
}
