exports.checkMail = (mail) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
};

