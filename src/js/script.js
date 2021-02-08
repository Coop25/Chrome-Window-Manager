const root = document.getElementById('root');
let interval;

setInt();



function setInt(){
  // clear the original interval if it exists
  if (interval) clearInterval(interval);
  
  // get the data 
  get_all((data)=>{
    console.log(data)
    create_windows(data)
  })

  // set a new interval for every min
  interval = setInterval(()=>{
    get_all((data)=>{
      console.log(data)
      create_windows(data)
    })
  }, 60000) // every min reload data
}


// prevent Drag scroll to use middle mouse for delete tab operation
document.body.onmousedown = function(e) {
  if(e.button == 1) {
      e.preventDefault();
      return false;
  }
}
