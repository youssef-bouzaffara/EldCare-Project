const mongoose = require("mongoose");


const demandeSchema = mongoose.Schema({
    demandeDate: String,
    telSender: String,
    firstNameSender: String,
    lastNameSender: String,
    idSender: String,
    idAssistant: String,
    subject: String,
    status: String,
});


const demande = mongoose.model("Demande", demandeSchema);

module.exports= demande;