import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../components/utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MovieTable from './common/moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  handleLike = heart => {
    const movies = this.state.movies
    const index = movies.indexOf(heart)
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handleDelete = del => {
    const movies = this.state.movies.sfilter(m => m._id !== del._id);
    this.setState({movies})
  };

  handlePageChange = page => {
    this.setState({ currentPage : page })
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = path => {
    const sortColumn = {...this.state.sortColumn};
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn, selectedGenre, movies: allMovies } = this.state;

    if (count === 0) return <p>Daftar film tidak tersedia</p>

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Menampilkan { filtered.length } film dari database</p>
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
 
export default Movies;