const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersCtrl = {

    login : async (req,res) => {
        
      try {
        const {name,email,password} = req.body ;

        const user = await Users.findOne({email});

        // if(user) {
        //     return res.status(400).json({msg : 'Email already exists'});
        // }
        // if(password.length < 6) {
        //     return res.status(400).json({msg : 'Password is at least 6 characters long.'});
        // }

        const passwordHash = await bcrypt.hash(password , 10);

        const newUser = new Users({
            name, email ,password:passwordHash
        })

        const access_token = createAccessToken({id : newUser._id});
        const refresh_token = createRefreshToken({id : newUser._id});

        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/users/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })

        newUser.save();

        res.json({access_token,refresh_token});

      } catch (error) {
        return res.status(500).json({msg : error.message});
      }
    },

    getUsers : async (req,res) => {
        
        try {
  
          const users = await Users.find()
  
          res.json({users});
  
        } catch (error) {
          return res.status(500).json({msg : error.message})
        }
      } 

}

const createAccessToken = (user) =>  {
    return jwt.sign(user , process.env.ACCESS_TOKEN ,{expiresIn : '11m'});
}
const createRefreshToken = (user) =>  {
    return jwt.sign(user , process.env.REFRESH_TOKEN ,{expiresIn : '7d'});
}

module.exports = usersCtrl ;