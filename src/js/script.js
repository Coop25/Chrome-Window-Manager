const root = document.getElementById('root');
let interval;

refresh_all();




// prevent Drag scroll to use middle mouse for delete tab operation
document.body.onmousedown = function(e) {
  if(e.button == 1) {
      e.preventDefault();
      return false;
  }
}
