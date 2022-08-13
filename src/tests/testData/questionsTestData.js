import Questions from '../../models/Questions';
import { uIds, aIds, qIds } from './dataIds';

const { uid1, uid2, uid3, uid4, uid5 } = uIds;
const { aid1, aid4 } = aIds;
const { id1, id2, id3, id4, id5 } = qIds;

async function createQuestions() {
    const testQuestions = [
        {
            _id: id1,
            userId: uid1,
            title: 'Question One',
            description: 'This is a description of question one',
            preferedAnswer: aid1,
        },
        {
            _id: id2,
            userId: uid2,
            title: 'Question Two',
            description: 'This is a description of question two',
            preferedAnswer: aid4,
        },
        {
            _id: id3,
            userId: uid3,
            title: 'Question Three',
            description: 'This is a description of question three',
            preferedAnswer: '',
        },
        {
            _id: id4,
            userId: uid4,
            title: 'Question Four',
            description: 'This is a description of question four',
            preferedAnswer: '',
        },
        {
            _id: id5,
            userId: uid5,
            title: 'Question Five',
            description: 'This is a description of question five',
            preferedAnswer: '',
        },
    ];
    await Questions.insertMany(testQuestions);
}
async function deleteQuestions() {
    await Questions.deleteMany({});
}
export { createQuestions, deleteQuestions };
