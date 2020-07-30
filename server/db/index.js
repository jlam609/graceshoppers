const { db, models } = require("./models");
const { Cart, Category, Order, Product, Session, User } = models;

const sync = async() => {
    const categoryList = [
        {
            name:'weapons',
        }, 
        {
           name: 'armors'
        }, 
        {
            name:'magic'
        }, 
        {
            name:'items'
        }
    ]
    const weaponList = [
        {
            name:'Master Sword',
            description: 'Legend of Zelda series. Used by Link after being drawn from a stone altar. Said to be untouchable by evil.',
            image:'https://cdn.vox-cdn.com/thumbor/Mc1qCq9ZPKGoxSx0CW3Jzr8sqb8=/0x0:1280x720/1400x1050/filters:focal(543x293:747x497):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53716843/2017030723220300_F1C11A22FAEE3B82F21B330E1B786A39.0.jpg',
            categoryId:1,
            price: 1000,
            quantity: 100
        },
        {
            name:'Excalibur', 
            description:'King Arthur\'s sword, courtesy of some moistened bint with a scimitar.',
            image:'https://cdna.artstation.com/p/assets/images/images/006/541/116/large/angelo-gongora-excaliburwireframe.jpg?1499370386',
            categoryId:1,
            price: 1000,
            quantity: 100
        },
        {
            name:'Caladbolg',
            description:'All who have brought the sun to this weapon have likely seen their fill of gulls \n -Final Fantasy All the Bravest description',
            image:'https://templeofravens.files.wordpress.com/2016/10/ffx_weapon_-_caladbolg.png?w=605',
            categoryId:1,
            price: 1000,
            quantity: 100
        },
        {
            name:'Buster Sword',
            description:'This sword is a symbol of my dreams... and my honor. No... it\'s more than that... \n Zack Fair',
            image:'https://img1.cgtrader.com/items/881577/913f9ae6f9/buster-sword-final-fantasy-3d-model-obj-mtl-fbx-c4d-ma-mb-stl.jpg',
            categoryId:1,
            price:1000,
            quantity: 100
        },
        {
            name:'Blackfyre',
            description: 'The Valyrian steel sword of Aegon I Targaryen. Carried by all Targaryen kings till Aegon IV who gave it to his bastard Daemon Blackfyre. \n Its whereabouts are currently unknown',
            image:'https://vignette.wikia.nocookie.net/iron-throne-role-play/images/3/3b/Blackfyre.jpg/revision/latest?cb=20161113114804',
            categoryId:1,
            price:1000,
            quantity: 100
        },
        {
            name:'Masamune',
            description: 'Sephiroth\'s Sword is the most incredible, magnificent and most potent swords from the final fantasy series.',
            image:'https://swordskingdom.com/media/catalog/product/m/a/masamune-sephiroth-sword-from-final-fantasy.jpg',
            categoryId:1,
            price:1000,
            quantity:100
        },
        {
            name:'Apollo\'s Golden Bow',
            description:'The bow can cause health or famine, although its main function is that of a regular bow, but with much greater power',
            image:'https://vignette.wikia.nocookie.net/cookie-pantheon/images/8/8c/2235023_l.jpg/revision/latest/top-crop/width/720/height/900?cb=20190521203140',
            categoryId:1,
            price:1000,
            quantity:100
        }, 
        {
            name: 'Kingdom Key',
            description: 'Default Keyblade. Not very powerful, but reliable and easy to handle',
            image: 'https://i.etsystatic.com/15773976/r/il/3b74b6/1804379035/il_570xN.1804379035_6x95.jpg',
            categoryId: 1,
            price: 1000,
            quantity:10
        }
    ]
    const armorList = [
        {
            name:'Armour of Achilles',
            description: 'created by Hephaestus and said to be impenetrable',
            image:'https://i.pinimg.com/originals/f8/64/16/f86416f45bd423e5c60a7d03d13c2c46.jpg',
            categoryId:2,
            price:2000,
            quantity:100
        },
        {
            name:'Mythril Armor',
            description:'Made from mythril. It is described as resembling silver but being stronger and lighter than steel.',
            image:'https://steamuserimages-a.akamaihd.net/ugc/576699532596996967/D91AECEAAD15C899B0AA5A0DE9CFF31F480CA008/',
            categoryId:2,
            price:2000,
            quantity:100
        },
        {
            name:'Adamantine Armor',
            description:'Made from adamantine. The hardest metal in the world',
            image:'https://img2.finalfantasyxiv.com/accimg2/a8/71/a87185e92f648768a0196e0edfb92009b1cbab2d.jpg',
            categoryId:2,
            price:2000,
            quantity:100
        },
        {
            name:'Garbage Bag',
            description:'Nothing can penetrate almighty garbage',
            image:'https://i.chzbgr.com/full/6210288128/hA81ADDCF/none-can-penetrate-my-bag-armor',
            categoryId:2,
            price: 5,
            quantity:10
        },
        {
            name: 'N7 Armor',
            description: 'Iconic armor of Commander Shepard of the Normandy',
            image: 'https://cdnb.artstation.com/p/assets/images/images/011/382/517/large/maria-kondratieva-n7-views.jpg?1529322965',
            categoryId: 2,
            price: 1000,
            quantity:20
        }
    ]
    const spellList = [
        {
            name:'Dark Magic',
            description:'Self-serving, stat-manipulating, leeching spells.',
            image:'https://gamepedia.cursecdn.com/exvius_gamepedia_en/2/2f/Esper-Diabolos-3.png?version=ec615dc151ecceaa9316b146b3cef16d',
            price:100,
            categoryId:3,
            quantity:100
        },
        {
            name:'White Magic',
            description:'Curative spells that mend wounds.',
            image:'https://i.pinimg.com/originals/89/1a/0c/891a0cc339757782e3bc6bfd953b69e6.jpg',
            price:200,
            categoryId:3,
            quantity:100
        },
        {
            name:'Enhancing Magic',
            description:'Beneficially affect allies with stat buffs.',
            image:'https://img2.finalfantasyxiv.com/accimg/7a/65/7a658e53515157e2217daa61aa220f15a9b79d7e.jpg',
            price:200,
            categoryId:3,
            quantity:100
        },
        {
            name:'Elemental Magic',
            description:'Generic offensive damage-dealing spells.',
            image:'https://vignette.wikia.nocookie.net/finalfantasy/images/8/88/Prime_Elements_Chart_FFXI_Art.png/revision/latest?cb=20120903224809',
            price:100,
            categoryId:3,
            quantity:100
        },
        {
            name:'Summoning Magic',
            description:'Elemental beasts evoked to aid combatants.',
            image:'https://i.ytimg.com/vi/WS_xLSYNMHM/maxresdefault.jpg',
            price:500,
            categoryId:3,
            quantity:100
        },
        {
            name: 'Holy',
            description: 'Strongest White Magic spell, can cleanse the Planet of all threats',
            image: 'https://vignette.wikia.nocookie.net/finalfantasy/images/c/cd/Aerith_Holy.jpeg/revision/latest/scale-to-width-down/340?cb=20110327055555',
            price: 1000,
            categoryId:3,
            quantity:100
        },
        {
            name: 'Meteor',
            description: 'Powerful Black Magic spell, can summon a celestial body to harm the Planet ',
            image: 'https://vignette.wikia.nocookie.net/finalfantasy/images/6/6c/Meteor_FFVII.jpg/revision/latest/scale-to-width-down/340?cb=20190616214521',
            price: 1000,
            categoryId:3,
            quantity:10
        }
    ]
    const itemList = [
        {
            name:'Potion',
            description:'Restores some lost health',
            image:'https://sayonaraai.files.wordpress.com/2007/11/ffsp.jpg',
            price:5,
            categoryId:4,
            quantity:100
        },
        {
            name:'Elixir',
            description:'Completely restore health and mana',
            image:'https://vignette.wikia.nocookie.net/finalfantasy/images/5/5c/Megalixir_FF7.png/revision/latest?cb=20100602160250',
            price:20,
            categoryId:4,
            quantity:100
        },
        {
            name:'1UP',
            description: 'Extra Life!',
            image: 'https://www.kindpng.com/picc/m/600-6000351_transparent-mario-mushroom-png-super-mario-1up-mushroom.png',
            price:100,
            categoryId:4,
            quantity:100
        },
        {
            name:'Antidote',
            description:'A tonic that works through the skin, drawing out and neutralizing toxins within the body.',
            image: 'https://www.antidote.info/accueil/_hero/fiole.png',
            price:10,
            categoryId:4,
            quantity:100
        },
        {
            name: 'Phoenix Down',
            description: 'Tufts of phoenix feather that can (sometimes) bring the dead back to life',
            image: 'https://i1.sndcdn.com/artworks-000476941884-6ee3l2-t500x500.jpg',
            price: 100,
            categoryId: 4,
            quantity:100
        }
    ]
    await categoryList.map(category => Category.create(category))
    await weaponList.map(weapon => Product.create(weapon))
    await armorList.map(armor => Product.create(armor))
    await spellList.map(spell => Product.create(spell))
    await itemList.map(item => Product.create(item))
    await User.create({
        username:'admin@fullstack.com',
        password:'password',
        salt:'salt',
        clearance:5
    })
}

const seed = async (force = true) => {
  try {
    await db.sync({ force });
    if (force){
        await sync()
    }
    console.log('seed was successful')
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
