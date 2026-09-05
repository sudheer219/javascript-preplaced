const users = [
  { id: 1, name: "Asha", email: "asha@acme.com" },
  { id: 2, name: "Ravi", email: "ravi@acme.com" },
  { id: 3, name: "Mina", email: "mina@acme.com" }
];


function searchUserByEmail(users, inputEmail){
    const normalizedEmail = inputEmail.toLowerCase();
    const user = users.find((user) => user.email.toLowerCase() === normalizedEmail)
    
    if(user === undefined){
        return null
    }   
    return user

}

const findUserWithEmail = searchUserByEmail(users, "RAVI@acme.com");
console.log(findUserWithEmail);
