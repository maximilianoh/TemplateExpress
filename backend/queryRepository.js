async function getUser(){
    return await {name:'John Doe', mail:'johnd@gmail.com', perfil:'http://placehold.it/640/333'};
}

module.exports = {
    getUser
}