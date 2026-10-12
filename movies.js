// Sample catalogue for the prototype. Descriptions are my own one-line pitches.
// mood tags: laugh, feelgood, thrill, mindbend, romance, cry
const MOVIES = [
  // Marvel
  { id: "ironman",   title: "Iron Man",                  year: 2008, lang: "English",   mins: 126, genre: "Marvel",          moods: ["thrill", "laugh"],          fav: true, pitch: "A genius billionaire builds a suit of armour to escape, and becomes a hero." },
  { id: "guardians", title: "Guardians of the Galaxy",   year: 2014, lang: "English",   mins: 121, genre: "Marvel",          moods: ["laugh", "thrill", "feelgood"], fav: true, pitch: "A band of misfits, one talking raccoon and a tree, try to save the galaxy." },
  { id: "ragnarok",  title: "Thor: Ragnarok",            year: 2017, lang: "English",   mins: 130, genre: "Marvel",          moods: ["laugh", "thrill"],          fav: true, pitch: "Thor loses his hammer and has to fight his way off a trash planet." },
  { id: "panther",   title: "Black Panther",             year: 2018, lang: "English",   mins: 134, genre: "Marvel",          moods: ["thrill", "feelgood"],       fav: true, pitch: "A new king must defend Wakanda from a challenger with a claim to the throne." },
  { id: "strange",   title: "Doctor Strange",            year: 2016, lang: "English",   mins: 115, genre: "Marvel",          moods: ["mindbend", "thrill"],       fav: true, pitch: "A surgeon loses his hands and finds a world of magic and folding cities." },
  { id: "endgame",   title: "Avengers: Endgame",         year: 2019, lang: "English",   mins: 181, genre: "Marvel",          moods: ["thrill", "cry"],            fav: true, pitch: "The remaining Avengers get one last chance to undo the snap." },
  { id: "spiderverse", title: "Spider-Man: Into the Spider-Verse", year: 2018, lang: "English", mins: 117, genre: "Marvel · Animation", moods: ["feelgood", "thrill"], fav: true, pitch: "A Brooklyn teenager learns he isn't the only Spider-Person." },
  // Disney & Pixar
  { id: "coco",      title: "Coco",                      year: 2017, lang: "English",   mins: 105, genre: "Disney Pixar",    moods: ["feelgood", "cry"],          fav: true, pitch: "A boy who dreams of music ends up in the Land of the Dead." },
  { id: "frozen",    title: "Frozen",                    year: 2013, lang: "English",   mins: 102, genre: "Disney",          moods: ["feelgood", "laugh"],        fav: true, pitch: "A fearless princess sets out to find her sister, whose powers froze their kingdom." },
  { id: "moana",     title: "Moana",                     year: 2016, lang: "English",   mins: 107, genre: "Disney",          moods: ["feelgood", "thrill"],       fav: true, pitch: "A chief's daughter sails across the ocean with a demigod to save her island." },
  { id: "zootopia",  title: "Zootopia",                  year: 2016, lang: "English",   mins: 108, genre: "Disney",          moods: ["laugh", "mindbend"],        fav: true, pitch: "A rookie bunny cop and a sly fox team up to crack a city-wide case." },
  { id: "insideout", title: "Inside Out",                year: 2015, lang: "English",   mins: 95,  genre: "Disney Pixar",    moods: ["cry", "feelgood"],          fav: true, pitch: "The emotions inside an 11-year-old's head try to steer her through a big move." },
  { id: "tangled",   title: "Tangled",                   year: 2010, lang: "English",   mins: 100, genre: "Disney",          moods: ["romance", "laugh", "feelgood"], fav: true, pitch: "A girl with very long hair finally leaves her tower, with a thief as her guide." },
  { id: "up",        title: "Up",                        year: 2009, lang: "English",   mins: 96,  genre: "Disney Pixar",    moods: ["cry", "feelgood"],          fav: true, pitch: "An old man ties thousands of balloons to his house, with a stowaway scout aboard." },
  // Malayalam
  { id: "minnal",    title: "Minnal Murali",             year: 2021, lang: "Malayalam", mins: 158, genre: "Superhero",       moods: ["laugh", "thrill"],          fav: true, pitch: "A tailor in a small Kerala village is struck by lightning and gets superpowers." },
  { id: "premam",    title: "Premam",                    year: 2015, lang: "Malayalam", mins: 156, genre: "Romance",         moods: ["romance", "laugh"],         fav: true, pitch: "One man's three loves, from school to his thirties." },
  { id: "drishyam",  title: "Drishyam",                  year: 2013, lang: "Malayalam", mins: 160, genre: "Thriller",        moods: ["thrill", "mindbend"],       fav: true, pitch: "An ordinary man uses everything he's learned from films to protect his family." },
  { id: "kumbalangi",title: "Kumbalangi Nights",         year: 2019, lang: "Malayalam", mins: 135, genre: "Drama",           moods: ["feelgood", "cry"],          fav: true, pitch: "Four messy brothers on a fishing village island try to become a family." },
  { id: "bangalore", title: "Bangalore Days",            year: 2014, lang: "Malayalam", mins: 172, genre: "Comedy drama",    moods: ["feelgood", "laugh", "romance"], fav: true, pitch: "Three cousins move to Bangalore, each chasing a very different dream." },
  { id: "manjummel", title: "Manjummel Boys",            year: 2024, lang: "Malayalam", mins: 135, genre: "Survival thriller", moods: ["thrill", "cry"],          fav: true, pitch: "A group of friends on a trip to Kodaikanal face their worst nightmare in a cave." },
  { id: "hridayam",  title: "Hridayam",                  year: 2022, lang: "Malayalam", mins: 172, genre: "Romance",         moods: ["romance", "cry", "feelgood"], fav: true, pitch: "An engineering student's life, loves and friendships, from college to fatherhood." },
  // Other Indian languages
  { id: "3idiots",   title: "3 Idiots",                  year: 2009, lang: "Hindi",     mins: 170, genre: "Comedy drama",    moods: ["laugh", "feelgood", "cry"], pitch: "Three engineering students take on a college that cares more about marks than learning." },
  { id: "znmd",      title: "Zindagi Na Milegi Dobara",  year: 2011, lang: "Hindi",     mins: 155, genre: "Road trip",       moods: ["feelgood", "laugh"],        pitch: "Three old friends, one road trip across Spain, and one dare each." },
  { id: "queen",     title: "Queen",                     year: 2014, lang: "Hindi",     mins: 146, genre: "Comedy drama",    moods: ["feelgood", "laugh"],        pitch: "Left at the altar, a shy girl goes on her honeymoon alone, and finds herself." },
  { id: "96",        title: "96",                        year: 2018, lang: "Tamil",     mins: 158, genre: "Romance",         moods: ["romance", "cry"],           pitch: "Two school sweethearts meet again at a reunion, twenty years later." },
  { id: "vikram",    title: "Vikram Vedha",              year: 2017, lang: "Tamil",     mins: 147, genre: "Crime thriller",  moods: ["thrill", "mindbend"],       pitch: "A cop hunts a gangster who answers every question with a story." },
  { id: "baahubali", title: "Baahubali: The Beginning",  year: 2015, lang: "Telugu",    mins: 159, genre: "Epic",            moods: ["thrill"],                   pitch: "A young man climbs a waterfall and discovers the kingdom he was born to." },
  { id: "rrr",       title: "RRR",                       year: 2022, lang: "Telugu",    mins: 187, genre: "Action epic",     moods: ["thrill", "feelgood"],       pitch: "Two revolutionaries become unlikely friends, and dance their way into history." },
  { id: "kantara",   title: "Kantara",                   year: 2022, lang: "Kannada",   mins: 148, genre: "Folk thriller",   moods: ["thrill", "mindbend"],       pitch: "A village's ancient beliefs clash with a forest officer and a greedy landlord." },
  { id: "sairat",    title: "Sairat",                    year: 2016, lang: "Marathi",   mins: 174, genre: "Romance",         moods: ["romance", "cry"],           pitch: "Two teenagers from different worlds fall in love, against everyone's wishes." },
];

const MOODS = {
  laugh: "Make us laugh",
  feelgood: "Feel-good",
  thrill: "Edge of our seats",
  mindbend: "Mind-bending",
  romance: "Romance",
  cry: "A good cry",
};

// Tastes for the demo friends, so their automatic votes feel realistic.
// Each mood they love pushes a film towards "yes"; each mood they avoid pushes it towards "no".
const DEMO_TASTES = [
  { love: ["laugh", "feelgood"], avoid: ["cry"] },
  { love: ["thrill", "mindbend"], avoid: ["romance"] },
  { love: ["romance", "feelgood"], avoid: ["thrill"] },
  { love: ["laugh", "thrill"], avoid: ["cry"] },
  { love: ["mindbend", "cry"], avoid: [] },
];
