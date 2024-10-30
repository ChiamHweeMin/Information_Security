// npm install mongodb --save

var MongoClient = require('mongodb').MongoClient;
// const HOSTNAME = "localhost";
// const PORT = 27017;
// const uri = "mongodb://10.131.9.34:27017";
// const uri = "mongodb://192.168.43.157:27017";

const db_server_ip = '192.168.43.157'; //SERVER_IP
const db_server_port = '27017';
const db_name = 'UserDB'; //DATABASE_NAME
const db_username = 'user1';
const db_userPassword = 'user1Password'
const db_server_url = `mongodb://${db_username}:${db_userPassword}@${db_server_ip}:${db_server_port}/${db_name}`;

const mongo_client_options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsCertificateKeyFile: `C:/opt/certs/MongoDBCerts/mongodb_client.pem`,
    tlsCertificateKeyFilePassword: 'password'
};

const client = new MongoClient(db_server_url, mongo_client_options);
client.connect(err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB');
    
});

// let options = {
//     useNewUrlParser: true
//     // auth: {
//     //     username: 'admin',
//     //     password: 'passwordAdmin'
//     // }
// };

// async function main() {
//     await mongoose.connect(db_server_url, mongo_client_options);
//     console.log(`successfully connected!`);
  
  
//     //list collections in this database!
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//       console.log(names);
//     });
    
//      mongoose.disconnect();
//   }



