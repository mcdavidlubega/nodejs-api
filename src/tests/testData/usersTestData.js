import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Users from '../../models/Users';
import { uIds } from './dataIds';

const { uid1, uid2, uid3, uid4, uid5 } = uIds;

async function createUsers() {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash('12345678', salt);
    const testUsers = [
        {
            _id: uid1,
            username: 'user1',
            password: hashedPass,
            email: 'user1@gmail.com',
            role: 'user',
        },
        {
            _id: uid2,
            username: 'user2',
            email: 'user2@gmail.com',
            password: hashedPass,
            role: 'user',
        },
        {
            _id: uid3,
            username: 'user3',
            email: 'user3@gmail.com',
            password: hashedPass,
            role: 'user',
        },
        {
            _id: uid4,
            username: 'user4',
            email: 'user4@gmail.com',
            password: hashedPass,
            role: 'user',
        },
        {
            _id: uid5,
            username: 'user5',
            email: 'user5@gmail.com',
            password: hashedPass,
            role: 'user',
        },
    ];
    await Users.insertMany(testUsers);
}
async function deleteUsers() {
    await Users.deleteMany({});
}
export { createUsers, deleteUsers };
