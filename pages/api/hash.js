// Get the hash of the url
export default async function hash() {
    return window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});

    // window.location.hash = "";
}

export function cleanHash(){
    window.location.hash = "";
}

