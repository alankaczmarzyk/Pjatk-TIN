export const customerList = [
    { _id: 1, firstName: "John", lastName: "Wall", street:"Mazowiecka 12", city:"Warszawa", postCode:"02-232", email:"wall@gmail.com" },
    { _id: 2, firstName: "Mike", lastName: "Brown", street:"Koszykowa 34", city:"Warszawa", postCode:"02-232", email:"brown@gmail.com" },
]


export const customerDetailsList = [
    {
        "_id": 1,
        "firstName": "John",
        "lastName": "Wall",
        "street": "Mazowiecka 22",
        "city": "Warszawa",
        "postCode": "02-232",
        "email": "wall@gmail.com",
        "orders": [
            {
                "_id": 2,
                "weight": "10.00",
                "date": "2016-01-01T00:00:00.000Z",
                "price": "195.00",
                "cour_id": 2,
                "cust_id": 1,
                "courier": {
                    "_id": 2,
                    "firstName": "Adam",
                    "lastName": "Zieliński",
                }
            },
            {
                "_id": 1,
                "weight": "200.00",
                "date": "2009-01-01T00:00:00.000Z",
                "price": "132.00",
                "cour_id": 1,
                "cust_id": 1,
                "courier": {
                    "_id": 1,
                    "firstName": "Jan",
                    "lastName": "Kowalski",
                }
            }
        ]
    },
    {
        "_id": 2,
        "firstName": "Mike",
        "lastName": "Brown",
        "street": "Koszykowa 34",
        "city": "Warszawa",
        "postCode": "02-232",
        "email": "wall@gmail.com",
        "orders": [
            {
                "_id": 3,
                "weight": "300.00",
                "date": "2005-01-01T00:00:00.000Z",
                "price": "25.00",
                "cour_id": 1,
                "cust_id": 2,
                "courier": {
                    "_id": 1,
                    "firstName": "Jan",
                    "lastName": "Kowalski",
                }
            }
        ]
    }
]