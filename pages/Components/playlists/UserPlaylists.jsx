import React, { useEffect, useLayoutEffect, useState } from 'react'
import hash from '../../api/hash'
import store from "store"
import { getUserPlaylists, getUserInfo } from '../../api';

export default function UserPlaylists() {

    const [token, setToken] = useState(store.get("pl_token"));
    const [id, setId] = useState(store.get("pl_user_id"));
    const [playlists, setPlaylists] = useState([]);

    useEffect(async () => {
        if (!token) {
            const urlHash = hash();
            setToken(urlHash.access_token);
            // Save in local storage for future page refresh/reload...
            store.set("pl_token", token);
        }

        if (!id) {
            const userInfo = await getUserInfo(token);

            console.log(userInfo);
            // setToken(urlHash.access_token);
            // // Save in local storage for future page refresh/reload...
            // store.set("pl_user_id", token);
        }
    }, [])

    return (
        <div>
            Ola
        </div>
    )
}
