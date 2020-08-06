const bcrypt = require("bcrypt");
const {db, models} = require("./models");

const {Cart, Category, Order, Product, Session, User} = models;

const sync = async () => {
  const categoryList = [
    {
      name: "weapons",
    },
    {
      name: "armors",
    },
    {
      name: "magic",
    },
    {
      name: "items",
    },
  ];
  const weaponList = [
    {
      name: "Master Sword",
      description:
        "Legend of Zelda series. Used by Link after being drawn from a stone altar. Said to be untouchable by evil.",
      image:
        "https://cdn.vox-cdn.com/thumbor/Mc1qCq9ZPKGoxSx0CW3Jzr8sqb8=/0x0:1280x720/1400x1050/filters:focal(543x293:747x497):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53716843/2017030723220300_F1C11A22FAEE3B82F21B330E1B786A39.0.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Excalibur",
      description:
        "King Arthur's sword, courtesy of some moistened bint with a scimitar.",
      image:
        "https://cdna.artstation.com/p/assets/images/images/006/541/116/large/angelo-gongora-excaliburwireframe.jpg?1499370386",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Caladbolg",
      description:
        "All who have brought the sun to this weapon have likely seen their fill of gulls \n -Final Fantasy All the Bravest description",
      image:
        "https://templeofravens.files.wordpress.com/2016/10/ffx_weapon_-_caladbolg.png?w=605",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Buster Sword",
      description:
        "This sword is a symbol of my dreams... and my honor. No... it's more than that... \n Zack Fair",
      image:
        "https://img1.cgtrader.com/items/881577/913f9ae6f9/buster-sword-final-fantasy-3d-model-obj-mtl-fbx-c4d-ma-mb-stl.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Blackfyre",
      description:
        "The Valyrian steel sword of Aegon I Targaryen. Carried by all Targaryen kings till Aegon IV who gave it to his bastard Daemon Blackfyre. \n Its whereabouts are currently unknown",
      image:
        "https://vignette.wikia.nocookie.net/iron-throne-role-play/images/3/3b/Blackfyre.jpg/revision/latest?cb=20161113114804",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Masamune",
      description:
        "Sephiroth's Sword is the most incredible, magnificent and most potent swords from the final fantasy series.",
      image:
        "https://swordskingdom.com/media/catalog/product/m/a/masamune-sephiroth-sword-from-final-fantasy.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Apollo's Golden Bow",
      description:
        "The bow can cause health or famine, although its main function is that of a regular bow, but with much greater power",
      image:
        "https://vignette.wikia.nocookie.net/cookie-pantheon/images/8/8c/2235023_l.jpg/revision/latest/top-crop/width/720/height/900?cb=20190521203140",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Kingdom Key",
      description: "Default Keyblade. Not very powerful, but reliable and easy to handle",
      image:
        "https://i.etsystatic.com/15773976/r/il/3b74b6/1804379035/il_570xN.1804379035_6x95.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Gravity Gun",
      description: "Iconic weapon in half life",
      image: "https://screenshots.gamebanana.com/img/ss/srends/5e51329c34029.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Shotgun",
      description: "Sprays bullets",
      image: "https://assets.dmagstatic.com/wp-content/uploads/2020/06/Shotgun.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Bazooka",
      description: "Fires a big missile",
      image: "https://i.ytimg.com/vi/b8C3zhGxxgk/maxresdefault.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Kitchen Knight",
      description: "A knife from dead by daylight",
      image: "https://i.ytimg.com/vi/UJnRHpMr4ko/hqdefault.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Twin Daggers",
      description: "Why have one when you can have 2",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/018/492/589/4k/ciara-redding-print-2.jpg?1559592215",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Gungnir",
      description: "Spear of Odin God of Death",
      image:
        "https://blog.vkngjewelry.com/wp-content/uploads/2019/10/Gungnir_-The-Spear-of-Odin.png",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
  ];
  const armorList = [
    {
      name: "Armour of Achilles",
      description: "created by Hephaestus and said to be impenetrable",
      image:
        "https://i.pinimg.com/originals/f8/64/16/f86416f45bd423e5c60a7d03d13c2c46.jpg",
      categoryId: 2,
      price: 2000,
      quantity: 100,
    },
    {
      name: "Mythril Armor",
      description:
        "Made from mythril. It is described as resembling silver but being stronger and lighter than steel.",
      image:
        "https://steamuserimages-a.akamaihd.net/ugc/576699532596996967/D91AECEAAD15C899B0AA5A0DE9CFF31F480CA008/",
      categoryId: 2,
      price: 2000,
      quantity: 100,
    },
    {
      name: "Adamantine Armor",
      description: "Made from adamantine. The hardest metal in the world",
      image:
        "https://img2.finalfantasyxiv.com/accimg2/a8/71/a87185e92f648768a0196e0edfb92009b1cbab2d.jpg",
      categoryId: 2,
      price: 2000,
      quantity: 100,
    },
    {
      name: "Garbage Bag",
      description: "Nothing can penetrate almighty garbage",
      image:
        "https://i.chzbgr.com/full/6210288128/hA81ADDCF/none-can-penetrate-my-bag-armor",
      categoryId: 2,
      price: 5,
      quantity: 10,
    },
    {
      name: "N7 Armor",
      description: "Iconic armor of Commander Shepard of the Normandy",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/011/382/517/large/maria-kondratieva-n7-views.jpg?1529322965",
      categoryId: 2,
      price: 1000,
      quantity: 20,
    },
    {
      name: "Tin Armor",
      description: "Decent armour with some protection",
      image:
        "https://cdn.shopify.com/s/files/1/0953/9550/products/MMK0704_F_650SQ_large.jpg?v=1482215275",
      categoryId: 2,
      price: 1000,
      quantity: 20,
    },
    {
      name: "Silver Armor",
      description: "Shiny armour",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51BxbbaqwGL._AC_UY445_.jpg",
      categoryId: 2,
      price: 1000,
      quantity: 20,
    },
    {
      name: "Basic Cloak",
      description: "Starting armour for mages, light and quick",
      image:
        "https://cdn.shopify.com/s/files/1/1625/4911/products/WizardCloak_Brown1_new_2048x.jpg?v=1545147974",
      categoryId: 2,
      price: 1000,
      quantity: 20,
    },
    {
      name: "Ancient Robe",
      description: "It's Ancient",
      image:
        "https://ae01.alicdn.com/kf/HTB1NvFbcQxz61VjSZFrq6xeLFXa3/Male-Chinese-Traditional-Costume-Ancient-Robe-Clothing-Traditional-National-Tang-Suit-Hanfu-Clothing-Men-s-Cosplay.jpg_640x640.jpg",
      categoryId: 2,
      price: 1000,
      quantity: 20,
    },
    {
      name: "Diamond Armour",
      description: "Rich and will make you a juicy target",
      image: "https://i.redd.it/x3lgm8uhask41.png",
      categoryId: 2,
      price: 1000,
      quantity: 20,
    },
  ];
  const spellList = [
    {
      name: "Dark Magic",
      description: "Self-serving, stat-manipulating, leeching spells.",
      image:
        "https://gamepedia.cursecdn.com/exvius_gamepedia_en/2/2f/Esper-Diabolos-3.png?version=ec615dc151ecceaa9316b146b3cef16d",
      price: 100,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "White Magic",
      description: "Curative spells that mend wounds.",
      image:
        "https://i.pinimg.com/originals/89/1a/0c/891a0cc339757782e3bc6bfd953b69e6.jpg",
      price: 200,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Enhancing Magic",
      description: "Beneficially affect allies with stat buffs.",
      image:
        "https://img2.finalfantasyxiv.com/accimg/7a/65/7a658e53515157e2217daa61aa220f15a9b79d7e.jpg",
      price: 200,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Elemental Magic",
      description: "Generic offensive damage-dealing spells using fire, ice, and air.",
      image:
        "https://vignette.wikia.nocookie.net/finalfantasy/images/8/88/Prime_Elements_Chart_FFXI_Art.png/revision/latest?cb=20120903224809",
      price: 100,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Summoning Magic",
      description: "Elemental beasts evoked to aid combatants.",
      image: "https://i.ytimg.com/vi/WS_xLSYNMHM/maxresdefault.jpg",
      price: 500,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Holy Smite",
      description: "Strongest White Magic spell, can cleanse the Planet of all threats",
      image:
        "https://vignette.wikia.nocookie.net/finalfantasy/images/c/cd/Aerith_Holy.jpeg/revision/latest/scale-to-width-down/340?cb=20110327055555",
      price: 10000,
      categoryId: 3,
      quantity: 1,
    },
    {
      name: "Meteor",
      description:
        "Powerful Black Magic spell, can summon a celestial body to harm the Planet ",
      image:
        "https://vignette.wikia.nocookie.net/finalfantasy/images/6/6c/Meteor_FFVII.jpg/revision/latest/scale-to-width-down/340?cb=20190616214521",
      price: 1000,
      categoryId: 3,
      quantity: 10,
    },
    {
      name: "Crucio",
      description: "A mid-level curse that incapacitates your foe.",
      image: "https://i.redd.it/o8z5wbqhj87z.jpg",
      price: 30,
      categoryId: 3,
      quantity: 70,
    },
    {
      name: "Life",
      description: "Restores life to a target",
      image:
        "https://www.spaciousbreath.com/wp-content/uploads/2018/03/Giving-birth-to-Life-1080x608.jpg",
      price: 100,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Death",
      description: "Chance to instantly kill a target",
      image:
        "https://i2-prod.mirror.co.uk/incoming/article9536038.ece/ALTERNATES/s615/1_Grim-Reaper.jpg",
      price: 100,
      categoryId: 3,
      quantity: 100,
    },
  ];
  const itemList = [
    {
      name: "Potion",
      description: "Restores a small amount of lost health",
      image: "https://sayonaraai.files.wordpress.com/2007/11/ffsp.jpg",
      price: 5,
      categoryId: 4,
      quantity: 100,
    },
    {
      name: "Elixir",
      description: "Completely restore health and mana",
      image:
        "https://vignette.wikia.nocookie.net/finalfantasy/images/5/5c/Megalixir_FF7.png/revision/latest?cb=20100602160250",
      price: 20,
      categoryId: 4,
      quantity: 100,
    },
    {
      name: "1UP",
      description: "Extra Life!",
      image:
        "https://www.kindpng.com/picc/m/600-6000351_transparent-mario-mushroom-png-super-mario-1up-mushroom.png",
      price: 100,
      categoryId: 4,
      quantity: 5,
    },
    {
      name: "Antidote",
      description:
        "A tonic that works through the skin, drawing out and neutralizing toxins within the body.",
      image: "https://www.antidote.info/accueil/_hero/fiole.png",
      price: 10,
      categoryId: 4,
      quantity: 100,
    },
    {
      name: "Phoenix Down",
      description:
        "Tufts of phoenix feather that can (sometimes) bring the dead back to life",
      image: "https://i1.sndcdn.com/artworks-000476941884-6ee3l2-t500x500.jpg",
      price: 100,
      categoryId: 4,
      quantity: 2,
    },
    {
      name: "New Leaf",
      description:
        "Every villager receives one upon paying off his first full Nook loan!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/58/Animal_Crossing_Leaf.png",
      price: 100000,
      categoryId: 4,
      quantity: 10,
    },
    {
      name: "Hi-Potion",
      description: "Restores a medium amount of lost health",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/012/583/941/large/alexander-coudriet-hi-potion1.jpg?1535509351",
      price: 5,
      categoryId: 4,
      quantity: 300,
    },
    {
      name: "Hyper-Potion",
      description: "Restores a large amount of lost health",
      image:
        "https://cdn.bulbagarden.net/upload/thumb/3/3f/GO_Hyper_Potion.png/200px-GO_Hyper_Potion.png",
      price: 5,
      categoryId: 4,
      quantity: 500,
    },
    {
      name: "Bomb",
      description: "Deals some damage with a blast",
      image: "https://images-na.ssl-images-amazon.com/images/I/61UZ1SeWj6L.jpg",
      price: 5,
      categoryId: 4,
      quantity: 300,
    },
    {
      name: "Pokeball",
      description: "Basic Ball. Gotta catch them all!",
      image:
        "https://lh3.googleusercontent.com/proxy/wOxJgXI2FuD9Pwmf3VAi-_bjnGwNrGVuyXAPzmOjop1bCBYIoWttrgpszxj-yComYrKb2fRvvGN-8FKY9ELhklyOUsEjNEwxDmNlujUp15KDBB1vY8Vo",
      price: 5,
      categoryId: 4,
      quantity: 100,
    },
    {
      name: "GreatBall",
      description: "Better Ball. Gotta catch them all!",
      image:
        "https://d1lss44hh2trtw.cloudfront.net/assets/article/2016/07/11/great_ball_by_baconb0y-d5uf49k_feature.jpg",
      price: 5,
      categoryId: 4,
      quantity: 300,
    },
    {
      name: "UltraBall",
      description: "Much Better Ball. Gotta catch them all !",
      image:
        "https://images3.sw-cdn.net/product/picture/625x465_654579_657444_1452804948.jpg",
      price: 5,
      categoryId: 4,
      quantity: 500,
    },
    {
      name: "MasterBall",
      description: "Catch anything. Gotta catch them all !",
      image:
        "https://www.pngkit.com/png/detail/156-1564777_master-ball-the-best-poke-ball-transparent-background.png",
      price: 5,
      categoryId: 4,
      quantity: 2000,
    },
  ];
  await categoryList.map((category) => Category.create(category));
  await weaponList.map((weapon) => Product.create(weapon));
  await armorList.map((armor) => Product.create(armor));
  await spellList.map((spell) => Product.create(spell));
  await itemList.map((item) => Product.create(item));
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("password", salt);
  await User.create({
    username: "admin@fullstack.com",
    password: hash,
    salt,
    clearance: 5,
  });
};

const seed = async (force = true) => {
  try {
    await db.sync({force});
    if (force) {
      await sync();
    }
    console.log("seed was successful");
  } catch (e) {
    throw new Error("seed unsuccessful", e);
  }
};

module.exports = {
  db,
  seed,
  models: {
    Cart,
    Category,
    Order,
    Product,
    Session,
    User,
  },
};
