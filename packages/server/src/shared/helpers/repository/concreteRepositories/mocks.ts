import {CalculationHistory, UserList} from "@calculator/common";

export const mockedHistory: CalculationHistory = [
    {id: "1", expressionResult: "0", expression: "2-2", createdAt: new Date("2023-04-15T08:30:00")},
    {id: "2", expressionResult: "4", expression: "2+2", createdAt: new Date("2022-11-02T18:45:00")},
    {id: "3", expressionResult: "4", expression: "2*2", createdAt: new Date("2020-07-20T12:15:00")},
    {id: "4", expressionResult: "1", expression: "2/2", createdAt: new Date("2023-01-08T09:00:00")},
    {id: "5", expressionResult: "4", expression: "2^2", createdAt: new Date("2023-01-08T09:00:00")},
    {id: "6", expressionResult: "5", expression: "2+3", createdAt: new Date("2022-06-30T21:30:00")},
    {id: "7", expressionResult: "6", expression: "2+4", createdAt: new Date("2021-06-30T21:30:00")},
];

export const mockedUsers: UserList = [
    {
        id: '1',
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashedPassword1',
    },
    {
        id: '2',
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'hashedPassword2',
    },
    {
        id: '3',
        username: 'alice_miller',
        email: 'alice@example.com',
        password: 'hashedPassword3',
    },
    {
        id: '4',
        username: 'bob_jones',
        email: 'bob@example.com',
        password: 'hashedPassword4',
    },
    {
        id: '5',
        username: 'emma_white',
        email: 'emma@example.com',
        password: 'hashedPassword5',
    },
    {
        id: '6',
        username: 'david_brown',
        email: 'david@example.com',
        password: 'hashedPassword6',
    },
    {
        id: '7',
        username: 'olivia_taylor',
        email: 'olivia@example.com',
        password: 'hashedPassword7',
    },
    {
        id: '8',
        username: 'liam_clark',
        email: 'liam@example.com',
        password: 'hashedPassword8',
    },
    {
        id: '9',
        username: 'ava_anderson',
        email: 'ava@example.com',
        password: 'hashedPassword9',
    },
    {
        id: '10',
        username: 'noah_martinez',
        email: 'noah@example.com',
        password: 'hashedPassword10',
    },
];

