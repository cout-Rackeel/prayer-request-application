exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.pastorBoard =(req,res) => {
  res.status(200).send("Pastor Content.");
}

exports.saintBoard =(req,res) => {
  res.status(200).send("Saint Content.");
}

exports.motherBoard =(req,res) => {
  res.status(200).send("Mother Content.");
}

exports.ministerBoard =(req,res) => {
  res.status(200).send("Minister Content.");
}


