

const client = {
    clientId : "client1",
    secret: "secret1",
    userId: 1
    
}
const VALID_SCOPES = ['read', 'write'];

const getAccessToken = (accessToken) => {
    console.log('getAccessToken', accessToken)

}
const verifyScope = (accessToken, scope) => {
    console.log('verifyScope', accessToken, scope);
} 
const generateAccessToken = (client, user, scope) => {
    console.log('generateAccessToken', client, user, scope);

}
const getClient = (clientId, clientSecret) => {
   // return false;
    console.log('getClient', clientId, clientSecret)
    return {
        clientId: clientId,
        clientSecret,
        redirectUris : 'localhost:3000/test',
        grants: ['client_credentials']
    }

}

// const grantTypeAllowed = (clientId, grantType) => {
//     console.log(grantTypeAllowed, clientId, grantType)
//     return true;
// }
const getUserFromClient = (client) => {
    // /return db.queryUser({id: client.user_id});
    console.log('getUserFromClient',client)
    return {id: 1}
}
const saveToken = (token,  client, user) => {
    console.log('saveToken', token, client, user)
    let result = {...token, client,user};
    //console.log(result);
    return result;

}
const validateScope = (user, client, scope) => {
    console.log('validateScope',user, client, scope)
    return scope
    .split(' ')
    .filter(s => VALID_SCOPES.indexOf(s) >= 0)
    .join(' ');
}



module.exports = {
    getAccessToken,
    verifyScope,
    generateAccessToken,
    getClient,
    getUserFromClient,
    saveToken,
    validateScope
}