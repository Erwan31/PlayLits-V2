export const authEndpoint = "https://accounts.spotify.com/authorize";

const dev = process.env.NODE_ENV !== 'production'

// const app = next({ dev });

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "4f5288c7f7ca4f8e995e861a262eb902";
export const redirectURI = dev ? "http://localhost:3000/playlists" : "https://playlits.vercel.app/"; //"https://playlits.herokuapp.com/redirect";
export const scopes = [
    //"user-top-read",
    //"user-read-currently-playing",
    //"user-read-playback-state",
    "playlist-read-private",    // access playlists of the user
    "playlist-read-collaborative", // access collaborative playlist of the user
    "playlist-modify-private",  // create new playlist
    "playlist-modify-public",
    "user-library-read",
    //"streaming" // Web Playback SDK in the case 
]; 

