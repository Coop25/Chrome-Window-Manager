let interval;

setInt();



function setInt(){
  // clear the original interval if it exists
  if (interval) clearInterval(interval);
  
  // get the data 
  get_all((data)=>{
    console.log(data)
    document.getElementById('root').innerHTML = create_windows(data)
  })

  // set a new interval for every min
  interval = setInterval(()=>{
    get_all((data)=>{
      console.log(data)
      document.getElementById('root').innerHTML = create_windows(data)
    })
  }, 60000) // every min reload data
}