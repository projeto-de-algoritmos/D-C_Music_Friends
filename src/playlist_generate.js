const inversiouncout = require('./count_inversions.js');
const fs = require('fs');
var data = fs.readFileSync('songdata.json', 'utf8');
data = JSON.parse(data);

function generatePlaylists(tam,top){
    var size = Object.keys(data).length;
    var playlists = [];
    for (let i = 0; i < tam; i++) {
        var array = Array.from({ length: top }, () => Math.floor(Math.random() * size))
        var inversions = inversiouncout(array)[0];
        playlists.push({"inversions": inversions, "playlist": array});
    }
        return playlists
}
function convertPlaylist(playlists) {
    var musics_name = [];
    for (let i = 0; i < playlists.length; i++) {
        console.log("musica na pos " + (i+1) + " artista: " + Object.values(data[playlists[i]])[0], "| titulo: " + Object.values(data[playlists[i]])[1]);
        musics_name.push(Object.values(data[playlists[i]]));
    }
    return musics_name;
}

module.exports = {generatePlaylists, convertPlaylist};