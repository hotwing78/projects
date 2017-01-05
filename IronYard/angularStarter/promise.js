//Promise examples
function primp(person){
  return person.results[0];
}
function greet(person){
  console.log(`hi my name is ${person.name.first}`);
}
function printWork(){
  console.log('It worked!!!');
}

window.addEventListener('load', function(){
  //getEm is a promise object
  let getEm = new Promise(function(success,fail){
    let request = XMLHttpRequest();
    request.addEventListener('load',function(){
      let result = JSON.parse(request.responseText);
      success(result);
    });
    request.open('GET','https://randomuser.me/api/');
    request.send();
  });
  //Once promise is complete does this.
  //getEm.then(primp).then(whatever) also works. it can be chained.
  getEm.then(primp);

  getEm.then(function(){
    console.log(printWork);
  })

  getEm.then(function(){
    console.log('My work here is done');
  })

  //Catch functions handles errors in the promise
  getEm.catch(function(){
    console.error('uh oh spagettios');
  })
});
