const inversiouncout = require('./count_inversions.js');
const fs = require('fs');
var data = fs.readFileSync('src/songdata.json', 'utf8');
data = JSON.parse(data);
let haveIt = [];

function generateUniqueRandom(maxNr) {
    let random = Math.floor(Math.random() * maxNr);
    if(!haveIt.includes(random)) {
        haveIt.push(random);
        return random;
    } else {
        if(haveIt.length < maxNr) {
         return  generateUniqueRandom(maxNr);
        } else {
          return Math.floor(random+5/2);
        }
    }
}

// Tam = quantas playlists and top = quantas musicas por playlist
function generatePlaylists(tam,top){
    // var size = Object.keys(data).length;
    var playlists = [];
    for (let i = 0; i < tam; i++) {
        var array = Array.from({ length: top }, () => generateUniqueRandom(top))
        var inversions = inversiouncout(array)[0];
        playlists.push({"inversions": inversions, "playlist": array});
    }
        return playlists
}
function convertPlaylist(playlists) {
    var musics_name = [];
    for (let i = 0; i < playlists.length; i++) {
        musics_name.push(Object.values(data[playlists[i]]));
    }
    return musics_name;
}

function comparaplaylist(userplaylist,playlists){
    var inversions = inversiouncout(userplaylist)[0]
    var minimus = 57600*2
    var result = 0
    for(let j=0 ; j<playlists.length ; j++){
        if(playlists[j].inversions-inversions < minimus){
            minimus = playlists[j].inversions-inversions;
            result = j;
        }
    }
    return result
}
module.exports = {generatePlaylists, convertPlaylist,comparaplaylist};