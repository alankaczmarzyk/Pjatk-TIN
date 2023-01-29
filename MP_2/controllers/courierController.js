const CourierRepository = require('../repository/sequelize/CourierRepository');

exports.showCourierList = (req,res,next) => {
    CourierRepository.getCouriers()
    .then(cours => {
        res.render('pages/couriers/list', {
            cours: cours,
            navLocation: 'cour',
        });
    });
}

exports.showAddCourierForm = (req,res,next) => {
    res.render('pages/couriers/form', { 
        cour: {},
        pageTitle: 'Nowy kurier',
        formMode: 'createNew',
        btnLabel: 'Dodaj kuriera',
        formAction: "/couriers/add",
        navLocation: 'cour',
        validationErrors: [] 
    });
}

exports.showCourierDetails = (req,res,next) => {
    const courId = req.params.courId;
    CourierRepository.getCourierById(courId)
    .then(cour => {
        res.render('pages/couriers/form', {
            cour: cour,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły kuriera',
            formAction: '',
            navLocation: 'cour',
            validationErrors: []
        });
    })

}

exports.showCourierEdit = (req,res,next) => {
    const courId = req.params.courId;
    CourierRepository.getCourierById(courId)
    .then(cour => {
        res.render('pages/couriers/form', {
            cour: cour,
            formMode: 'edit',
            pageTitle: 'Edycja kuriera',
            btnLabel: 'Edycja kuriera',
            formAction: '/couriers/edit',
            navLocation: 'cour',
            validationErrors: []
        });
    });
}


exports.addCourier = (req, res, next) => {
    const courData = {...req.body};
    CourierRepository.createCourier(courData)
    .then(result => {
        res.redirect('/couriers');
    }).catch(err => {
        res.render('pages/couriers/form', {
            cour: courData,
            pageTitle: 'Dodawanie kuriera',
            formMode: 'createNew',
            btnLabel: 'Dodaj kuriera',
            formAction: '/couriers/add',
            navLocation: 'cour',
            validationErrors: err.errors
        });
    });
};



exports.updateCourier = (req, res, next) => {
    const courId = req.body.courId;
    const courData = {...req.body};
    CourierRepository.updateCourier(courId, courData)
    .then(result => {
        res.redirect('/couriers');
    }).catch(err => {
        const courier = CourierRepository.getCourierById(courId);
        courData.orders = courier.orders || [];
        res.render('pages/couriers/form', {
            cour: courData,
            formMode: 'edit',
            pageTitle: 'Edycja kuriera',
            btnLabel: 'Edytuj kuriera',
            formAction: '/couriers/edit',
            navLocation: 'cour',
            validationErrors: err.errors
        });
    });
};

exports.deleteCourier = (req, res, next) => {
    const courId = req.params.courId;
    CourierRepository.deleteCourier(courId)
    .then( () => {
        res.redirect('/couriers');
    })
};