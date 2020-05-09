class Basic {
    _channels = [];
    _channel1 = 'ch1';
    _channel2 = 'ch2';
    _transformation = 'tlog';
    _transformations = ['hlog', 'tlog'];
    _bins = -1;
    ts = null;

    constructor() {
        this.ts = Date.now();
    }

    set basic(basic) {
        this.channels = basic.channels ? basic.channels : basic;
        this.channel1 = basic[0];
        this.channel2 = basic[1];
    }

    set channels(channels) {
        // preset attributes
        this.channel1 = channels[0];
        this.channel2 = channels[1];
        this.bins = 100;
        this.transformation = 'tlog';
        this._channels = channels;
    };

    get channels() {
        return this._channels;
    };

    set channel1(channel1) {
        console.log('Basic_ Setting channel 1', channel1);
        this._channel1 = channel1;
    }

    get channel1() {
        return this._channel1;
    }

    set channel2(channel2) {
        console.log('Basic_ Setting channel 2', channel2)
        this._channel2 = channel2;
    }

    get channel2() {
        return this._channel2;
    }

    set transformation(transformation) {
        console.log('Basic_ Setting transformation', transformation)
        this._transformation = transformation;
    }

    get transformation() {
        return this._transformation;
    }

    get transformations() {
        return this._transformations;
    }

    set bins(bins) {
        console.log('Basic_ Setting bins to : ', bins, bins < 0);
        bins = Number(bins);
        this._bins = bins < 0 ? bins * -1 : bins;
    }

    get bins() {
        return this._bins;
    }

    set attribues(attributes) {
        this.channel1 = attributes.channel1;
        this.channel2 = attributes.channel2;
        this.transformation = attributes.transformation;
        this.bins = attributes.bins;
    }

    get attributes() {
        return {
            channels: this.channels,
            channel1: this.channel1,
            channel2: this.channel2,
            transformation: this.transformation,
            transformations: this.transformations,
            bins: this.bins
        }
    }
}

export default Basic;
