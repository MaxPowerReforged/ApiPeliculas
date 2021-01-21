import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

export default class MovieCreate extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);

    this.state = {
      id: null,
      name: "",
      director: "", 
      category: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDirector(e) {
    this.setState({
      director: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  saveMovie() {
    var data = {
      nombre: this.state.name,
      director: this.state.director,
      clasificacion: this.state.category
    };

    MovieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.nombre,
          director: response.data.director,
          category: response.data.clasificacion,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMovie() {
    this.setState({
      id: null,
      name: "",
      director: "",
      category: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form bg-dark border-primary">
        {this.state.submitted ? (
          <div>
            <h4>Película guardada!</h4>
            <button className="btn btn-outline-primary" onClick={this.newMovie}>
              Añadir Otra
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control bg-dark-lighter border-primary"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Director</label>
              <input
                type="text"
                className="form-control bg-dark-lighter border-primary"
                id="director"
                required
                value={this.state.director}
                onChange={this.onChangeDirector}
                name="director"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Clasificación</label>
              <input
                type="text"
                className="form-control bg-dark-lighter border-primary"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <button onClick={this.saveMovie} className="btn btn-outline-primary">
              Guardar
            </button>
          </div>
        )}
      </div>
    );
  }
}