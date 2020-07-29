const authRouter = require('express').Router()
const bcrypt = require('bcrypt')
const passport = require('passport');
const Session = require('../db/models/session');

authRouter.post("/api/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username && password){
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      await User.create({
        username:username,
        password:hash,
        salt:salt
      });
      res.status(202).send({
        message: `user ${username} successfully created`,
      });
    }
    } catch (e) {
      res.status(500).send({
        message: ("error creating user", e),
      });
    }
  });
  authRouter.post('/login', passport.authenticate('local', 
      {
          failureRedirect:'/login',
          failureFlash:'Login failed'
    }), async function(req, res){; 
     const userId = req.user.id
     const usersSession = await Session.findByPk(req.cookies.session_id);
     if (!usersSession){
        usersSession = await Session.create({id:req.cookies.session_id})
    }
     await usersSession.setUser(userId);
      res.send({
      message:`${req.user.username} found`
    });
  });
  authRouter.get('/api/login', (req,res) => {
    try {
    if (req.user) {
      res.send({
        username:req.user.username,
        password:req.user.password
      })
    }
    }
    catch(e){
      console.error(e)
    }
  })
  authRouter.delete('/api/logout', (req,res) => {
    try{
      req.logOut()
      res.clearCookie('session_id')
      res.status(200).send({
        message:'successfully deleted'
      })
    }
    catch(e){
      console.error(e)
      res.sendStatus(500)
    }
  })

  module.exports = authRouter