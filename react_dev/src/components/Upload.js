import React, {useContext} from 'react';
import axios from 'axios';
import {BasicContext} from "../contexts/BasicContextProvider";
import api from "../api/basic";


const Upload = () => {
    const fileRef = React.createRef();
    const {basic, dispatch} = useContext(BasicContext);

    const uploadFile = () => {
        const formData = new FormData();
        const files = fileRef.current.files;
        formData.append("fcs_file", files[0]);
        axios.post('http://localhost/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(data => {
            console.log('File uploaded');
            api.read().then(basic => {
                if (basic) {
                    dispatch({
                        type: 'ADD_BASIC',
                        payload: {channels: basic}
                    });
                }
            })
        }).catch(err => console.log('Error occurred ', err))
    };

    return (
        <div className="row">
            <div className="col-md-12 order-md-0">
                <h2 className="mb-3">Upload FCS File</h2>
                <form method="post" encType="multipart/form-data" action="/api/upload">
                    <div className="row">
                        <div className="col-md-12 mb-3">

                            <div className="input-group">
                                <div className="custom-file">
                                    <input ref={fileRef} type="file" className="custom-file-input" id="fcs_file"
                                           name="fcs_file"
                                           multiple
                                           aria-describedby="fcs_file"/>
                                    <label className="custom-file-label" htmlFor="fcs_file">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <input className="btn btn-outline-secondary" type="button" id="upload"
                                           value="Upload" onClick={(e) => {
                                        e.preventDefault();
                                        uploadFile();
                                    }}/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr className="mb-4"/>
                </form>
            </div>
        </div>
    )
}

export default Upload;
