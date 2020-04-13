import React from 'react';

const Upload = (props) => {

    return (
        <div className="row">
            <div className="col-md-12 order-md-0">
                <h4 className="mb-3">Upload FCS File</h4>
                <form method="post" encType="multipart/form-data" action="/api/upload">
                    <div className="row">
                        <div className="col-md-12 mb-3">

                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="fcs_file"
                                           name="fcs_file"
                                           aria-describedby="fcs_file"/>
                                    <label className="custom-file-label" htmlFor="fcs_file">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <input className="btn btn-outline-secondary" type="submit" id="upload"
                                           value="Upload"/>
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
