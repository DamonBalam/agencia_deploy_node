const Testimonial = require('../models/Testimoniales');
exports.consultaTestimoniales = async (req,res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales',{
        pagina: 'Testimoniales',
        testimoniales
    });
}

exports.agregarTestimonio = async (req,res)=> {
        // validacion
        let {nombre,correo,mensaje} = req.body;
        let errores = [];
        if (!nombre) {
            errores.push({'mensaje': 'Agrega tu Nombre'})
        }
        if (!correo) {
            errores.push({'mensaje': 'Agrega tu Correo electrónico'})
        }
        if (!mensaje) {
            errores.push({'mensaje': 'Agrega el Mensaje'})
        }

        // revisar los errores
        if (errores.length > 0) {
            // muestra la vista con errores
            const testimoniales = await Testimonial.findAll();
            res.render('testimoniales',{
                errores,
                nombre,
                correo,
                mensaje,
                pagina: 'Testimoniales',
                testimoniales
            })
        } else {
            // almacenar en bd
           Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales') )
            .catch(error => console.log(error));
        }

}