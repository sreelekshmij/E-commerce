const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied. Token missing." });
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function verifyAndAuthenticate(req, res, next){
  authenticateToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    } else {
      res.status(403).json("You are not allowed to do that")
    }
  })
}

function verifyAdmin(req,res,next){
  authenticateToken(req,res,() => {
    if(req.user.isAdmin){
      next();
    } else {
      res.status(403).json("failed")
    }
  })
}


module.exports = {
  authenticateToken,
  verifyAndAuthenticate,
  verifyAdmin
};
