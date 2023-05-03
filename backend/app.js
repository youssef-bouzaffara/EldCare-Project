const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const multer = require("multer");

const path = require("path");

const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/eldCareDB")


const accountSidTwilio = 'AC7463d1818010dbaaded12d2fefb5ce19';
const authTokenTwilio = '27aa9d5bce7ba7b4d14ec79962447cad';

const client = require('twilio')(accountSidTwilio, authTokenTwilio);

const app = express();

const authenticate = require("./middleware/authenticate");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// configuration path : remplacer backend/files/images   par   /avatars
app.use('/avatars', express.static(path.join('backend/files/images')));
app.use('/cvs', express.static(path.join('backend/files/CVs')));

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}

// const storageConfig = multer.diskStorage({
//     // destination
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE[file.mimetype];
//         let error = new Error("Mime type is invalid");
//         if (isValid) {
//             error = null;
//         }

//         cb(null, 'backend/files/images');


//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLowerCase().split(' ').join('-');
//         const extension = MIME_TYPE[file.mimetype];


//         const imgName = name + '-' + Date.now() + '-eldCare-' + '.' + extension;
//         cb(null, imgName);


//     }
// });

// const MIME_TYPE_CVs = {
//     'application/pdf': 'pdf'
// }

// const storageConfigCvs = multer.diskStorage({
//     // destination
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE_CVs[file.mimetype];
//         let error = new Error("Mime type is invalid");
//         if (isValid) {
//             error = null;
//         }
//         cb(null, 'backend/files/CVs')
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLowerCase().split(' ').join('-');
//         const extension = MIME_TYPE_CVs[file.mimetype];
//         const cvName = name + '-' + Date.now() + '-eldCare-' + '.' +
//             extension;
//         cb(null, cvName);
//     }
// });

const storageConfig = multer.diskStorage({
    // destination

    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");

        if (isValid) {
            error = null;
        }
        if (file.fieldname === "photo") {
            cb(null, 'backend/files/images');
        } else {
            cb(null, 'backend/files/CVs');
        }

    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];

        if (file.fieldname === "photo") {
            const imgName = name + '-' + Date.now() + '-eldCare-' + '.' + extension;
            cb(null, imgName);
        } else {
            const cvName = name + '-' + Date.now() + '-eldCare-' + '.' + extension;
            cb(null, cvName);
        }

    }
});


const User = require("./models/user");
const Demande = require("./models/demande");


// BL : signup admin

app.post("/users/adminSubscription", multer({ storage: storageConfig }).single("photo"), (req, res) => {
    console.log("Here BL : Signup Admin");
    console.log("here object recieved : ", req.body);

    bcrypt.hash(req.body.pwd, 8).then(
        (cryptedPwd) => {
            let thisAvatar;

            if (req.file && req.file.filename) {
                thisAvatar = `http://localhost:3001/avatars/${req.file.filename}`;
            } else {
                thisAvatar = "http://localhost:3001/avatars/male-default-avatar.png";
            }
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                pwd: cryptedPwd,
                address: req.body.address,
                role: req.body.role,
                subscriptionDate: req.body.subsDate,
                avatar: thisAvatar
            });
            user.save((err, doc) => {
                if (doc) {
                    res.json({ message: "Admin added with success !", isAdded: true })
                }
                else {
                    res.json({ message: "Email exist already !", isAdded: false })
                }
            })
        });
});

// BL : signup User

app.post("/users/userSubscription", multer({ storage: storageConfig }).single("photo"), (req, res) => {
    console.log("Here BL : Signup User");
    console.log("here object recieved : ", req.body);
    bcrypt.hash(req.body.pwd, 8).then(
        (cryptedPwd) => {
            let thisAvatar;

            if (req.file && req.file.filename) {
                thisAvatar = `http://localhost:3001/avatars/${req.file.filename}`;
            } else {
                thisAvatar = "http://localhost:3001/avatars/male-default-avatar.png";
            }
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                pwd: cryptedPwd,
                address: req.body.address,
                role: req.body.role,
                subscriptionDate: req.body.subsDate,
                status: req.body.status,
                avatar: thisAvatar
            });
            user.save((err, doc) => {
                if (doc) {
                    res.json({ message: "User added with success !", isAdded: true })
                }
                else {
                    res.json({ message: "Email/Tel exist already !", isAdded: false })
                }
            })
        });
});


// BL : signup Assitant

app.post("/users/assistantSubscription", multer({ storage: storageConfig }).single("cv"), (req, res) => {
    console.log("Here BL : Signup Assistant");
    console.log("here object recieved : ", req.body);

    bcrypt.hash(req.body.pwd, 8).then(
        (cryptedPwd) => {
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                pwd: cryptedPwd,
                address: req.body.address,
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                role: req.body.role,
                subscriptionDate: req.body.subsDate,
                status: req.body.status,
                cv: `http://localhost:3001/cvs/${req.file.filename}`,
                avatar: ""
            });
            if (user.gender == "male") {
                user.avatar = "http://localhost:3001/avatars/male-default-avatar.png";
            }
            else {
                user.avatar = "http://localhost:3001/avatars/female-default-avatar.png";
            }
            user.save((err, doc) => {
                if (doc) {
                    res.json({ message: "َYour subscription is done successfully.", isAdded: true })
                }
                else {
                    res.json({ message: "Email exist already !", isAdded: false })
                }
            })
        });
});

// BL : Login

app.post("/users/signin", (req, res) => {
    console.log("Here BL : Sign In");
    console.log("Here obj recieved from FE: ", req.body);
    let findedUser = {};
    User.findOne({
        $or: [{ email: req.body.email }, { tel: req.body.tel }]
    }).then(
        (doc) => {
            console.log("here resp of shearch document by email or tel :", doc);
            findedUser = doc;
            if (!doc) {
                res.json({ message: "error: email or tel is not finded" })
            } else {
                return bcrypt.compare(req.body.pwd, doc.pwd)
            }
        }
    ).then(
        (pwdResult) => {
            console.log("here pwd compare result:", pwdResult);
            if (!pwdResult) {
                res.json({ message: "error: password incorrect" })
            } else {
                const token = jwt.sign(
                    {
                        email: findedUser.email,
                        userId: findedUser._id,
                        userTel: findedUser._tel,
                    },
                    "reconVersion",
                    { expiresIn: "5mins" }
                );
                let userToSend = {
                    id: findedUser._id,
                    firstName: findedUser.firstName,
                    lastName: findedUser.lastName,
                    role: findedUser.role,
                    jwt: token,
                    expiresIn: 300
                };

                res.json({ user: userToSend, message: "success: user is finded" });
            }
        }
    );

});

//  BL : get users by role 

app.post("/users/allUsersByRole", (req, res) => {
    let roleSearched = req.body.role;
    console.log("here role searched", roleSearched);
    User.find({ role: roleSearched }).then(
        (data) => {
            res.json({ users: data, message: `all users with role ${roleSearched} are finded` });
        }
    )
});


// BL : get Profile by ID

app.get("/users/getProfileById/:id", (req, res) => {
    let id = req.params.id;
    User.findOne({ _id: id }).then(
        (doc) => {
            res.json({ user: doc, isFinded: true })
        }
    )
});

// BL : confirm Profile by ID

app.put("/users/confirmProfileById", authenticate, (req, res) => {
    const update = { status: "confirmed" }
    User.updateOne({ _id: req.body.id }, update).then(
        (result) => {
            console.log(result);
            if (result.nModified == 1) {
                res.json({ message: "Modified sucessfully!" });
            }
            else {
                res.json({ message: "Error, can't modify!" });
            }
        }
    )
});


// BL : delete profile by ID 

app.delete("/users/deleteProfileById/:id", (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }).then(
        (resp) => {

            if (resp.deletedCount == 1) {
                res.json({ message: "Deleted Successfully" });
            }

        }
    )
});


// BL : Edit Profile :

app.put("/users/editProfile",authenticate, multer({ storage: storageConfig }).fields([{ name: "photo", maxCount: 1 }, { name: "cv", maxCount: 1 }]), (req, res) => {
    console.log("here BL edit profile. The new profile recieved is :", req.body);

    const newUser = req.body
    User.findOne({ _id: newUser.id }).then(
        (doc) => {
            if (!doc) {
                res.json({ message: "Could not find you in Data", isEdited: false });
            } else {
                return bcrypt.compare(newUser.pwd, doc.pwd)
            }
        }
    ).then(
        (pwdCheckResult) => {
            if (!pwdCheckResult) {
                res.json({ message: "Please check the password", isEdited: false });
            } else {
                User.findOne({ $and: [{ _id: { $ne: newUser.id } }, { $or: [{ email: newUser.email }, { tel: newUser.tel }] }] }, function (err, existingUser) {
                    if (err) {
                        res.json({ message: "Error ! can not update. Please try again later.", isEdited: false });
                    } else if (existingUser) {
                        res.json({ message: "New Email/Tel are taken please enter other one", isEdited: false });
                    } else {
                        let updatedUser = {
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            tel: newUser.tel,
                            address: newUser.address,
                        };
                        if (req.files.photo) {
                            updatedUser.avatar = `http://localhost:3001/avatars/${req.files.photo[0].filename}`;

                        }
                        if (req.files.cv) {
                            updatedUser.cv = `http://localhost:3001/cvs/${req.files.cv[0].filename}`;

                        }

                        User.updateOne({ _id: newUser.id }, updatedUser).then(
                            (response) => {
                                if (response.ok == 1) {
                                    res.json({ message: "Your profile has been updated Successfully!", isEdited: true });
                                } else {
                                    res.json({ message: "Error! your profile can't be updated.", isEdited: false });
                                }
                            }
                        );
                    }
                });


            }
        }
    )

});


// BL : Change Password :

app.put("/users/editProfile/changerPwd", authenticate, (req, res) => {
    console.log("here obj recieved from FE :", req.body);
    User.findOne({ _id: req.body.id }).then(
        (doc) => {
            if (!doc) {
                res.json({ message: "Error : Check email/oldPwd", isChanged: false });
            } else {
                return bcrypt.compare(req.body.oldPwd, doc.pwd)
            }
        }
    ).then(
        (pwdCheckResult) => {
            if (!pwdCheckResult) {
                res.json({ message: "Error : Check email/oldPwd", isChanged: false });
            } else {
                bcrypt.hash(req.body.newPwd, 8).then(
                    (cryptedPwd) => {
                        const updates = { pwd: cryptedPwd }
                        User.updateOne({ _id: req.body.id }, updates).then(
                            (resp) => {
                                if (resp.nModified == 1) {
                                    res.json({ message: "Your password is updated successfully", isChanged: true });
                                } else {
                                    res.json({ message: "Error : error from Backend server", isChanged: false });
                                }
                            }
                        )
                    }
                )
            }
        }
    )
});

// BL : Search Assistants By Name, Gender and Address

app.post("/users/searchAssistant", (req, res) => {
    console.log("Here search Assistant BL :", req.body);

    if (req.body.thing == '') {
        res.json({ isFinded: false })
    }

    const toSearch = req.body.thing.trim();


    const regexPattern = `.*${toSearch.replace(/\s+/g, '\\s+')}.*`;
    const regex = new RegExp(regexPattern, 'i');
    User.find({
        $and: [
            { role: "assistant" },
            { status: "confirmed" },
            {
                $or: [
                    { firstName: { $regex: regex } },
                    { lastName: { $regex: regex } },
                    { gender: { $regex: regex } },
                    { address: { $regex: regex } }
                ],
            },
        ],
    }).then(
        (resp) => {
            if (resp.length) {
                res.json({ assistants: resp, isFinded: true })
            }
            else {
                res.json({ assistants: resp, isFinded: false })
            }

        }
    )
});


// --------------------------------------------------------HERE ALL BL FOR DEMANDES TRAITMENTS------------------------------------------------------------------------

// BL : Add new Demande

app.post("/demandes/addNewDemande",authenticate, (req, res) => {
    console.log("here BL add Demande and this what we recieved :", req.body);

    User.findOne({ tel: req.body.telSender }).then(
        (doc) => {
            let newDemande = new Demande({
                demandeDate: req.body.demandeDate,
                telSender: req.body.telSender,
                firstNameSender: req.body.firstNameSender,
                lastNameSender: req.body.lastNameSender,
                idAssistant: req.body.idAssistant,
                idSender: doc._id,
                subject: req.body.subject,
                status: "on hold"
            });
            newDemande.save((err, doc) => {
                if (doc) {
                    res.json({ message: "Demande is sent successfully", isAdded: true });
                } else {
                    res.json({ message: "Please try again later", isAdded: false });
                }
            })
        }
    )



});

// BL : Get all Demandes

app.get("/demandes/getAllDemandes", (req, res) => {
    const demandesTable = [];
    Demande.find().then(
        (data) => {
            res.json({ message: "All demandes we have", demandes: data });
        }
    )
});

// BL : Get Demande by Id

app.get("/demandes/getDemande/:id", (req, res) => {
    const id = req.params.id;
    Demande.findOne({ _id: id }).then(
        (doc) => {
            if (doc) {
                res.json({ demande: doc, isFinded: true });
            } else {
                res.json({ isFinded: false });
            }
        }
    )
});

// BL : Delete Demande by Id

app.delete("/demandes/deleteDemande/:id", authenticate, (req, res) => {
    const id = req.params.id;
    Demande.deleteOne({ _id: id }).then(
        (resp) => {

            if (resp.deletedCount == 1) {
                res.json({ message: "Demande deleted Successfully", isDeleted: true });
            }
            else {
                res.json({ message: "Somthing wrong is happening", isDeleted: false });
            }

        }
    )
});

// BL : Edit Demande by Id

app.put("/demandes/editDemande", authenticate, (req, res) => {

    const update = { status: req.body.status };
    Demande.updateOne({ _id: req.body.idDemande }, update).then(
        (result) => {
            console.log(result);
            if (result.nModified == 1) {
                if (update.status == 'accepted') {

                    // HERE API NODE MAILER
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "bouzaffarayoussef@gmail.com",
                            pass: "oshpunfncdfmtree",
                        },
                    });

                    // send mail with defined transport object
                    let mailOptions = {
                        from: "josef0bz@gmail.com",
                        to: "bouzaffarayoussef@gmail.com",
                        subject: "Your request has been accepted",
                        text: `Your request (Id: ${req.body.idDemande}) has been accepted by the assistant. We wait for your Confirmation.`,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Email sent: " + info.response);
                        }
                    });

                    res.json({ message: `The demande status is, successfully, set to "${req.body.status}". Acceptation email & SMS to the Client has been sent`, isEdited: true });

                }
                if (update.status == 'declined') {

                    // HERE API TWILIO
                    client.messages
                        .create({
                            body: `We're sorry ! Your demande with Id '${req.body.idDemande}' has been declined.`,
                            to: '+21650468620',
                            from: '+16813219431',
                        })
                        .then((message) => console.log("Here success message from Twilio API :", message))
                        .catch((error) => {
                            // You can implement your fallback code here
                            console.log("Here Error message from Twilio API :", error);
                        });


                }
                res.json({ message: `The demande status is, successfully, set to "${req.body.status}".`, isEdited: true });
            }
            else {
                res.json({ message: "Error, can't modify!", isEdited: false });
            }
        }
    )
});



// make app importable from another files
module.exports = app;