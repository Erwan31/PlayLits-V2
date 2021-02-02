import React, { useEffect, useLayoutEffect, useState } from 'react'
import hash, { cleanHash } from '../../api/hash'
import store from "store"
import { getUserPlaylists, getUserInfo } from '../../api';

export default function UserPlaylists() {

    const [token, setToken] = useState(store.get("pl_token"));
    const [id, setId] = useState(store.get("pl_user_id"));
    const [playlists, setPlaylists] = useState([]);
    const [nextURL, setNextURL] = useState('');

    useEffect(async () => {

        if (!token) {
            const urlHash = await hash();
            setToken(urlHash.access_token);
            // Save in local storage for future page refresh/reload...
            store.set("pl_token", token);

            // cleanHash();
        }

        if (!id) {
            const userInfo = await getUserInfo(token);
            setId(userInfo.data.display_name)
            // Save in local storage for future page refresh/reload...
            store.set("pl_user_id", id);
        }

        if (id && token) {
            const userPlaylists = await getUserPlaylists(id, token);

            console.log('playlists', playlists, id, token);

            setPlaylists(userPlaylists.items);
            setNextURL(userPlaylists.next);
        }
    }, []);

    const handleLoadMore = async () => {
        //await getMorePlayList(next)
    }

    return (
        <div>
            Ola
        </div>
    )
}
