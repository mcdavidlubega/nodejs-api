import Comments from '../../models/Comments';
import { uIds, aIds, cIds } from './dataIds';

const { uid1, uid2, uid3, uid4, uid5 } = uIds;
const { aid1, aid2, aid4, aid5, aid6 } = aIds;
// eslint-disable-next-line prettier/prettier
const {
    cid1,
    cid2,
    cid3,
    cid4,
    cid5,
    cid6,
    cid7,
    cid8,
    cid9,
    cid10,
    cid11,
    cid12,
    cid13,
} = cIds;
async function createComments() {
    const testComments = [
        {
            _id: cid1,
            answerId: aid1,
            comment: 'This is a comment on answer for question 1',
            userId: uid1,
        },
        {
            _id: cid2,
            answerId: aid1,
            comment: 'This is another  comment on answer for question 1',
            userId: uid2,
        },
        {
            _id: cid3,
            answerId: aid1,
            comment: 'This is yet another comment on answer for question 1',
            userId: uid3,
        },
        {
            _id: cid4,
            answerId: aid2,
            comment: 'This is a comment on answer for question 2',
            userId: uid4,
        },
        {
            _id: cid5,
            answerId: aid2,
            comment: 'This is another comment on answer for question 2',
            userId: uid5,
        },
        {
            _id: cid6,
            answerId: aid2,
            comment: 'This is a comment on answer for question',
            userId: uid1,
        },
        {
            _id: cid7,
            answerId: aid4,
            comment: 'This is a comment on answer for question 4',
            userId: uid2,
        },
        {
            _id: cid8,
            answerId: aid5,
            comment: 'This is another comment on answer for question 4',
            userId: uid3,
        },
        {
            _id: cid9,
            answerId: aid4,
            comment: 'This is a comment on answer for question 5',
            userId: uid4,
        },
        {
            _id: cid10,
            answerId: aid6,
            comment: 'This is a comment on answer for question 6',
            userId: uid5,
        },
        {
            _id: cid11,
            answerId: aid6,
            comment: 'This is a comment on answer for question 6',
            userId: uid1,
        },
        {
            _id: cid12,
            answerId: aid6,
            comment: 'This is a comment on answer for question 6',
            userId: uid2,
        },
        {
            _id: cid13,
            answerId: aid6,
            comment: 'This is a comment on answer for question 6',
            userId: uid3,
        },
    ];
    await Comments.insertMany(testComments);
}
async function deleteComments() {
    await Comments.deleteMany({});
}
export { createComments, deleteComments };
