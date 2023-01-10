const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const crearUsuario = async(req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await Usuario.findOne({ email });
    if (emailExists){
      return res.status(400).json({
        ok: false,
        msg: "Email ya existe"
      });
    }

    // Guardar en Base de datos
    const usuario = new Usuario( req.body );
    
    // Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id );

    return res.status(200).json({
      usuario,
      token
    });

  }catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor"
    });
  }
}

const login = async (req,res) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    if(!usuarioDB){
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado"
      });
    }

    // Validar Password
    const validPassword = bcrypt.compareSync( password, usuarioDB.password);
    if( !validPassword ){
      return res.status(400).json({
        ok: false,
        msg: "Password no es correcto"
      });
    }

    // Generar JWT
    const token = await generarJWT( usuarioDB.id )

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    })

  }catch(error) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor"
    });
  }

  
}

const renewToken = async(req, res) => {
  const uid = req.uid;

  const token = await generarJWT( uid );
  const usuario = await Usuario.findById( uid );

  res.json({
    ok: true,
    usuario,
    token
  });
}

module.exports = {
  crearUsuario,
  login,
  renewToken
};