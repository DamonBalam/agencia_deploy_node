const Viaje = require('../models/Viajes');
exports.consultaViajes = async (req,res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes',{
        pagina: 'Próximos Viajes',
        viajes : viajes
    });
}

exports.consultaViajeID = async (req,res) => {
    const viaje = await Viaje.findByPk(req.params.id)
    res.render('viaje',{
        viaje
    });
};