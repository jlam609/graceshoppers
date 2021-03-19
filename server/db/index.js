const bcrypt = require("bcrypt");
const {db, models} = require("./models");

const {Cart, Category, Order, Product, Session, User, Rating} = models;

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
      description: "Spear of Odin: God of Death",
      image:
        "https://blog.vkngjewelry.com/wp-content/uploads/2019/10/Gungnir_-The-Spear-of-Odin.png",
      categoryId: 1,
      price: 1000,
      quantity: 10,
    },
    {
      name: "Diamond Sword",
      description: "I can swing my sword, sword; diamond, diamond, sword, sword...",
      image:
        "https://vignette.wikia.nocookie.net/minecraft-earth/images/f/f0/Diamond_sword.png/revision/latest?cb=20200519192804",
      categoryId: 1,
      price: 1000,
      quantity: 15,
    },
    {
      name: "Frostmourne",
      description: "The vile, cursed blade wielded by the dread Lich King.",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51siPIjruPL._AC_SL1253_.jpg",
      categoryId: 1,
      price: 10000,
      quantity: 5,
    },
    {
      name: "Slingshot",
      description: "Don't underestimate the power of the slingshot in the right hands...",
      image:
        "https://vignette.wikia.nocookie.net/animalcrossing/images/2/23/NH-Golden_slingshot.png/revision/latest/scale-to-width-down/340?cb=20200326052101",
      categoryId: 1,
      price: 100,
      quantity: 500,
    },
    {
      name: "Blade of the Ruined King",
      description: "Named after Kalista's uncle, king of an unnamed realm.",
      image:
        "https://info465.us/2017Winter/GetThumbnail.php?TableName=Items&RecordId=10681&ImageSize=300",
      categoryId: 1,
      price: 3000,
      quantity: 20,
    },
    {
      name: "Doombringer",
      description: "Legendary sword that can be found in Diablo 3 and Reaper of Souls",
      image: "https://www.diablowiki.net/images/8/8a/Doombringer-icon.JPG",
      categoryId: 1,
      price: 2000,
      quantity: 30,
    },
    {
      name: "Thunderfury, Blessed Blade of the Windseeker",
      description: "Lendendary sword once wielded by Thunderaan, Prince of Air",
      image:
        "https://external-preview.redd.it/bM1sFPt5JNnAWkd-TztPCnD5GT5dRCM8i0jsA1_wNIE.jpg?auto=webp&s=256e456905bae31bd13dddec0f6cc9b91a816e5e",
      categoryId: 1,
      price: 5000,
      quantity: 14,
    },
    {
      name: "Black Cleaver",
      description:
        "Once upon a time, the Black Cleaver was so feared and powerful that it changed League of Legends.",
      image:
        "https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/5b0618373467acc8cb000010.jpeg",
      categoryId: 1,
      price: 1500,
      quantity: 99,
    },
    {
      name: "Aloy's Bow",
      description: "The bow is Aloy's primary choice of weapon in Horizon Zero Dawn",
      image: "https://pbs.twimg.com/media/DDPn_3YXgAIPwic.jpg",
      categoryId: 1,
      price: 500,
      quantity: 24,
    },
    {
      name: "Ashbringer",
      description: "The Ultimate paladin weapon. Bringer of light and ash.",
      image: "https://gamepedia.cursecdn.com/wowpedia/a/a6/Ashbringer_TCG.jpg",
      categoryId: 1,
      price: 1000,
      quantity: 100,
    },
    {
      name: "Atiesh, Greatstaff of the Guardian",
      description: "Wielded originally by Medihv, grants its user 'power unending'.",
      image:
        "https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/0/02/Atiesh_full.jpg/400px-Atiesh_full.jpg?version=0138d5ad9f33b3bcfeb6563374ad830a",
      categoryId: 1,
      price: 10000,
      quantity: 15,
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
      description: "Get rich and it will make you a juicy target",
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
    {
      name: "Pyroblast",
      description: "Hurl a pyroclastic ball of flame energy at your target.",
      image: "https://i.pinimg.com/474x/7d/59/01/7d59015450fb75b5674781e3de343638.jpg",
      price: 50,
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Frostbolt",
      description: "Conjure a shard of ice energy and shoot it.",
      image:
        "https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/8/8e/Frostbolt_%28art%29.jpg/400px-Frostbolt_%28art%29.jpg?version=ece099e314e0c967d3f55134affb3649",
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Arcane Missiles",
      description: "Fires three volleys of arcane missiles at the opponent.",
      image:
        "https://i.pinimg.com/originals/b7/35/b6/b735b67107d1b06804f6bf2693c5b80c.jpg",
      categoryId: 3,
      quantity: 100,
    },
    {
      name: "Shapeshift",
      description: "Change your form to that of an animal of your choosing.",
      image:
        "https://gamepedia.cursecdn.com/wowpedia/thumb/b/ba/Givon_TCG.jpg/300px-Givon_TCG.jpg?version=f3004078f3cc2d7d74bb0339d05835f4",
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
      description: "Basic Ball. Gotta catch em all!",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/020/068/395/large/finn-isengardt-pokeball-composition.jpg?1566236853",
      price: 5,
      categoryId: 4,
      quantity: 100,
    },
    {
      name: "GreatBall",
      description: "Better Ball. Gotta catch em all!",
      image:
        "https://d1lss44hh2trtw.cloudfront.net/assets/article/2016/07/11/great_ball_by_baconb0y-d5uf49k_feature.jpg",
      price: 50,
      categoryId: 4,
      quantity: 300,
    },
    {
      name: "UltraBall",
      description: "Much Better Ball. Gotta catch em all!",
      image:
        "https://images3.sw-cdn.net/product/picture/625x465_654579_657444_1452804948.jpg",
      price: 500,
      categoryId: 4,
      quantity: 500,
    },
    {
      name: "MasterBall",
      description: "Catches anything. Gotta catch em all!",
      image:
        "https://www.pngkit.com/png/detail/156-1564777_master-ball-the-best-poke-ball-transparent-background.png",
      price: 5000,
      categoryId: 4,
      quantity: 2000,
    },
    {
      name: "Fishing Pole",
      description: "Good luck catching anything without it!",
      image:
        "https://vignette.wikia.nocookie.net/animalcrossing/images/3/33/NH-Golden_rod.png/revision/latest/scale-to-width-down/340?cb=20200326052051",
      price: 15,
      categoryId: 4,
      quantity: 3000,
    },
    {
      name: "Immovable Rod",
      description:
        "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place.",
      image:
        "https://media-waterdeep.cursecdn.com/avatars/thumbnails/7/261/1000/1000/636284741670235041.jpeg",
      price: 500,
      categoryId: 4,
      quantity: 30,
    },
    {
      name: "Carrot on a Stick",
      description: "While equipped, this trinket increases mount speed by 3%.",
      image: "https://miro.medium.com/max/2488/1*oK-taHKmJ3dcLXYxIryIDw.png",
      price: 10,
      categoryId: 4,
      quantity: 100,
    },
    {
      name: "Bag of Holding",
      description:
        "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet.",
      image:
        "https://media-waterdeep.cursecdn.com/avatars/thumbnails/7/120/1000/1000/636284708068284913.jpeg",
      price: 1000,
      categoryId: 4,
      quantity: 25,
    },
    {
      name: "Gnomish Mind Control Helmet",
      description:
        "Engage in mental combat with a humanoid target to try and control their mind",
      image:
        "https://wow.zamimg.com/uploads/screenshots/normal/81892-gnomish-mind-control-cap-blizzard-employee-hortus-on-the-2-4-arena-tournament-te.jpg",
      price: 1500,
      categoryId: 4,
      quantity: 30,
    },
    {
      name: "Locket of the Iron Solari",
      description:
        "Locket of the Iron Solari lets tanks give a burst of tankiness to their team",
      image: "https://i.imgur.com/b1Um2.jpg",
      price: 1000,
      categoryId: 4,
      quantity: 20,
    },
  ];
  await categoryList.map((category) => Category.create(category));
  await weaponList.map((weapon) => Product.create(weapon));
  await armorList.map((armor) => Product.create(armor));
  await spellList.map((spell) => Product.create(spell));
  await itemList.map((item) => Product.create(item));
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("password", salt);
  const user = await User.create({
    username: "admin@fullstack.com",
    password: hash,
    salt,
    firstName: "Default",
    lastName: "Admin",
    image:
      "https://thumbs.dreamstime.com/b/red-admin-sign-pc-laptop-vector-illustration-administrator-icon-screen-controller-man-system-box-88756468.jpg",
    clearance: 5,
  });
  await Order.create({
    userId: user.id,
    status: "active",
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
    Rating,
  },
};
