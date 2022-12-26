export const slidersDouble = [
    // {
    // name: 'Tracks', feature: 'tracks', color: '#000000', labelUp: '', labelDown: '', tooltip: 'How many tracks to keep?',
    // thumb: [
    //     'Exclude tracks from the bottom of the list',
    //     'Exclude tracks from the top of the list',],
    // },
    {
        name: "Danceable", feature: "danceability", color: "#30B700", labelUp: "Booty Shake", labelDown: "Static", tooltip: "How much do you wanna dance?",
        thumb: [
            "Exclude most Booty Shaking tracks",
            "Exclude most Static tracks",], },
    {
        name: "Energy", feature: "energy", color: "#2e72dc", labelUp: "Intense", labelDown: "Chill", tooltip: "How intense or chill?",
        thumb: [
            "Exclude Flobby tracks",
            "Exclude Energetic tracks",
        ],
    },
    {name: "Mood", feature: "valence", color: "#e95c02", labelUp: "Happy", labelDown: "Sad", tooltip: "How happy or sad?",
        thumb: [
            "Exclude Saddest tracks",
            "Exclude Happiest tracks",
        ],
    },
    // { name: 'Crises', feature: 'crises', color: '#FFD700', labelUp: 'Loads', labelDown: 'Few' },
    {
        name: "Instruments", feature: "instrumentalness", color: "#D62598", labelUp: "Only", labelDown: "Acapella", tooltip: "How much instrumental?",
        thumb: [
            "Exclude tracks with less Instruments",
            "Exclude most Instrumental tracks",
        ],
    },
    {
        name: "Speech", feature: "speechiness", color: "#4E008E", labelUp: "Only", labelDown: "Nope", tooltip: "Is it an audio book or sthg else?",
        thumb: [
            "Exclude tracks with less Speech",
            "Exclude tracks with more Speech",
        ],
    },
    {
        name: "Liveness", feature: "liveness", color: "#F93822", labelUp: "Concert", labelDown: "Studio", tooltip: "Is it a concert or a studio track?",
        thumb: [
            "Exclude Studio recording tracks",
            "Exclude Live recording tracks",
        ],
    },
    {
        name: "Acoustic", feature: "acousticness", color: "#00249C", labelUp: "Acoustic", labelDown: "Synthetic", tooltip: "Is it country music or EDM?",
        thumb: [
            "Exclude most Synthetic tracks",
            "Exclude most Acoustic tracks",
        ],
    },
];

export const slidersSimple = [
    { name: "Key", feature: "key", color: "#5B0279", labelUp: "B", labelDown: "C", tooltip: "Pitch Class Notation from C to...B!" },
    { name: "BPM", feature: "tempo", color: "#B5A70C", labelUp: "Speedy", labelDown: "SlowMo", tooltip: "Times a foot hits the ground per minute" },
    { name: "Danceable", feature: "danceability", color: "#30B700", labelUp: "Booty Shake", labelDown: "Static", tooltip: "How much do you wanna dance?" },
    { name: "Energy", feature: "energy", color: "#2e72dc", labelUp: "Intense", labelDown: "Chill", tooltip: "How intense or chill?" },
    { name: "Mood", feature: "valence", color: "#e95c02", labelUp: "Happy", labelDown: "Sad", tooltip: "How happy or sad?" },
    // { name: 'Crises', feature: 'crises', color: '#FFD700', labelUp: 'Loads', labelDown: 'Few' },
    { name: "Instruments", feature: "instrumentalness", color: "#D62598", labelUp: "Only", labelDown: "Acapella", tooltip: "How much instrumental?" },
    { name: "Speech", feature: "speechiness", color: "#4E008E", labelUp: "Only", labelDown: "Nope", tooltip: "Is it an audio book or sthg else?" },
    { name: "Liveness", feature: "liveness", color: "#F93822", labelUp: "Concert", labelDown: "Studio", tooltip: "Is it a concert or a studio track?" },
    { name: "Acoustic", feature: "acousticness", color: "#00B17A", labelUp: "Acoustic", labelDown: "Synthetic", tooltip: "Is it country music or EDM?" },
];

export const featuresOfInterest = ["key", "bpm", "danceability", "energy", "valence", "liveness", "instrumentalness", "speechiness", "acousticness"];
