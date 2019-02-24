import $ from 'jquery';

export default class GUI {
  constructor(manager, GOL){
    this.manager = manager;
    this.GOL = GOL;

    this.setup();
  }

  setup(){
    $('.clearbutton').click(()=>{
      this.GOL.clear();
    });

    $('.pausebutton').click(()=>{
      this.GOL.pause();
    });

    $('.resumebutton').click(()=>{
      this.GOL.resume();
    });
  }
}
