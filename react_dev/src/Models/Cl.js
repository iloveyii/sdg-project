import ActiveRecord from './ActiveRecord';

class Cl extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            plots: {},
        };
        console.log('Plots', this.types);
    }
}

export default Cl;
