const apiServer = process.env.REACT_APP_serverIp ? process.env.REACT_APP_serverIp : 'http://mobile-server.softhem.se:8090';
console.log('ENV:', apiServer);

export  {
    apiServer,
};


