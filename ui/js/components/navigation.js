class Navigation {
  constructor() {
    console.log("Navigation loaded");
    $('li').on('click',function(e){
      console.log('i was clicked')
    })
  }
}

export default Navigation;