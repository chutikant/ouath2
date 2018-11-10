
const VALID_SCOPES = ['read', 'write'];
//const mongodb = require('mongodb').MongoClient;

const mongo = async () => {
    const MongoClient =  require('mongodb').MongoClient;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url, {useNewUrlParser: true});
    try {
        // Use connect method to connect to the Server
        const dbName ="test";
        await client.connect();
       
        const db = client.db(dbName);
        return db;
      } catch (err) {
        console.log(err.stack);
      }
   
    
}



const getAccessToken = (accessToken) => {
   // console.log('getAccessToken', accessToken)
}
const verifyScope = (accessToken, scope) => {
    console.log('verifyScope', accessToken, scope);
} 
const generateAccessToken = (client, user, scope) => {
   // console.log('generateAccessToken', client, user, scope);
}
const getClient = async (clientId, clientSecret) => {
   // console.log('getClient', clientId, clientSecret)
    let db = await mongo();
    let query = await db.collection('client').findOne({'clientId' : clientId})

    if(query) {
        let { _id, ...client} = query
        console.log(client);
        return client
    } else {
        return null
    }
}

// const grantTypeAllowed = (clientId, grantType) => {
//     console.log(grantTypeAllowed, clientId, grantType)
//     return true;
// }
const getUserFromClient = async (client) => {
    //console.log('getUserFromClient',client)
    let db = await mongo();
    let query = await db.collection('user').findOne({'clientId' : client.clientId})
    if(query) {
        let {_id,...rest} = query
        return {id: _id}
    } else {
        return null
    }
}
const saveToken = async (token,  client, user) => {
   // console.log('saveToken', token, client, user)
    let db = await mongo();
    let query = await db.collection('token').insert({...token, clientId: client.clientId, userId: user.id, scope: client.scope})
    console.log('After insert', query);
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