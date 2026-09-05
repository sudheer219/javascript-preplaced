const users = [
    { id: 1, name: 'Sudheer', department: 'UX' },
    { id: 2, name: 'John', department: 'Engineering' },
    { id: 3, name: 'Alice', department: 'UX' },
    { id: 4, name: 'Bob', department: 'Engineering' }
];

/* 
const result = users.find(function (user){
    return user.name === "Bob"
})

console.log(result); */

function searchUser(users, inputName){
    const user = users.find((user) => user.name === inputName);

    if(user.name === undefined){
        return "user is not found"
    } else {
        return user.name;
    }
}

const findName = searchUser(users, "Sudheer");
console.log(findName);