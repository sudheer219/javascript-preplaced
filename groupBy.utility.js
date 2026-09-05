const users = [
    { id: 1, name: 'Sudheer', department: 'UX' },
    { id: 2, name: 'John', department: 'Engineering' },
    { id: 3, name: 'Alice', department: 'UX' },
    { id: 4, name: 'Bob', department: 'Engineering' }
]

// need a utility fn groupBy(users, "department")


// expected output
/* 
{
  UX: [
    { id: 1, name: "Sudheer", department: "UX" },
    { id: 3, name: "Alice", department: "UX" }
  ],
  Engineering: [
    { id: 2, name: "John", department: "Engineering" },
    { id: 4, name: "Bob", department: "Engineering" }
  ]
} */


//we want something like this
/* {
    UX: [],
    Engineering: []
} */


    // let's start with a simple function that takes an array of objects and a key to group by

    // { id: 1, name: 'Sudheer', department: 'UX' }


  /*   const result={};

    console.log(result['UX']);
    
    for(const user of users){
        // let's fetch earch user details
       // console.log('User details', user)
        let groupKey = user.department;
    //    console.log(groupKey);

       result[groupKey] = [];
       //console.log(result);

       result[groupKey].push(user);

    }
       console.log(result['UX']);
 */

/* for (const user of users){
    if(user.name === "John"){
        console.log(user);        
    }
} */

    const user = users.find((user) => user.name === "John")


    
