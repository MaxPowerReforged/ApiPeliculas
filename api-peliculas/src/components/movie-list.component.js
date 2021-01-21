import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import { Link } from "react-router-dom";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.setUpdatedMovie = this.setUpdatedMovie.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.setSelectedMovie = this.setSelectedMovie.bind(this);
    this.loadSelectedMovie = this.loadSelectedMovie.bind(this);
    this.onChangeUpdateName = this.onChangeUpdateName.bind(this);
    this.onChangeUpdateDirector = this.onChangeUpdateDirector.bind(this);
    this.onChangeUpdateCategory = this.onChangeUpdateCategory.bind(this);
    this.clearUpdateForm = this.clearUpdateForm.bind(this);

    this.state = {
      movies: [],
      selectedMovieId: null,
      updatedMovieId: null,
      updatedMovieName: "",
      updatedMovieDirector: "",
      updatedMovieCategory: ""
    };
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  retrieveMovies() {
    MovieDataService.getAll()
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setUpdatedMovie(movie) {
    console.log("setting updated movie:", movie.data);
    this.setState({updatedMovieId: movie.data.id});
    this.setState({updatedMovieName: movie.data.nombre});
    this.setState({updatedMovieDirector: movie.data.director});
    this.setState({updatedMovieCategory: movie.data.clasificacion});
  }

  async updateMovie() {
    await MovieDataService.update(
      this.state.updatedMovieId, 
      {
        nombre: this.state.updatedMovieName,
        director: this.state.updatedMovieDirector,
        clasificacion: this.state.updatedMovieCategory
      });
      this.clearUpdateForm();
      this.retrieveMovies();
  }

  deleteMovie(id) {
      MovieDataService.delete(id);
      this.retrieveMovies();
  }

  setSelectedMovie(id) {
    this.setState({selectedMovieId: id});
    this.loadSelectedMovie(id);
  }

  async loadSelectedMovie(id) {
    console.log("loading selected movie with id:", id)
    this.setUpdatedMovie(await MovieDataService.getById(id));
  }

  onChangeUpdateName(e) {
    this.setState({updatedMovieName: e.target.value});
  }

  onChangeUpdateDirector(e) {
    this.setState({updatedMovieDirector: e.target.value});
  }

  onChangeUpdateCategory(e) {
    this.setState({updatedMovieCategory: e.target.value});
  }

  clearUpdateForm() {
    this.setState(
      {
        updatedMovieId: null,
        updatedMovieName: "",
        updatedMovieDirector: "",
        updatedMovieCategory: ""
      }
    );
  }

  render() {
    const { movies } = this.state;
//TODO this loop should produce a card view for all the movies, not only a list
    return (
      <div className="list row">
        <div className="col-md-8">
          <h4>Películas</h4>

          <ul className="list-group">
            {movies &&
              movies.map((movie, index) => (
                movie.hasOwnProperty("nombre") && 

                <li className="list-group-item border-primary bg-dark-lighter" key={index}>
                  <span className="movie-name">{movie.nombre}</span>
                  <span className="movie-description">{movie.director}</span>
                  <span className="movie-category">{movie.clasificacion}</span>
                  <div className="d-flex justify-content-around">
                    <button type="button" onClick={(e) => this.setSelectedMovie(movie.id)} className="btn btn-round btn-outline-primary btn-sm d-flex align-items-center">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </button>
                    <button type="button" onClick={(e) => this.deleteMovie(movie.id)} className="btn btn-round btn-danger btn-sm d-flex align-items-center">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="submit-form bg-dark border-primary">
            <div>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control bg-dark-lighter border-primary"
                  id="name"
                  required
                  value={this.state.updatedMovieName}
                  onChange={this.onChangeUpdateName}
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
                  value={this.state.updatedMovieDirector}
                  onChange={this.onChangeUpdateDirector}
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
                  value={this.state.updatedMovieCategory}
                  onChange={this.onChangeUpdateCategory}
                  name="category"
                />
              </div>

              <button onClick={this.updateMovie} className="btn btn-outline-primary">
                Actualizar
              </button>
            </div>
        </div>
      </div>
    );
  }
}