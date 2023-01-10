const Mensaje = require('../models/mensaje');

const obtenerChat = async( req, res ) => {
  const miId = req.uid;
  const mensajeDe = req.params.de

  try {
    const last30 = await Mensaje.find({
      $or: [
        { de: miId, para: mensajeDe },
        { de: mensajeDe, para: miId }
      ]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);
  
    res.json({
      ok: true,
      miId,
      mensajes: last30
    });
  } catch(err){
    console.log(err);
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error'
    })
  }
}

module.exports = {
  obtenerChat
}