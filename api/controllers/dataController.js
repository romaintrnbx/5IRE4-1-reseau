const toolbox = require("../self_modules/toolbox");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const data = require("../data.json");
const logs = require('../logs.json');
const _ = require("lodash")
const fs = require('fs');

let blogMessages = [];

const log = ({ status, action, message, payload, ip }) => {
    const date =  new Date();
    date.setHours(date.getHours() + 1);
    fs.writeFileSync('./logs.json', JSON.stringify([...logs, { status, message, action, payload, date, ip }], null, 2))
}

exports.connectUser = (req, res) => {
    let body = req.body
    let user = null
    if (!toolbox.checkMail(body.mail)) {
        res.status(400).send('The mail doesn\'t use a correct format');
    } else {
        data.forEach(el => {
            if(el.mail === body.mail) {
                user = el
            }
        });
        if(user == null){
            log({ status: 'Error', action: 'Authentication', message: 'This user does not exist', payload: body, ip: req.ip })
            res.status(404).send('This user does not exist');
        } else {
            bcrypt.compare(body.password, user.password, function (error, result) {
                if (error) {
                    log({ status:'Error', action: 'Authentication', message: 'Server error', payload: body, ip: req.ip })
                    res.status(500).send(error + '. Please contact the webmaster')
                } else if (result) {
                    const token = jwt.sign({ user_id: user.id, user_role: user.role }, process.env.ACCESS_TOKEN_SECRET);
                    log({ status:'Success', action: 'Authentication', message: `Successfully logged as ${user.mail}`, payload: { mail: user.mail, password: '🙈' }, ip: req.ip })
                    res.status(200).json({ token, role: user.role })
                } else {
                    log({ status:'Error', action: 'Authentication', message: 'Invalid authentication', payload: body, ip: req.ip })
                    res.status(403).send('Invalid authentication')
                }
            });
        }
    }
}

exports.fetchDataUser = (req, res) => {
    let usr = null
    data.forEach(el => {
        if(el.id === req.body.user_id){
            usr = _.cloneDeep(el)
        }
    });
    if(usr == null) {
        res.status(500).send('Wrong cookies data. Please contact the webmaster')
    } else {
        delete usr.password
        res.status(200).json(usr);
    }
}

exports.getVictory = (req, res) => {
    let usr;
    let usrList = [];
    data.forEach(el => {
        usr = _.cloneDeep(el)
        delete usr.password
        usrList.push(usr)
    });
    res.status(200).json(usrList);
}

exports.fetchBlogMessages = (req, res) => {
    res.status(200).json(blogMessages);
}

exports.createBlogmessage = (req, res) => {
    let body = req.body
    if(body.message === null || body.message === "") {
        log({ status:'Error', action: 'Create blog message', message: 'Cannot add an empty message', payload: body, ip: req.ip })
        res.status(400).send('Cannot add an empty message');
    } else {
        log({ status:'Success', action: 'Create blog message', message: 'Message Added', payload: body, ip: req.ip })
        blogMessages.push(body.message)
        res.status(200).send("Message Added");
    }
}

exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Déconnexion réussie' });
}