export async function getUserInfo(token) {

    // Make a call using the token
    const userData = await $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          console.log('data', data);
          this.setState({
            no_data: true,
          });
          return;
        }
        else{
          const id = data.id;
          this.setState({user_id: id});
          return;
        }
      }
    });

    return userData;
}

export async function getUserPlaylists(id) {

    let items = null;

    // Make a call using the token
    $.ajax({
      url: `https://api.spotify.com/v1/users/${id}/playlists`,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return items;
        }

        let limit = data.limit;
        items = data.items;
        this.setState({ limit, playlists: items });
      }
    });

    return items;
}

export async function getUserPlaylistsNew(id, offset) {

    let items = null;
    let data = null;

    // Get up to 100 tracks from playlist 
    const token = this.state.token;
    const headerContent = {
        Authorization: "Bearer " + token
    };

    try{
      const response = await axios.get(`https://api.spotify.com/v1/users/${id}/playlists`,
                                        {
                                          headers: headerContent, 
                                          params: {offset: offset }
                                        });
      data = await response.data;
    }
    catch(error){
      console.log("more playlists...", error);
      this.setState({
        no_data: true,
      });
    }
  
    items = data.items;

    if(items !== null){
      let limit = data.limit;
      let playlists = this.state.playlists;
      playlists.push(...items);
      this.setState({ limit, playlists });
    }

    return items;
}