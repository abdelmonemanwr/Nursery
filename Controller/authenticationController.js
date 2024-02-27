const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("./../Model/Teacher");
require('dotenv').config();
const encryptionKey = process.env.encryptionKey;


const dummyAdminCredentials = {
    fullname: "admin",
    password: "adminpassword",
    role: "basicAdmin"
};

exports.login = async(req, res, next) => {
    // if it was a dummy admin
    const { fullname, password } = req.body;
    if (fullname === dummyAdminCredentials.fullname && password === dummyAdminCredentials.password) {
        let token = jwt.sign(
            {                 
                _id: dummyAdminCredentials._id,
                fullname: dummyAdminCredentials.fullname,
                role: dummyAdminCredentials.role
            },          
            encryptionKey,       // secret key
            { expiresIn: "24h" } // options
        );
        res.status(200).json({ data: "Authenticated", token });
        return;
    }
    // if it was a teacher

    // let hashed;
    // try {
    //     const salt = await bcrypt.genSalt(10);
    //     hashed = await bcrypt.hash(password, salt);
    // } catch (error) {
    //     next("lol error"+error);
    // }

    Teacher.findOne({
        // fullname: fullname,
        // password: hashed
        email: req.body.email     
    })
    .then(object => {
        if (object) {
            if(!bcrypt.compareSync(password, object.password)){
                res.status(401).json({ error: "Invalid credentials !" });
                return;
            }
            let token = jwt.sign(
                {                     // object
                    _id: object._id,
                    fullname: object.fullname,
                    role: "teacher"
                },
                 encryptionKey,       // secret key
                { expiresIn: "24h" }  // options
            );
            res.status(200).json({ data: "Authenticated", token });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    })
    .catch(error => {
        console.log("test");
        next(error);
    });
}
