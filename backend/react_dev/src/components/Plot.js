import React from 'react';
import {data_plotting, data_ml} from "../settings/mocks";

const Plot = (props) => {
    const {image, data_section} = props;
    const data = data_section === 'data_ml' ? data_ml : data_plotting;
    const {heading, p} = data[image.id] ? data[image.id] : {heading: 'Heading', p: 'Para'};
    const title = image.id[0].toUpperCase() + image.id.slice(1).split('_').join(" ");
    return (
        <div className={data_section === 'data_ml' ? "col-sm-12 py-2" : "col-sm-6 py-2"}>
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-8">
                            <img className="img-fluid" src={image.src} alt={image.id}/>
                        </div>
                        <div className="col-sm-4">
                            <h5 className="card-title">{heading}</h5>
                            <p className="card-text">{p}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plot;
