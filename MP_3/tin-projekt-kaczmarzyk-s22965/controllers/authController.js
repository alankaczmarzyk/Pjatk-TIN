const CourierRepository = require('../repository/sequelize/CourierRepository');
const authUtil = require("../util/authUtills");

exports.login = (req,res,next)=> {
    const email = req.body.email;
    const password = req.body.password;

    CourierRepository.findByEmail(email)
    .then(cour => {
        if(!cour){
            res.render('index', {
                navLocation: '',
                loginError: "Nieprawidłowy adres email lub hasło"
            })
        } else if (authUtil.comparePasswords(password,cour.password) === true) {
            req.session.loggedUser= cour;
            res.redirect('/');
        }else {
            res.render('index', {
                navLocation: '',
                loginError: "Nieprawidłowy adres email lub hasło"
            })
        }
    })
    .catch(err => {
        console.log(err);
    });

}

exports.logout = (req,res,next)=> {
    req.session.loggedUser = undefined;
    res.redirect('/');
}