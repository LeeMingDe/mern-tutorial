import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'something',
            image: 'http://www.mandysam.com/img/random.jpg',
            places: 3
        }
    ];
    return <UsersList items={USERS} />;
};

export default Users;