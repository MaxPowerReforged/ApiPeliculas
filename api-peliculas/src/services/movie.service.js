import http from "../http-common";

class MovieDataService {
  getAll() {
    return http.get("/peliculas");
  }

  getById(id) {
    return http.get(`/peliculas/${id}`);
  }

  create(data) {
    return http.post("/peliculas", data);
  }

  update(id, data) {
    return http.put(`/peliculas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/peliculas/${id}`);
  }
}

export default new MovieDataService();