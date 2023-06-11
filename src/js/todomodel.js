async function getAllTodos(){
    await fetch('https://assets.breatheco.de/apis/fake/todos/user/william17', {
        
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      })

    const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/william17', {
        
        method: "GET",
        // body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      const data = await response.json();
      console.log(data); 

// {label:"Todo here", done: false}
// map, maps only label here 
      // return data.map((todoInfo)=>{
      //   return todoInfo.label;
      // })

      return data;
}

async function updateTodos(a){
    // let todoToUpdate = a.map((todoitem)=>{
    //     return {
    //         label:todoitem, 
    //         done:false
    //     } 
    //     // return a new object 
    // })
    await fetch('https://assets.breatheco.de/apis/fake/todos/user/minerva', {
        
        method: "PUT",
        // body: JSON.stringify(todoToUpdate),
        body: JSON.stringify(a),
        headers: {
          "Content-Type": "application/json"
        }
    })
}


export{getAllTodos,updateTodos}