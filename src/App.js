import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {songJson} from './api/songdata'
import {generatePlaylists} from './playlist_generate';

function App() {
  const [musica, setMuisca] = useState([]);
  const [musicaGostada, setMusicaGostada] = useState(false);
  useEffect(() => { 
    const getData = songJson
    setMuisca(getData)
  }, []);

  const [musicaEscolhida, setMusicaEscolhida] = useState([]);

  const generateIndicator = () => {
    let arrayMusic = [100];
    Object.keys(musicaEscolhida).forEach((element) => {
      // console.log(element)
      arrayMusic[element]
    })
    var contador = 0;
    for (let i = 0; i < 100; i++) {
      arrayMusic[i] = 200
      if (musicaEscolhida[i] !== false && musicaEscolhida[i] !== undefined) {
        arrayMusic[i] = contador;
        contador++;
      }
    }
    // console.log(arrayMusic);
    const result = generatePlaylists(arrayMusic);
    setMusicaGostada(result)
  }

  const toggleMusicaEscolhida = (index) => {
    let array = {...musicaEscolhida}
    if(musicaEscolhida[index] == false || musicaEscolhida[index] == undefined) {
      array[index] = true
    }
    else {
      array[index] = false
    }
    setMusicaEscolhida(array);
    console.log(musicaEscolhida)
    
  };

  return (
    <div className="App">
      {
        !musicaGostada ?
        <>
        <div class="elements-table">
          <p class="space">Cantor</p>
          <p class="space">Musica</p>
        </div>
      {musica.map((elemento) => (
        <div class="elements-table">
          <p class="space">{elemento.artist}</p>
          <button class={musicaEscolhida[elemento.number] ? 'space clicked': 'space notclicked'} onClick={() => toggleMusicaEscolhida(elemento.number)}>{elemento.song}</button>
        </div>
        ))
      }
      <button onClick={generateIndicator}>Gerar Playlist</button>
        </>
        : <>
            {musicaGostada.map((elemento, index) => {
      if(index < 15)
      return (
        <div >
          <p class="space">{elemento.artist}</p>
          <p>{elemento.song}</p>
        </div>
      )
    })}
        </>
      }
    </div>
  );
}
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
export default App;
