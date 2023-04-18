AFRAME.registerComponent('animation-list', {
    schema:{
      feedbackTxt:{type:'selector', default:'#feedback'},
      pickup:{type:'selector', default:'#pickup'},
      pickedup:{default:'empty'},
      roboarm:{type:'selector', default:'#Roboarm'}
    },
    init: function(){
      let counter = 0;
      const el = this.el;
      const data = this.data;
        this.el.addEventListener('model-loaded', ()=>{
            const obj = el.getObject3D('mesh');
          
          // console.log("Components", el.components['animation-mixer']);

            obj.traverse(function(node){
              if(node.animations.length>0){
                node.animations.forEach(function(animation){
                  if(animation.tracks.length>10){
                    console.log("Available Animations:", animation.name);
                  }
                });                
              };
            });
        });
      
      this.el.addEventListener('animation-finished', ()=>{
        console.log("Animation is done!");
        if(counter===0){
          document.getElementById("feedback").innerHTML= "Animation 1 is done!";
          this.data.roboarm.setAttribute('animation-mixer', 'clip', 'Panda_Take');// play model animation
          this.data.roboarm.setAttribute('animation-mixer', 'loop', 'once');
          this.data.pickup.setAttribute('visible', false);
          this.data.pickedup.visible=true;
          counter++;
        }else{
          document.getElementById("feedback").innerHTML= "All Animations complete!";
        }
        
      });
      
      this.el.addEventListener('animation-loop', ()=>{
        console.log("A loop is done!");
        document.getElementById("feedback").innerHTML= "A Loop has completed";
      });
      
    },
  
  startExperience: function(){
    document.getElementById("feedback").innerHTML= "Playing Animations";
    this.data.roboarm.setAttribute('animation-mixer', 'timeScale', 1);
  },
  
  resetAnimations: function(){
    document.getElementById("feedback").innerHTML= "Animations have been Reset!";
    this.data.roboarm.setAttribute('animation-mixer', 'clip', 'Panda_Reach');// play model animation
    this.data.roboarm.setAttribute('animation-mixer', 'loop', 'once');
    this.data.roboarm.setAttribute('animation-mixer', 'timeScale', 0);
    this.data.pickup.setAttribute('visible', true);
    this.data.pickedup.visible=false;
    this.init(counter=0);
  }
});
