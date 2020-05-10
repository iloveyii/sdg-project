import Model from './Model';

class ActiveRecord extends Model {
    mode = 'create';
    _uploadProgress = 0;
    _forceUpdate = () => null;
    _form = {};
    _subscribers = [];
    _selectList = {
        genre: [],
        admin: []
    };

    constructor(name) {
        super(name);
        this.debug = true;
        this.setUploadProgress = this.setUploadProgress.bind(this);
    }

    get __class() {
        return 'ActiveRecord';
    }

    subscribe(method) {
        if (Array.isArray(method)) {
            this._subscribers = [...this._subscribers, ...method];
        } else {
            this._subscribers.push(method);
        }
        return this;
    }

    forceUpdateOnSubscribers = (method) => {
        this._subscribers.includes(method) && this.forceUpdate();
    }

    set forceUpdate(f) {
        this._forceUpdate = f;
    }

    set form(form) {
        this._form = {};
        for (let key in form) {
            this._form[key] = form[key];
        }
        return this;
    }

    get form() {
        return this._form;
    }

    setUploadProgress(value) {
        this._uploadProgress = value;
        if(value > 95) this.resetForm();
        this._forceUpdate();
    }

    get uploadProgress() {
        return this._uploadProgress;
    }


    /**
     * Avoid problem of bound to unbound controls on form
     */
    resetForm() {
        Object.keys(this.form).forEach(key => {
            this._form[key] = '';
        });
        this._uploadProgress = 0;
        this._forceUpdate();
    }

    submitForm(createAction, updateAction) {
        const formData = new FormData();
        Object.keys(this.form).map(key => {
            formData.append(key, this.form[key]);
        });

        this.hasId ? updateAction({formData, action: this.setUploadProgress}) : createAction({
            formData,
            action: this.setUploadProgress
        });
    }

    get hasId() {
        if (this.form['id'] && this.form['id'].length > 0) return true;
        if (this.form['_id'] && this.form['_id'].length > 0) return true;
        return false;
    }

    // INTERFACE Select
    getSelectList = (attr) => {
        return this._selectList[attr] ? this._selectList[attr] : [];
    };

    // sets attr in form
    onSelect = (item, attr) => {
        console.log('Select ', item, attr);
        this.form[attr] = item.value;
    };

    //@return {}
    selected = (attr) => {
        console.log('Select selected', attr);
        if(!attr) {
            return {value: 'na', label: 'NA'};
        }
        const found = this._selectList[attr].find(item => item.value == this.form[attr]);

        if(!found) {
            return this._selectList[attr][0];
        }

        return found;
    }
}

export default ActiveRecord;
