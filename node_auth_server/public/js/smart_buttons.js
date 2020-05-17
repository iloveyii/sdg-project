// For buttons interactions
var states = {
    hs100: 0,
    radio: 0,
    light: 0
};

function makeServerRequest(type, state, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            try {
                fetch('http://10.42.0.169:8080/api/v1/service/' + type + '/' + state).then(data => data.json()).then(d => cb(d));
            } catch (e) {
                reject(e);
            }
            resolve();
        }, 200)

    })

}

function changeButtonToOff(id) {
    document.getElementById(id).className = 'touch-button touch-button-primary';
    document.querySelector('#' + id + ' .touch-button-inner i').className = 'fa fa-power-off';
    states[id] = 1;
}

function changeButtonToOn(id) {
    document.getElementById(id).className = 'touch-button touch-button-success';
    document.querySelector('#' + id + ' .touch-button-inner i').className = 'fa fa-play-circle-o';
    states[id] = 0;
}

function changeButtonToPause(id) {
    document.getElementById(id).className = 'touch-button touch-button-warning';
    document.querySelector('#' + id + ' .touch-button-inner i').className = 'fa fa-pause-circle-o';
}

document.getElementById('hs100').addEventListener('click', e => {
    e.preventDefault();
    changeButtonToPause('hs100')
    makeServerRequest('hs100', states.hs100 === 0 ? 1 : 0, (data) => {
        console.log(data);
        window.data = data;
        Number(data.state) === 1 ? changeButtonToOff('hs100') : changeButtonToOn('hs100');
        console.log(data)
    });
});

document.getElementById('light').addEventListener('click', e => {
    e.preventDefault();
    changeButtonToPause('light')
    makeServerRequest('light', states.light === 0 ? 1 : 0, (data) => {
        Number(data.state) === 1 ? changeButtonToOff('light') : changeButtonToOn('light');
        console.log(data)
    });
});

document.getElementById('radio').addEventListener('click', e => {
    e.preventDefault();
    changeButtonToPause('radio')
    makeServerRequest('radio', states.radio === 0 ? 1 : 0, (data) => {
        Number(data.state) === 1 ? changeButtonToOff('radio') : changeButtonToOn('radio');
        console.log(data)
    });
});

/*setInterval(() => {
    document.getElementById('light').click();
}, 3000) */
