let interval;

setInt();



function setInt(){
  // clear the original interval if it exists
  if (interval) clearInterval(interval);
  
  // get the data 
  talk_back({ method: "getAll"}, (data)=>{
    console.log(data)
    document.getElementById('root').innerHTML = create_windows(data)
  })

  // set a new interval for every min
  interval = setInterval(()=>{
    talk_back({ method: "getAll"}, (data)=>{
      console.log(data)
      document.getElementById('root').innerHTML = create_windows(data)
    })
  }, 60000) // every min reload data
}