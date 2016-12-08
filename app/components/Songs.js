import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.state = { songs: [] };
  }

  componentDidMount() {
    $.ajax({
      url: '/api/songs/',
      type: 'GET',
      dataType: 'JSON'
    }).done( (songs) => {
      this.setState({ songs });
    });
  }

  addSong(e) {
    e.preventDefault();
    let { title, artist, lyrics, form } = this.refs;
    $.ajax({
      url: '/api/songs',
      type: 'POST',
      data: {
        title: title.value,
        artist: artist.value,
        lyrics: lyrics.value
      }
    }).done( (song) => {
      form.reset();
      this.setState({ songs: [ ...this.state.songs, { ...song } ]});
    });
  }

  render() {
    let songs = this.state.songs.map( (song) => {
      return (<li key={song._id} className="collection-item"><Link to={`/songs/${song._id}`} key={song._id}>{song.title}</Link></li>);
    });

    return (
      <div className="row">
        <form className="col m4" ref="form" onSubmit={this.addSong}>
          <input ref="title" placeholder="title" />
          <input ref="artist" placeholder="artist" />
          <textarea ref="lyrics"></textarea>
          <button classNam="btn" type="submit">Add Song</button>
        </form>
        <ul className="col m8 collection">
         {songs}
        </ul>
      </div>
    );
  }
}

export default Songs;
