'use strict';

const os = require('os');
const ifaces = os.networkInterfaces();


const getIp = (name) => {
    let interfacesAddress = [];

    Object.keys(ifaces).forEach(ifname => {
        let alias = 0;

        ifaces[ifname].forEach(iface => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }

            if (alias >= 1) {
                // console.log(ifname + ':' + alias, iface.address);
            } else {
                // console.log(ifname, iface.address);
                interfacesAddress.push({name: ifname, ip: iface.address});
            }
            ++alias;
        });
    });

    for (let i = 0; i < interfacesAddress.length - 1; i++) {
        if (interfacesAddress[i].name === name) {
            return interfacesAddress[i].ip;
        }
    }
};

module.exports = getIp;

