import ActiveRecord from './ActiveRecord';

class Show extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            images: [],
        };
        console.log('Shows', this.types);
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

export default Show;
