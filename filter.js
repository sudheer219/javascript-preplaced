const users = [
  { id: 1, name: "Asha", email: "asha@gmail.com" },
  { id: 2, name: "Ravi", email: "ravi@acme.com" },
  { id: 3, name: "Mina", email: "mina@acme.com" }
];


const acmeUsers = users.filter((user) => {
    return user.email.includes("acme.com");
})

console.log("New acmeUsers array is ", acmeUsers);
