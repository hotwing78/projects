let request = new XMLHttpRequest();
request.addEventListener('load',function(){
  console.log(this.responseText);
})

request.open('Get','https://randomuser.me/api/');
request.send();
window.addEventListener('load',function(){
  console.log('Page load Completed')
})
