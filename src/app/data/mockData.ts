export type PlanetId = string;

export interface Planet {
  id: PlanetId;
  name: string;
  palette: {
    base: string;
    color: string;
  };
  size: number;
  position: [number, number, number];
  stampIcon: string;
  description: string;
  textureConfig: {
    roughness: number;
    bumpScale: number;
  };
  bgColor?: string; // light scene background; undefined = default dark (#05060A)
}

export const PLANETS: Planet[] = [
  {
    id: 'knitting',
    name: 'Knitting',
    palette: { base: 'bg-rose-900', color: '#4c1d95' },
    size: 2,
    position: [-7, 0.5, -3],
    stampIcon: 'yarn-ball',
    description: 'Looped yarns and cosy knitted landscapes.',
    textureConfig: { roughness: 0.9, bumpScale: 0.2 },
    bgColor: '#CEE4FF',
  },
  {
    id: 'woodworking',
    name: 'Woodworking',
    palette: { base: 'bg-amber-900', color: '#78350f' },
    size: 2.2,
    position: [6, 0.5, -8],
    stampIcon: 'wood-burn',
    description: 'Carved valleys and timber forests.',
    textureConfig: { roughness: 0.8, bumpScale: 0.5 },
    bgColor: '#FEF3C6',
  },
  {
    id: 'garden',
    name: 'Garden',
    palette: { base: 'bg-emerald-900', color: '#064e3b' },
    size: 3,
    position: [0, -4, -10],
    stampIcon: 'leaf-press',
    description: 'Sprouting flora and mossy hills.',
    textureConfig: { roughness: 1, bumpScale: 0.3 },
    bgColor: '#F0FFB5',
  },
  {
    id: 'pottery',
    name: 'Pottery',
    palette: { base: 'bg-orange-800', color: '#9a3412' },
    size: 1.8,
    position: [6, -4, -2],
    stampIcon: 'kiln',
    description: 'Smooth clay mounds and glowing kilns.',
    textureConfig: { roughness: 0.4, bumpScale: 0.05 },
    bgColor: '#ADEFFF',
  },
  {
    id: 'polymer-clay',
    name: 'Polymer Clay',
    palette: { base: 'bg-fuchsia-300', color: '#f0abfc' },
    size: 2.5,
    position: [-5, -3, 0],
    stampIcon: 'fingerprint',
    description: 'Pastel dough landscapes dotted with charms.',
    textureConfig: { roughness: 0.6, bumpScale: 0.1 },
    bgColor: '#FEEB8E',
  },
  {
    id: 'baking',
    name: 'Baking',
    palette: { base: 'bg-amber-700', color: '#92400e' },
    size: 3,
    position: [1, 2.5, -5],
    stampIcon: 'cake',
    description: 'Tiered cakes, silky custards and caramel-edged delights.',
    textureConfig: { roughness: 0.7, bumpScale: 0.15 },
    bgColor: '#FFF8E1',
  },
  {
    id: 'painting',
    name: 'Painting',
    palette: { base: 'bg-indigo-700', color: '#3730a3' },
    size: 1.9,
    position: [-6, 1, -8],
    stampIcon: 'palette',
    description: 'Pigment seas and brushstroke mountain ranges.',
    textureConfig: { roughness: 0.5, bumpScale: 0.08 },
    bgColor: '#EEF2FF',
  },
];

export interface Comment {
  id: string;
  authorName: string;
  text: string;
  timestamp: number;
}

export type Visibility = 'public' | 'connections' | 'anonymous';

export interface Contribution {
  id: string;
  planetId: PlanetId;
  title: string;
  description: string;
  makerName: string;
  makerId: string;
  likes: number;
  comments: Comment[];
  image?: string;
  link?: string;
  visibility?: Visibility;
  lat: number; // Latitude in radians (-PI/2 to PI/2)
  lon: number; // Longitude in radians (-PI to PI)
}

export interface Maker {
  id: string;
  name: string;
  bio: string;
}

export const MAKERS: Maker[] = [
  { id: 'u1',  name: 'Lila Clay',      bio: 'Art teacher by day, polymer clay obsessive by night. I started sculpting charms for my students and now my kitchen table is permanently covered in clay dust.' },
  { id: 'u2',  name: 'MakerMia',       bio: 'Former graphic designer who traded screens for clay. I love the tactile immediacy of working with my hands — no undo button, no layers panel, just me and the material.' },
  { id: 'u3',  name: 'AmphibianArts',  bio: 'Marine biologist with a soft spot for tiny creatures. I sculpt the animals I study in the field — frogs, salamanders, axolotls — as a way of slowing down and really seeing them.' },
  { id: 'u4',  name: 'PlantDad',       bio: `I share a small flat with 47 plants and counting. Propagating, repotting, and talking to leaves is my version of meditation. The plants don't talk back, but they do grow.` },
  { id: 'u5',  name: 'KnitWit',        bio: 'Retired maths teacher who found knitting is basically applied geometry. I draft my own patterns on graph paper and refuse to use pre-made cables without at least altering the stitch count.' },
  { id: 'u6',  name: 'ClayMation',     bio: `I came to pottery in my forties and it has been a complete revelation. There is something humbling about learning to centre — the wheel doesn't care how impatient you are.` },
  { id: 'u7',  name: 'WhittleGuy',     bio: 'I keep a knife in my jacket pocket and a block of basswood on my desk. Commutes, lunch breaks, waiting rooms — any idle moment becomes a carving session.' },
  { id: 'u8',  name: 'PastelPusher',   bio: `Colour theory nerd and cane-work devotee. I blend clays the way a painter mixes pigments — obsessively, methodically, and always chasing a specific shade that probably doesn't exist yet.` },
  { id: 'u9',  name: 'CharmFactory',   bio: `Started selling charms at a local market three years ago and haven't stopped. I make things that are meant to be worn every day, not put in a display case.` },
  { id: 'u10', name: 'GrowGuru',       bio: 'I grow most of my own food on a 6×4m plot and document every season. Failed crops taught me more than the successful ones — the compost pile is really where the learning happens.' },
  { id: 'u11', name: 'DesertBloom',    bio: 'Living in a hot, dry climate has made me fall hard for drought-tolerant plants. Succulents, cacti, and anything with silvery foliage — I appreciate plants that thrive on neglect.' },
  { id: 'u12', name: 'TinyTreeMaker',  bio: 'Bonsai practitioner for twelve years and still very much a student. I find the long timescale of the art form deeply calming — the tree has its own pace and you just have to accept that.' },
  { id: 'u13', name: 'LoopLady',       bio: 'I learned to crochet from my grandmother and immediately started ignoring everything she taught me. I love mixing techniques and fibers that are not supposed to go together.' },
  { id: 'u14', name: 'WarpWeft',       bio: 'Weaver and occasional spinner. I source fleece directly from small farms and process it myself — the whole journey from raw wool to finished cloth feels like slow magic.' },
  { id: 'u15', name: 'KnotNaut',       bio: 'Sailor turned macramé maker. Knots were already my language — I just had to learn to tie them in cotton rope instead of running rigging. The aesthetics are considerably better.' },
  { id: 'u16', name: 'SpinCycle',      bio: 'Ceramics degree, ten years of teaching, still endlessly surprised by what comes out of the kiln. Glaze chemistry is the part I am most obsessed with — it is basically alchemy.' },
  { id: 'u17', name: 'DirtFingers',    bio: 'I make functional pottery because I think the best ceramics are the ones people actually use. A cup that someone reaches for every morning is more interesting to me than one on a shelf.' },
  { id: 'u18', name: 'GrainChaser',    bio: 'Furniture maker with a wood sourcing problem. I spend as much time hunting for interesting slabs at salvage yards as I do in the shop. The story of the wood matters to me.' },
  { id: 'u19', name: 'PlaneMaker',     bio: 'Hand-tool only woodworker. I converted my garage and took the power tools to the tip. The quiet is the whole point — just the sound of a well-tuned plane on a straight-grained board.' },
  { id: 'u20', name: 'CrustQueen',     bio: 'I test every recipe until I understand why it works, not just that it works. My baking journals go back eight years and I still reference them. Baking is the one place I am genuinely scientific.' },
  { id: 'u21', name: 'FlourPower',     bio: 'Pastry chef turned home baker after burning out. Cooking for myself and friends with no ticket pressure turned something stressful back into something I love. The macarons are just for me now.' },
  { id: 'u22', name: 'BakeLab',        bio: 'I approach baking like a flavour scientist — I keep spreadsheets on infusion ratios and always have at least four test batches on the go. My flatmates are extremely well-fed.' },
  { id: 'u23', name: 'BrushStroke',    bio: 'Landscape painter working in oils, mostly outdoors. I believe paintings should smell like the place they were made — pine resin, sea salt, cut grass. Bring the feeling back with you.' },
  { id: 'u24', name: 'PigmentPete',    bio: `I have been watercolouring since I was eight and I still can't fully predict it. That unpredictability is the whole appeal — I am collaborating with the water, not controlling it.` },
  { id: 'u25', name: 'CanvasChaos',    bio: `Abstract painter and recovering perfectionist. Acrylic pours taught me to let go of outcomes. Now I make things that couldn't have been planned, and that feels like the most honest art I've made.` },
];

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  // Polymer Clay — pastel dough landscapes dotted with charms (fuchsia/lavender aesthetic)
  {
    id: 'pc1', planetId: 'polymer-clay', title: 'Strawberry Charm', makerName: 'Lila Clay', makerId: 'u1',
    description: 'Used translucent clay mixed with red to get that juicy glow. Tiny seeds drawn on with a needle tool.',
    likes: 120,
    comments: [
      { id: 'c1', authorName: 'MakerMia', text: 'The translucency trick is genius! What brand of clay did you use?', timestamp: 1718000000000 },
      { id: 'c2', authorName: 'AmphibianArts', text: 'So cute, I want to make a whole fruit salad set!', timestamp: 1718003600000 },
    ],
    image: '/polymer clay/strawberry.jpg',
    lat: 0.5, lon: 0.5,
  },
  {
    id: 'pc2', planetId: 'polymer-clay', title: 'Tiny Glazed Donut', makerName: 'MakerMia', makerId: 'u2',
    description: 'Chalk pastels rubbed on before baking for the baked-colour gradient. Icing made from liquid clay.',
    likes: 85,
    comments: [
      { id: 'c2a', authorName: 'CharmFactory', text: 'The sprinkles are actual polymer clay micro-dots?! That is dedication.', timestamp: 1718005000000 },
    ],
    image: '/polymer clay/donut.jpg',
    lat: -0.2, lon: 1.5,
  },
  {
    id: 'pc3', planetId: 'polymer-clay', title: 'Froggy Pal', makerName: 'AmphibianArts', makerId: 'u3',
    description: 'Sculpted over a wire armature so the legs hold their pose. Gloss glaze makes him look perpetually wet.',
    likes: 210,
    comments: [
      { id: 'c3', authorName: 'KnitWit', text: 'He looks so happy! Love the gloss effect.', timestamp: 1718007200000 },
      { id: 'c3b', authorName: 'PastelPusher', text: 'The little toe beans absolutely sent me.', timestamp: 1718009000000 },
    ],
    image: '/polymer clay/froggy.jpg',
    lat: 0.8, lon: -1.0,
  },
  {
    id: 'pc4', planetId: 'polymer-clay', title: 'Rainbow Mushroom', makerName: 'PastelPusher', makerId: 'u8',
    description: 'Layered gradient technique with Premo clay — eight colour blends rolled together then sliced.',
    likes: 340,
    comments: [
      { id: 'c4a', authorName: 'Lila Clay', text: 'How did you keep the colours from muddying? Mine always turn brown!', timestamp: 1718010000000 },
    ],
    image: '/polymer clay/mushroom.jpg',
    lat: -0.6, lon: -2.1,
  },
  {
    id: 'pc5', planetId: 'polymer-clay', title: 'Cloud Earrings', makerName: 'CharmFactory', makerId: 'u9',
    description: 'Textured with a soft toothbrush before baking for that fluffy look. Lightweight enough for all-day wear.',
    likes: 95,
    comments: [
      { id: 'c5a', authorName: 'MakerMia', text: 'The texture is spot-on — I did a double take thinking it was real felt!', timestamp: 1718011500000 },
    ],
    image: '/polymer clay/cloud.jpg',
    lat: 0.1, lon: 2.8,
  },
  {
    id: 'pc6', planetId: 'polymer-clay', title: 'Cactus Pin', makerName: 'Lila Clay', makerId: 'u1',
    description: 'Sculpted each spine individually using a dental tool — 47 spines total. Worth every hand cramp.',
    likes: 162,
    comments: [
      { id: 'c6a', authorName: 'AmphibianArts', text: 'Forty-seven spines! You are a true artisan.', timestamp: 1718013000000 },
    ],
    image: '/polymer clay/cactus.jpg',
    lat: -0.9, lon: 0.4,
  },
  {
    id: 'pc7', planetId: 'polymer-clay', title: 'Boba Tea Keychain', makerName: 'MakerMia', makerId: 'u2',
    description: 'The pearls are individually rolled black clay balls. Took two hours just for the pearls — zero regrets.',
    likes: 278,
    comments: [
      { id: 'c7a', authorName: 'CharmFactory', text: 'The straw sticking out the top is such a perfect detail!', timestamp: 1718014500000 },
    ],
    image: '/polymer clay/boba tea.jpg',
    lat: 0.35, lon: -2.5,
  },
  {
    id: 'pc8', planetId: 'polymer-clay', title: 'Star Barrette', makerName: 'AmphibianArts', makerId: 'u3',
    description: 'Mokume-gane technique with pearl and navy clay gives the illusion of a night-sky pattern.',
    likes: 191,
    comments: [
      { id: 'c8a', authorName: 'PastelPusher', text: 'The mokume-gane pattern is mesmerising — tutorial please!', timestamp: 1718016000000 },
    ],
    image: '/polymer clay/star.jpg',
    lat: -0.3, lon: -0.9,
  },

  // Garden — sprouting flora and mossy hills (emerald/lush green aesthetic)
  {
    id: 'g1', planetId: 'garden', title: 'Monstera Sprout', makerName: 'PlantDad', makerId: 'u4',
    description: 'Finally got my first fenestration after eighteen months of patience. Growing in a self-watering pot.',
    likes: 300,
    comments: [
      { id: 'c4', authorName: 'Lila Clay', text: 'That first fenestration feeling is unbeatable!', timestamp: 1718010800000 },
      { id: 'c4b', authorName: 'GrowGuru', text: 'Mine took two years — you are ahead of the curve!', timestamp: 1718012000000 },
    ],
    image: '/garden/monstera.jpg',
    lat: 0.3, lon: -0.5,
  },
  {
    id: 'g2', planetId: 'garden', title: 'Raised Bed Harvest', makerName: 'GrowGuru', makerId: 'u10',
    description: 'First tomatoes of the season from my hugelkultur raised bed. They taste like summer itself.',
    likes: 415,
    comments: [
      { id: 'c4c', authorName: 'DesertBloom', text: 'Hugelkultur beds are next level — the moisture retention alone!', timestamp: 1718013500000 },
    ],
    image: '/garden/harvest.png',
    lat: -0.5, lon: 1.2,
  },
  {
    id: 'g3', planetId: 'garden', title: 'Propagation Station', makerName: 'PlantDad', makerId: 'u4',
    description: 'Wall-mounted test tubes with cuttings from every corner of my apartment. Pothos, tradescantia, and a stubborn begonia.',
    likes: 520,
    comments: [
      { id: 'c4d', authorName: 'TinyTreeMaker', text: 'This is the most aesthetically pleasing corner of any apartment I have ever seen.', timestamp: 1718014800000 },
    ],
    image: '/garden/station.jpg',
    lat: 0.7, lon: 2.1,
  },
  {
    id: 'g4', planetId: 'garden', title: 'Succulent Terrarium', makerName: 'DesertBloom', makerId: 'u11',
    description: 'Zero drainage layer — living on the edge. Offsetting the risk with a very light watering schedule.',
    likes: 230,
    comments: [],
    image: '/garden/succolent.jpg',
    lat: -0.8, lon: -1.6,
  },
  {
    id: 'g5', planetId: 'garden', title: 'Herb Window Box', makerName: 'GrowGuru', makerId: 'u10',
    description: 'Basil, rosemary, and mint side by side. My kitchen smells incredible every morning.',
    likes: 189,
    comments: [
      { id: 'c4e', authorName: 'PlantDad', text: 'Warning: the mint will try to take over. It always does.', timestamp: 1718016300000 },
    ],
    image: '/garden/window.jpg',
    lat: 0.05, lon: -2.9,
  },
  {
    id: 'g6', planetId: 'garden', title: 'Bonsai Year Two', makerName: 'TinyTreeMaker', makerId: 'u12',
    description: 'Patience is the entire art form with bonsai. This juniper is just starting to tell its story.',
    likes: 670,
    comments: [
      { id: 'c4f', authorName: 'GrowGuru', text: 'The nebari at the base is already developing beautifully!', timestamp: 1718018000000 },
      { id: 'c4g', authorName: 'PlantDad', text: 'I bow to your patience. Year two already looks better than my year five attempt.', timestamp: 1718019500000 },
    ],
    image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80',
    lat: -0.2, lon: 0.7,
  },
  {
    id: 'g7', planetId: 'garden', title: 'Worm Composting Bin', makerName: 'DesertBloom', makerId: 'u11',
    description: 'Red wigglers are genuinely the best coworkers I have ever had. Zero complaints, perfect output.',
    likes: 144,
    comments: [
      { id: 'c4h', authorName: 'TinyTreeMaker', text: 'I was sceptical until I tried vermicomposting — the castings are liquid gold.', timestamp: 1718021000000 },
    ],
    image: '/garden/compost.jpg',
    lat: 0.9, lon: -0.3,
  },
  {
    id: 'g8', planetId: 'garden', title: 'Kokedama Ball', makerName: 'TinyTreeMaker', makerId: 'u12',
    description: 'Sheet moss wrapped tightly around a fern rootball with jute twine. The most elegant thing I have ever made.',
    likes: 388,
    comments: [
      { id: 'c4i', authorName: 'DesertBloom', text: 'Hanging three of these in a cluster must look magical.', timestamp: 1718022500000 },
    ],
    image: '/garden/ball.jpg',
    lat: -0.55, lon: 2.5,
  },

  // Knitting / Textile — looped yarns and cosy knitted landscapes (rose/lavender/cool blue aesthetic)
  {
    id: 't1', planetId: 'knitting', title: 'Chunky Cardigan Patch', makerName: 'KnitWit', makerId: 'u5',
    description: 'Trying out a new cable knit pattern I drafted myself. The back cross takes some getting used to.',
    likes: 150,
    comments: [
      { id: 'c5a2', authorName: 'WarpWeft', text: 'Self-drafted cables are no small feat — the tension looks incredibly even!', timestamp: 1718024000000 },
    ],
    image: '/knittting/cardigan.jpg',
    lat: 0.1, lon: 0.1,
  },
  {
    id: 't2', planetId: 'knitting', title: 'Indigo Shibori Tote', makerName: 'LoopLady', makerId: 'u13',
    description: 'Ice-dye variation with indigo powder. Every fold and rubber band reveals a surprise when you open it.',
    likes: 310,
    comments: [
      { id: 'c5b', authorName: 'KnotNaut', text: 'The resist patterns are so crisp — did you prewash the canvas?', timestamp: 1718025500000 },
    ],
    image: '/knittting/tote.jpg',
    lat: -0.7, lon: 0.9,
  },
  {
    id: 't3', planetId: 'knitting', title: 'Loom-Woven Wall Hanging', makerName: 'WarpWeft', makerId: 'u14',
    description: 'Rigid heddle loom and some handspun Corriedale wool. The fringe took as long as the weaving.',
    likes: 440,
    comments: [
      { id: 'c5c', authorName: 'LoopLady', text: 'The texture variation from your handspun is exactly what makes this special.', timestamp: 1718027000000 },
    ],
    image: '/knittting/woven-wall.jpg',
    lat: 0.55, lon: -1.8,
  },
  {
    id: 't4', planetId: 'knitting', title: 'Punch Needle Rug', makerName: 'KnitWit', makerId: 'u5',
    description: 'Recycled denim strips punched through monk cloth on a wooden embroidery hoop. Surprisingly meditative.',
    likes: 225,
    comments: [],
    image: '/knittting/rug.jpg',
    lat: -0.35, lon: -2.4,
  },
  {
    id: 't5', planetId: 'knitting', title: 'Crochet Bucket Hat', makerName: 'LoopLady', makerId: 'u13',
    description: 'Raffia yarn in a shell stitch. Stiffened with starch so it holds its shape even in humidity.',
    likes: 570,
    comments: [
      { id: 'c5d', authorName: 'WarpWeft', text: 'The brim is perfectly floppy — that starch trick is going in my notes immediately.', timestamp: 1718028500000 },
    ],
    image: '/knittting/hat.jpg',
    lat: 0.85, lon: 2.6,
  },
  {
    id: 't6', planetId: 'knitting', title: 'Embroidered Denim Jacket', makerName: 'WarpWeft', makerId: 'u14',
    description: 'Sashiko-inspired geometric running stitch across the entire back panel. Three weeks of evening sessions.',
    likes: 390,
    comments: [
      { id: 'c5e', authorName: 'KnotNaut', text: 'The indigo-on-indigo colour palette is so subtle and so sophisticated.', timestamp: 1718030000000 },
    ],
    image: '/knittting/jacket.jpg',
    lat: -0.15, lon: 1.9,
  },
  {
    id: 't7', planetId: 'knitting', title: 'Macramé Plant Hanger', makerName: 'KnotNaut', makerId: 'u15',
    description: 'Square knots all the way down in 5mm cotton rope. My arms genuinely ached after. Totally worth it.',
    likes: 211,
    comments: [
      { id: 'c5f', authorName: 'KnitWit', text: 'The spiral section in the middle is such a lovely detail. Pattern available?', timestamp: 1718031500000 },
    ],
    image: '/knittting/macrame.jpg',
    lat: 0.4, lon: -0.6,
  },

  // Pottery — smooth clay mounds and glowing kilns (earthy terracotta/orange-red aesthetic)
  {
    id: 'p1', planetId: 'pottery', title: 'Terracotta Vase', makerName: 'ClayMation', makerId: 'u6',
    description: 'My first successful wheel throw! Struggled with centring for weeks before this one finally opened up.',
    likes: 180,
    comments: [
      { id: 'c5g', authorName: 'WhittleGuy', text: 'The centering alone takes forever to master. Well done!', timestamp: 1718014400000 },
      { id: 'c6', authorName: 'PlantDad', text: 'Would look absolutely perfect with a snake plant in it!', timestamp: 1718018000000 },
    ],
    image: '/pottery/terracota.jpg',
    lat: -0.4, lon: 0.8,
  },
  {
    id: 'p2', planetId: 'pottery', title: 'Speckled Cereal Bowl', makerName: 'SpinCycle', makerId: 'u16',
    description: 'Found the perfect glaze combo after six test tiles — iron oxide over white slip, reduction fired.',
    likes: 295,
    comments: [
      { id: 'c6a2', authorName: 'DirtFingers', text: 'Six test tiles is commitment. The result speaks for itself though!', timestamp: 1718019800000 },
    ],
    image: '/pottery/cereal.jpg',
    lat: 0.65, lon: -2.0,
  },
  {
    id: 'p3', planetId: 'pottery', title: 'Raku Fire Bowl', makerName: 'ClayMation', makerId: 'u6',
    description: 'Pulled it from the kiln glowing red-hot and dropped it in a can of newspaper. The smoke reduction shocked me.',
    likes: 482,
    comments: [
      { id: 'c6b', authorName: 'SpinCycle', text: 'Raku is pure theatre. That crackle pattern is gorgeous!', timestamp: 1718021200000 },
    ],
    image: '/pottery/raku.jpg',
    lat: -0.1, lon: 2.3,
  },
  {
    id: 'p4', planetId: 'pottery', title: 'Pinch Pot Espresso Cup', makerName: 'SpinCycle', makerId: 'u16',
    description: 'Thinnest walls I have ever achieved — 3mm even all the way round. Finally!',
    likes: 134,
    comments: [],
    image: '/pottery/expresso.jpg',
    lat: 0.25, lon: 1.0,
  },
  {
    id: 'p5', planetId: 'pottery', title: 'Slab-Built Planter', makerName: 'DirtFingers', makerId: 'u17',
    description: 'Pressed lace fabric into the slab before cutting to get the texture. Fired with a sage green celadon glaze.',
    likes: 218,
    comments: [
      { id: 'c6c', authorName: 'ClayMation', text: 'The lace texture disappears in the kiln so gently — just the ghost of it remains!', timestamp: 1718022800000 },
    ],
    image: '/pottery/slab.jpg',
    lat: -0.75, lon: -1.1,
  },
  {
    id: 'p6', planetId: 'pottery', title: 'Yunomi Tea Cup', makerName: 'DirtFingers', makerId: 'u17',
    description: 'Japanese-style tumbler thrown without a handle. The ash glaze ran down the side in the most perfect way.',
    likes: 367,
    comments: [
      { id: 'c6d', authorName: 'SpinCycle', text: 'Ash glazes are so unpredictable and that is exactly what makes them beautiful.', timestamp: 1718024200000 },
    ],
    image: '/pottery/tea.jpg',
    lat: 0.9, lon: 0.2,
  },

  // Woodworking — carved valleys and timber forests (warm amber/brown aesthetic)
  {
    id: 'w1', planetId: 'woodworking', title: 'Carved Bear', makerName: 'WhittleGuy', makerId: 'u7',
    description: 'Whittled from a single block of white pine over four evenings. The grain direction fought me the whole way.',
    likes: 250,
    comments: [
      { id: 'c7', authorName: 'ClayMation', text: 'The texture on the fur is incredible — how did you get that depth?', timestamp: 1718021600000 },
      { id: 'c7b', authorName: 'GrainChaser', text: 'Reading grain on pine is an underrated skill. This shows real experience.', timestamp: 1718023000000 },
    ],
    image: '/woodwork/bear.jpg',
    lat: 0.6, lon: -0.8,
  },
  {
    id: 'w2', planetId: 'woodworking', title: 'Live-Edge Serving Board', makerName: 'GrainChaser', makerId: 'u18',
    description: 'Black walnut slab with the natural live edge intact. Finished with three coats of food-safe beeswax.',
    likes: 510,
    comments: [
      { id: 'c7c', authorName: 'PlaneMaker', text: 'The butterfly joint holding that crack is a nice touch — functional and beautiful.', timestamp: 1718025000000 },
    ],
    image: '/woodwork/board.jpg',
    lat: -0.4, lon: 1.7,
  },
  {
    id: 'w3', planetId: 'woodworking', title: 'Spoon Set', makerName: 'WhittleGuy', makerId: 'u7',
    description: 'Green-wood carving with a sloyd knife and hook knife. Birch is so forgiving when it is freshly cut.',
    likes: 188,
    comments: [
      { id: 'c7d', authorName: 'GrainChaser', text: 'The transition from handle to bowl on the soup spoon is so elegant!', timestamp: 1718026500000 },
    ],
    image: '/woodwork/spoon.webp',
    lat: 0.15, lon: -2.7,
  },
  {
    id: 'w4', planetId: 'woodworking', title: 'Floating Shelf Trio', makerName: 'PlaneMaker', makerId: 'u19',
    description: 'Zero visible hardware — all mounted with a hidden French cleat system I machined from scrap oak.',
    likes: 334,
    comments: [],
    image: '/woodwork/shelves.webp',
    lat: -0.65, lon: -0.4,
  },
  {
    id: 'w5', planetId: 'woodworking', title: 'Bandsaw Box', makerName: 'GrainChaser', makerId: 'u18',
    description: 'Cut a log into a fitted drawer box entirely on the bandsaw. The technique still feels like magic every time.',
    likes: 427,
    comments: [
      { id: 'c7e', authorName: 'WhittleGuy', text: 'The way the grain wraps continuously around the drawer is what gets me every time.', timestamp: 1718028000000 },
    ],
    image: '/woodwork/log.webp',
    lat: 0.75, lon: 1.5,
  },
  {
    id: 'w6', planetId: 'woodworking', title: 'Hand-Cut Dovetails', makerName: 'PlaneMaker', makerId: 'u19',
    description: 'Six practice joints in scrap pine before this cherry box. The seventh one fit together with no gaps.',
    likes: 612,
    comments: [
      { id: 'c7f', authorName: 'GrainChaser', text: 'Hand-cut dovetails are the benchmark of fine joinery. This is stunning.', timestamp: 1718029500000 },
      { id: 'c7g', authorName: 'WhittleGuy', text: 'Six practice joints is exactly the right amount of humility. Paid off beautifully.', timestamp: 1718031000000 },
    ],
    image: '/woodwork/joints.webp',
    lat: -0.25, lon: 2.9,
  },
  {
    id: 'w7', planetId: 'woodworking', title: 'Mallet From Scrap Oak', makerName: 'WhittleGuy', makerId: 'u7',
    description: 'Handle turned on the lathe, head glued from offcuts. Zero materials wasted from the shop floor.',
    likes: 149,
    comments: [
      { id: 'c7h', authorName: 'PlaneMaker', text: 'Using it to cut dovetails with your mallet would complete the circle!', timestamp: 1718032500000 },
    ],
    image: '/woodwork/hammer.webp',
    lat: -0.85, lon: -2.2,
  },

  // Baking — tiered cakes, silky custards and caramel-edged delights (warm golden amber aesthetic)
  {
    id: 'bk1', planetId: 'baking', title: 'Chocolate Layer Cake', makerName: 'CrustQueen', makerId: 'u20',
    description: 'Fourteen-layer devil\'s food with dark chocolate ganache between every tier. Getting the layers level took a cardboard comb and a lot of deep breaths.',
    likes: 534,
    comments: [
      { id: 'c8', authorName: 'FlourPower', text: 'Fourteen layers! How long did this take to assemble?', timestamp: 1718025200000 },
      { id: 'c8b', authorName: 'BakeLab', text: 'That ganache drip is perfectly controlled — mine always runs too fast.', timestamp: 1718026800000 },
    ],
    image: '/baking/chocolate.jpg',
    lat: 0.4, lon: 0.3,
  },
  {
    id: 'bk2', planetId: 'baking', title: 'French Macarons', makerName: 'FlourPower', makerId: 'u21',
    description: 'Forty-two failed batches before getting the perfect foot and chewy interior. Rose and lychee filling — every obsessive measurement was worth it.',
    likes: 712,
    comments: [
      { id: 'c8c', authorName: 'CrustQueen', text: 'The feet are so even! Mine always crack on top. What humidity were you baking in?', timestamp: 1718028000000 },
    ],
    image: '/baking/macaroons.jpg',
    lat: -0.5, lon: 1.6,
  },
  {
    id: 'bk3', planetId: 'baking', title: 'Earl Grey Chiffon Cake', makerName: 'BakeLab', makerId: 'u22',
    description: 'Steeped loose-leaf bergamot in the milk overnight and folded in lavender-infused buttercream between layers.',
    likes: 289,
    comments: [
      { id: 'c8d', authorName: 'FlourPower', text: 'The flavour combination is so refined. Bergamot and lavender were made for each other.', timestamp: 1718029300000 },
    ],
    image: '/baking/chiffon.jpg',
    lat: 0.7, lon: -1.4,
  },
  {
    id: 'bk4', planetId: 'baking', title: 'Cinnamon Roll Buns', makerName: 'CrustQueen', makerId: 'u20',
    description: 'Tangzhong method for the dough — that cooked starch gives the most pillowy pull-apart texture imaginable.',
    likes: 463,
    comments: [],
    image: '/baking/cinamon.jpg',
    lat: -0.3, lon: -2.0,
  },
  {
    id: 'bk5', planetId: 'baking', title: 'Tarte Tatin', makerName: 'FlourPower', makerId: 'u21',
    description: 'Caramelised the apples for an extra thirty minutes before adding the pastry. Amber-dark and no regrets.',
    likes: 198,
    comments: [
      { id: 'c8e', authorName: 'BakeLab', text: 'Thirty minutes of caramel? That is deep amber bravery. Respect.', timestamp: 1718031000000 },
    ],
    image: '/baking/tatin.jpg',
    lat: 0.1, lon: 2.7,
  },
  {
    id: 'bk6', planetId: 'baking', title: 'Crème Brûlée', makerName: 'BakeLab', makerId: 'u22',
    description: 'Six ramekins, one blowtorch, and the most satisfying crack you will ever hear. Steeped the cream overnight with two whole vanilla beans.',
    likes: 321,
    comments: [
      { id: 'c8f', authorName: 'CrustQueen', text: 'That caramel layer is perfectly even — do you torch in circles or sweeping strokes?', timestamp: 1718032500000 },
    ],
    image: '/baking/brulee.jpg',
    lat: -0.8, lon: 0.9,
  },

  // Painting — pigment seas and brushstroke mountain ranges (indigo/violet/blue aesthetic)
  {
    id: 'pt1', planetId: 'painting', title: 'Misty Forest in Oils', makerName: 'BrushStroke', makerId: 'u23',
    description: 'Wet-on-wet blending straight from the tube — no medium. The atmospheric haze came from glazing over dry layers.',
    likes: 418,
    comments: [
      { id: 'c9', authorName: 'PigmentPete', text: 'The depth in those trees is unreal — how many layers?', timestamp: 1718028800000 },
      { id: 'c9b', authorName: 'CanvasChaos', text: 'That foreground-to-background value shift is textbook-perfect.', timestamp: 1718030200000 },
    ],
    image: '/painting/forest.png',
    lat: 0.5, lon: -0.7,
  },
  {
    id: 'pt2', planetId: 'painting', title: 'Loose Watercolour Botanicals', makerName: 'PigmentPete', makerId: 'u24',
    description: 'Dropped salt into wet washes for the texture. Resisted the urge to add detail and let happy accidents lead.',
    likes: 552,
    comments: [
      { id: 'c9c', authorName: 'BrushStroke', text: 'Resisting the urge to overwork a watercolour is the hardest skill to learn!', timestamp: 1718031500000 },
    ],
    image: '/painting/watercolor.jpg',
    lat: -0.4, lon: 1.3,
  },
  {
    id: 'pt3', planetId: 'painting', title: 'Abstract Acrylic Pour', makerName: 'CanvasChaos', makerId: 'u25',
    description: 'Silicone oil cells in a Dutch pour over a deep navy background. Every pour is a collaboration with gravity.',
    likes: 629,
    comments: [
      { id: 'c9d', authorName: 'PigmentPete', text: 'The cell formations in the gold section are jaw-dropping. What ratio of silicone did you use?', timestamp: 1718033000000 },
    ],
    image: '/painting/abstract.png',
    lat: 0.75, lon: 2.2,
  },
  {
    id: 'pt4', planetId: 'painting', title: 'Gouache City Skyline', makerName: 'BrushStroke', makerId: 'u23',
    description: 'Flat graphic colour blocks, no blending. Restricted myself to five colours — constraints breed creativity.',
    likes: 244,
    comments: [
      { id: 'c9e', authorName: 'CanvasChaos', text: 'Five-colour limitation and it feels like a complete world. Impressive restraint!', timestamp: 1718034500000 },
    ],
    image: '/painting/city.jpg',
    lat: -0.6, lon: -1.8,
  },
  {
    id: 'pt5', planetId: 'painting', title: 'Impasto Portrait', makerName: 'PigmentPete', makerId: 'u24',
    description: 'Palette knife only, zero brushes. The texture reads from across the room — that is the whole point.',
    likes: 377,
    comments: [],
    image: '/painting/portrait.jpg',
    lat: 0.2, lon: -2.6,
  },
  {
    id: 'pt6', planetId: 'painting', title: 'En Plein Air Coastal Study', makerName: 'CanvasChaos', makerId: 'u25',
    description: 'One hour, afternoon light, wind knocking the easel. The waves refused to cooperate. I painted them anyway.',
    likes: 491,
    comments: [
      { id: 'c9f', authorName: 'BrushStroke', text: 'Plein air with wind is basically extreme sports. The energy in those waves shows it!', timestamp: 1718036000000 },
    ],
    image: '/painting/costal.jpg',
    lat: -0.15, lon: 0.6,
  },
];
