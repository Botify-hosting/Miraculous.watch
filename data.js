// Placeholder data for the fan site. Replace with real content when ready.
// Descriptions here are original placeholder blurbs, not copied from any official source.

const SEASONS = [1, 2, 3, 4];

const EPISODES = [
  { id: 1, season: 1, ep: 1, title: "The Origin Spark", runtime: "22m", desc: "A new guardian discovers an ancient box hidden beneath the city, and two ordinary teens are handed extraordinary responsibility." },
  { id: 2, season: 1, ep: 2, title: "Stormglass", runtime: "22m", desc: "A rainy afternoon turns chaotic when a classmate's frustration takes on a life of its own." },
  { id: 3, season: 1, ep: 3, title: "The Copycat", runtime: "23m", desc: "Someone in class starts mimicking a hero's every move — but not for the reasons anyone expects." },
  { id: 4, season: 1, ep: 4, title: "Silent Bell", runtime: "22m", desc: "A missing memento sends one hero into a spiral of doubt right before a big performance." },
  { id: 5, season: 1, ep: 5, title: "Glassworks", runtime: "24m", desc: "An art class project shatters, literally, when jealousy gets the better of a rising talent." },
  { id: 6, season: 1, ep: 6, title: "Nightfall Garden", runtime: "22m", desc: "A midnight rooftop meeting raises more questions than it answers about a hidden identity." },
  { id: 7, season: 2, ep: 1, title: "Rewritten", runtime: "23m", desc: "A season premiere shakes up the balance of power just as a new rival enters the picture." },
  { id: 8, season: 2, ep: 2, title: "Paper Crown", runtime: "22m", desc: "A school election spirals out of control when ambition turns into something darker." },
  { id: 9, season: 2, ep: 3, title: "Echo Chamber", runtime: "24m", desc: "A recording meant to stay private ends up putting a friendship to the test." },
  { id: 10, season: 2, ep: 4, title: "Undertow", runtime: "22m", desc: "A class trip to the coast turns tense as old grudges resurface." },
  { id: 11, season: 2, ep: 5, title: "The Long Way Home", runtime: "23m", desc: "One hero must choose between duty and a promise made long before the mask." },
  { id: 12, season: 3, ep: 1, title: "Threshold", runtime: "24m", desc: "A new threat forces the team to question who they can really trust." },
  { id: 13, season: 3, ep: 2, title: "Static", runtime: "22m", desc: "Interference from an unknown source scrambles more than just the city's signals." },
  { id: 14, season: 3, ep: 3, title: "Half Light", runtime: "23m", desc: "A double life gets harder to hide when two worlds collide at the worst possible moment." },
  { id: 15, season: 3, ep: 4, title: "The Understudy", runtime: "22m", desc: "When the lead falls ill, an unlikely stand-in steps into a role much bigger than a school play." },
  { id: 16, season: 4, ep: 1, title: "Aftershock", runtime: "25m", desc: "The fallout from a citywide incident forces old allies to pick sides." },
  { id: 17, season: 4, ep: 2, title: "Keepsake", runtime: "22m", desc: "A forgotten heirloom holds more power than anyone realizes, until it's too late to ignore." },
  { id: 18, season: 4, ep: 3, title: "Counterpoint", runtime: "23m", desc: "Two rivals are forced into an uneasy truce to stop a bigger threat." },
];

const CHARACTERS = [
  { name: "The Ladybug", role: "Lucky Charm", color: "var(--red)", desc: "Quick-thinking and fiercely loyal, she turns bad luck into a plan on the fly." },
  { name: "The Black Cat", role: "Bad Luck", color: "#2E3A59", desc: "Charming, a little reckless, and always ready to take the hit so someone else doesn't have to." },
  { name: "The Guardian", role: "Keeper of Secrets", color: "#5B4636", desc: "Old, tired, and carrying a responsibility heavier than anyone around him realizes." },
  { name: "The Rival", role: "Wildcard", color: "#8E44AD", desc: "Not quite friend, not quite foe — motives that shift with every episode." },
  { name: "The Best Friend", role: "Anchor", color: "#2A9D8F", desc: "The one constant in a life that keeps getting more complicated by the week." },
  { name: "The Antagonist", role: "Puppeteer", color: "#3A3A3A", desc: "Working from the shadows, turning everyday frustration into something far more dangerous." },
];

function getEpisode(id){
  return EPISODES.find(e => e.id === Number(id));
}
function getEpisodesBySeason(season){
  if(!season || season === "all") return EPISODES;
  return EPISODES.filter(e => e.season === Number(season));
}
function getAdjacent(id){
  const idx = EPISODES.findIndex(e => e.id === Number(id));
  return { prev: EPISODES[idx-1] || null, next: EPISODES[idx+1] || null };
}
