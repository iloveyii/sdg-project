import ActiveRecord from './ActiveRecord';

class Basic extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            channels: [],
            channel1: '',
            channel2: '',
            transformation: 'hlog',
            transformations: ['hlog', 'tlog'],
            bins: 100,
        };
        console.log('Plots', this.types);
    }

    /*get types() {
        const superTypes = super.types;
        const name = 'episodes';

        return Object.assign({}, superTypes,
            {
                episodes: {
                    create: name + '.create',
                    create_success: name + '.create.success',
                    create_fail: name + '.create.fail',
                }
            });
    }*/


}

export default Basic;
