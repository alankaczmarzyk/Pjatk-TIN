const CourierRepository = require('../repository/sequelize/CourierRepository');

exports.getCouriers = (req, res, next) => {
    CourierRepository.getCouriers()
        .then(cour => {
            res.status(200).json(cour);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCourierById = (req, res, next) => {
    const courId = req.params.courId;
    
    CourierRepository.getCourierById(courId)
        .then(cour => {
            if (!cour) {
                res.status(404).json({
                    message: 'Courier with id: ' + courId + ' not found'
                })
            } else {
                res.status(200).json(cour);
            }
        });
};

exports.createCourier = (req, res, next) => {
    CourierRepository.createCourier(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCourier = (req, res, next) => {
    const courId = req.params.courId;
    CourierRepository.updateCourier(courId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Courier updated!', cour: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCourier = (req, res, next) => {
    const courId = req.params.courId;
    CourierRepository.deleteCourier(courId)
        .then(result => {
            res.status(200).json({ message: 'Removed courier', cour: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
