const users = [
  { id: 1, name: "Asha", email: "asha@gmail.com" },
  { id: 2, name: "Ravi", email: "ravi@acme.com" },
  { id: 3, name: "Mina", email: "mina@acme.com" }
];


const newUsers = [];

for(const user of users){
    const normalizedEmail = user.email.toLowerCase();
    if(normalizedEmail.includes("acme.com")){
        newUsers.push(user)
    }
    
}

console.log(newUsers);
