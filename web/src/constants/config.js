export const WHITE_NOISES = [
  {
    id: "1",
    name: "White Noise",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484921/music/white-noise.mp3",
  },
  {
    id: "2",
    name: "Pink Noise",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484913/music/pink-noise.mp3",
  },
  {
    id: "3",
    name: "Waves",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484925/music/waves.mp3",
  },
  {
    id: "4",
    name: "Ocean",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484927/music/ocean.mp3",
  },
  {
    id: "5",
    name: "Waterfall",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484922/music/waterfall.mp3",
  },
  {
    id: "6",
    name: "Rain 1",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484918/music/rain.mp3",
  },
  {
    id: "7",
    name: "Rain 2",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484913/music/rain-2.mp3",
  },
  {
    id: "8",
    name: "Dryer",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484925/music/dryer.mp3",
  },
  {
    id: "9",
    name: "Heater",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484918/music/heater.mp3",
  },
  {
    id: "10",
    name: "Fan",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484914/music/fan.mp3",
  },
  {
    id: "11",
    name: "Ocean 2",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663484912/music/ocean-2.mp3",
  },
];
export const FOCUS = [
  {
    id: "1",
    name: "Alpha BiNaural Beat for Focus",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1664119614/music/focus/Alpha_BiNaural_Beat_for_Focus.mp3",
    cover: `${process.env.PUBLIC_URL}/media-assets/default-album-cover.jpg`,
  },
  {
    id: "2",
    name: "Productive Work Focus",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1664119617/music/focus/Productive_Work_Focus.mp3",
  },
  {
    id: "3",
    name: "Alpha Waves Relaxing",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1664119610/music/focus/Alpha_Waves_Relaxing.mp3",
  },
  {
    id: "4",
    name: "Chill Work",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1664119623/music/focus/Chill_Work.mp3",
  },
];
export const LOFI = [];
export const AMBIENCE = [];
export const SLEEPING = [
  {
    id: "1",
    name: "Relaxed Sleep",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663781421/music/sleeping/relaxed-sleep-part-1.mp3",
  },
];
export const DIVINE = [
  {
    id: "1",
    name: "Shiva Dhyana Mantra",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663729686/music/divine/shiva-dhyana-mantra.mp3",
  },
  {
    id: "2",
    name: "Divine Calm Music",
    fileUrl:
      "https://res.cloudinary.com/sivadass/video/upload/v1663645625/music/divine/divine-calm-music.mp3",
  },
];

export const musicFiles = [];

export const PLAYLISTS = [
  {
    id: 1,
    name: "Focus",
    description: "",
    musics: FOCUS,
    cover: `${process.env.PUBLIC_URL}/media-assets/default-playlist-cover.jpg`,
  },
  {
    id: 2,
    name: "White Noise",
    description:
      "People use white noise for sleeping, focus, sound masking or relaxation",
    musics: WHITE_NOISES,
    cover: `${process.env.PUBLIC_URL}/media-assets/default-playlist-cover.jpg`,
  },
  {
    id: 3,
    name: "Lofi",
    description: "",
    musics: LOFI,
    cover: `${process.env.PUBLIC_URL}/media-assets/default-playlist-cover.jpg`,
  },
  {
    id: 4,
    name: "Ambience",
    description: "",
    musics: AMBIENCE,
    cover: `${process.env.PUBLIC_URL}/media-assets/default-playlist-cover.jpg`,
  },
  {
    id: 5,
    name: "Divine",
    description: "",
    musics: DIVINE,
    cover: `${process.env.PUBLIC_URL}/media-assets/default-playlist-cover.jpg`,
  },
  {
    id: 6,
    name: "Sleeping",
    description: "",
    musics: SLEEPING,
    cover: `${process.env.PUBLIC_URL}/media-assets/default-playlist-cover.jpg`,
  },
];
