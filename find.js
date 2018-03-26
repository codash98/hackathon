const MongoClient=require('mongodb').MongoClient;

const url='mongodb://localhost:27017';

const dbn='irctcdemo';

MongoClient.connect(url,function(err,client){
    const db=client.db(dbn);
    db.collection('resthouses').find(
        {city:string('Mahabaleshwar')}
    );
});