const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin',
    
    "data": [
        {
            "longitude": 2.573888,
            
            "latitude": 48.639748,
            "id": 1590, }, {
                "longitude": 2.573888,
                
                "latitude": 48.639748,
                "id": 1590, }, {
                    "longitude": 2.573888,
                    
                    "latitude": 48.639748,
                    "id": 1590, }] , 
       
    
    lastName: 'User', role: Role.Admin },




    { id: 2, username: 'user', password: 'user', firstName: 'Normal',
    
    "data": [
        {
            "longitude": 2.573888,
            
            "latitude": 48.639748,
            "id": 1590, }] ,
            
            lastName: 'User', role: Role.User },
    { id: 2, username: 'ghiles', password: 'ghiles', firstName: 'ghiles',
    "data": [
        {
            "longitude": 2.573888,
            
            "latitude": 48.639748,
            "id": 1590, }] ,
             lastName: 'ghiles', role: Role.User },
    { id: 2, username: 'begaz', password: 'begaz', firstName: 'begaz', 
    "data": [
        {
            "longitude": 2.573888,
            
            "latitude": 48.639748,
            "id": 1590, }] ,
            lastName: 'begaz', role: Role.Admin }
];

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}