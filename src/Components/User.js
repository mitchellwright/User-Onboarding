import React from 'react';


const User = ({ name, email, id, createdDate }) => {

    return (
        <div>
            <p>{name}</p>
            <p>{email}</p>
            <p>{id}</p>
            <p>{createdDate}</p>
        </div>
    );
};


export default User;