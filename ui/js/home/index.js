require("../../sass/main.scss");
//require('../../src/close');

//require('../../src/send');

require([
  "../components/navigation"
  ], (Navigation) => {
    new Navigation();
  });

console.log("Home...");