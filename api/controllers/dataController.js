const toolbox = require("../self_modules/toolbox");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const data = require("../data.json");
const _ = require("lodash")
let blogMessages = [];
let logs = [];

exports.logs = logs;

const log = ({ status, action, message, payload }) => {
    const date =  new Date();
    date.setHours(date.getHours() + 1);
    logs.push({ status, message, action, payload, date });
}

exports.connectUser = (req, res) => {
    let body = req.body
    let user = null
    if (!toolbox.checkMail(body.mail)) {
        log({ status: 'Error', action: 'Authentication', message: 'The mail doesn\'t use a correct format', payload: body })
        res.status(400).send('The mail doesn\'t use a correct format');
    } else {
        data.forEach(el => {
            if(el.mail === body.mail) {
                user = el
            }
        });
        if(user == null){
            log({ status: 'Error', action: 'Authentication', message: 'This user does not exist', payload: body })
            res.status(404).send('This user does not exist');
        } else {
            bcrypt.compare(body.password, user.password, function (error, result) {
                if (error) {
                    log({ status:'Error', action: 'Authentication', message: 'Server error', payload: body })
                    res.status(500).send(error + '. Please contact the webmaster')
                } else if (result) {
                    log({ status:'Success', action: 'Authentication', message: `Successfully logged as ${user.mail}`, payload: { mail: user.mail, password: '🙈' } })
                    const token = jwt.sign({ user_id: user.id, user_role: user.role }, 'xxxx');
                    res.status(200).json({ token, role: user.role })
                } else {
                    log({ status:'Error', action: 'Authentication', message: 'Invalid authentication', payload: body })
                    res.status(403).send('Invalid authentication')
                }
            });
        }
    }
}

exports.logoutUser = (req, res) => {
    log({ status: 'Success', action: 'Authentication', message: 'Déconnexion réussie' })
    res.clearCookie('token');
    res.json({ message: 'Déconnexion réussie' });
};

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
        log({ status:'Error', action: 'Create blog message', message: 'Cannot add an empty message', payload: body })
        res.status(400).send('Cannot add an empty message');
    } else {
        log({ status:'Success', action: 'Create blog message', message: 'Message Added', payload: body })
        blogMessages.push(body.message)
        res.status(200).send("Message Added");
    }
}