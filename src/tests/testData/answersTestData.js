import Answers from '../../models/Answers';
import { uIds, aIds, qIds } from './dataIds';

const { uid1, uid2, uid3, uid4, uid5 } = uIds;
const { aid1, aid2, aid3, aid4, aid5, aid6, aid7, aid8 } = aIds;
const { id1, id2, id3, id4, id5 } = qIds;

async function createAnswers() {
    const testAnswers = [
        {
            _id: aid1,
            userId: uid1,
            questionId: id1,
            answer: 'First answer for question 1',
            upvotes: [uid2, uid3],
            downvotes: [uid4, uid5],
        },
        {
            _id: aid2,
            userId: uid2,
            questionId: id1,
            answer: 'Another answer for question 1',
            upvotes: [uid2, uid3, uid5],
            downvotes: [uid1],
        },
        {
            _id: aid3,
            userId: uid3,
            questionId: id1,
            answer: 'Yet another answer for question 1',
            upvotes: [uid1],
            downvotes: [uid2, uid4],
        },
        {
            _id: aid4,
            userId: uid4,
            questionId: id2,
            answer: 'Answer for question 2',
            upvotes: [uid1, uid2, uid5],
            downvotes: [uid3, uid4],
        },
        {
            _id: aid5,
            userId: uid5,
            questionId: id2,
            answer: 'Answer for question 2',
            upvotes: [uid1, uid2, uid3, uid4, uid5],
            downvotes: [],
        },
        {
            _id: aid6,
            userId: uid1,
            questionId: id3,
            answer: 'Answer for question 3',
            upvotes: [],
            downvotes: [uid1, uid2, uid3, uid4, uid5],
        },
        {
            _id: aid7,
            userId: uid2,
            questionId: id4,
            answer: 'Answer for question 4',
            upvotes: [],
            downvotes: [],
        },
        {
            _id: aid8,
            userId: uid3,
            questionId: id5,
            answer: 'Answer for question 5',
            upvotes: [],
            downvotes: [],
        },
    ];
    await Answers.insertMany(testAnswers);
}
async function deleteAnswers() {
    await Answers.deleteMany({});
}
export { createAnswers, deleteAnswers };
