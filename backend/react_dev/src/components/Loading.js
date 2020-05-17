import React from 'react';
import {apiServer} from "../settings/constants";

const Loading = () => {
    const imageUrl = apiServer + '/static/img/loading.gif';
    return (
        <img src={imageUrl} width="150" alt="Loading..."/>
    )
};

export default Loading;
