const jwt = require('jsonwebtoken');

const validarJWT = ((req, res, next) => {
  try {
    const token = req.header('x-token');
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No existe token'
      });
    }
    
    const { uid } = jwt.verify( token, process.env.JWT_KEY );
    req.uid = uid;
    next();

  }catch(err){
    console.log(err);
    return res.status(401).json({
      ok: false,
      msg: "No autorizado"
    })
  }
})

module.exports = {
  validarJWT
}