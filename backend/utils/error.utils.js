// Gestion des erreurs dans le backend (MySQL et API)
// Gestion des erreurs lors de l'inscription :
module.exports.signUpErrors = (err) => {
    // Création d'un objet error pour récupérer les erreurs
    let errors = {email: ""};

    // Si le mot de passe est déjà enregistré :
    if (err.errno === 1062) errors.email = "Cet email est déjà utilisé";

    return errors;
}

// Gestion des erreurs lors de l'upload d'une image :
module.exports.uploadErrors = (err) => {
    let errors = {format: '', maxSize: ""};

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatabile";

    if (err.message.includes('max size'))
        errors.maxSize = "Le fichier dépasse 500ko";

    return errors;
}