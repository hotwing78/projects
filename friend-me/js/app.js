function addFriend(){
  let friends = document.getElementById('friends');
  let child = document.createElement('div');

  child.innerHTML = `
      <div class ='friend'>
        <img src ='${person.picture.medium}'>
        <div class ='info'>
          <h2>${person.name.first}</h2>
          <h3>added on June 22, 2016</h3>
        </div>
      </div>`;

    friends.appendChild(child);
  
}

let request = new XMLHttpRequest();
request.addEventListener('load',function(){
  console.log(this.responseText);
})

request.open('Get','https://randomuser.me/api/');
request.send();
window.addEventListener('load',function(){
  console.log('Page load Completed')
})
