const users = [
  { id: 1, name: "Asha", email: "asha@acme.com" },
  { id: 2, name: "Ravi", email: "ravi@acme1.com" },
  { id: 3, name: "Mina", email: "mina@acme.com" }
];

function magicFilter(userList, filterCondition){
    const filteredList = [];

    for(const user of userList){
        const keepintoList = filterCondition(user);
        if(keepintoList){
            filteredList.push(user)
        } 
    }

    return filteredList;
}

function isEmailPresent(user){
    const normaliseEmail = user.email.toLowerCase();
    return normaliseEmail.includes("acme.com");

}

const listToFilter = magicFilter(users, isEmailPresent);
console.log(listToFilter);
