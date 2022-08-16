import {songJson} from './api/songdata';

function Count_Inversions(arr) {
    if(arr.length < 2) {
        return [0, arr];
    }
    var mid = Math.floor(arr.length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);
    var left_inversions = Count_Inversions(left);
    var right_inversions = Count_Inversions(right);
    var split_inversions = Merge_And_Count_Inversions(left_inversions[1], right_inversions[1]);
    return [left_inversions[0] + right_inversions[0] + split_inversions[0], split_inversions[1]];
}

function Merge_And_Count_Inversions(left, right) {
    var inversions = 0;
    var result = [];
    while(left.length > 0 && right.length > 0) {
        if ((left[0]) <= (right[0])) {
            result.push(left.shift());
        } else {
            inversions += left.length;
            result.push(right.shift());
        }
    }
    while(left.length > 0) {
        result.push(left.shift());
    }
    while(right.length > 0) {
        result.push(right.shift());
    }
    return [inversions, result];
}

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

function convertPlaylist(playlists) {
    playlists = playlists.playlist;
    var musics_name = [];
    for (let i = 0; i < playlists.length; i++) {
        musics_name.push(songJson[playlists[i]]);
    }
    return musics_name;
}

function comparaplaylist(userplaylist,playlists) {
    var inversions = Count_Inversions(userplaylist)[0]
    var minimus = 57600*2
    var result = 0
    for(let j=0 ; j<playlists.length ; j++){
        if(playlists[j].inversions-inversions < minimus){
            minimus = playlists[j].inversions-inversions;
            result = j;
        }
    }
    return result;
}

function generatePlaylists(userplaylist) {
    // console.log(userplaylist)
    // var size = Object.keys(data).length;
    var playlists = [];
    for (let i = 0; i < 100; i++) {
        var array = Array.from({ length: 100 }, () => generateUniqueRandom(100))
        var inversions = Count_Inversions(array)[0];
        playlists.push({"inversions": inversions, "playlist": array});
    }
        return convertPlaylist(playlists[comparaplaylist(userplaylist,playlists)]);
}

export {generatePlaylists}