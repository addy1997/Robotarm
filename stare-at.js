/* This is just to play with the idea of making the rotation
based on the position of the cube you want to target.*/


AFRAME.registerComponent('stare-at', {
    
    schema:{
        targetObj:{default:'empty'},// what do we want to track/follow/stare at - public
        followObj:{default:'empty'},// we'll use targetObj to get the selector here - private
        objectPos:{default:'empty'},// this will be updated on the fly - private
        lookWith:{default:'empty'}, // this comes from the 'load-rig' component - private
        modelReady:{type:'boolean',default:'false'}, // variable for use in this component - private
    },
  
    init:function(){
      let el = this.el;
      let data = this.data;
      
      el.addEventListener('model-loaded', ()=>{
        data.modelReady = true;
        data.followObj = document.querySelector(data.targetObj);
        console.log("what am I looking with?", data.lookWith.name+" "+data.lookWith.type);
        console.log("The object to follow:", data.followObj.id);
        let position = new THREE.Vector3();
        console.log("Object's World Position:", data.followObj.object3D.getWorldPosition(position)); 
      });
      
    },
    
    tick: function(){
      let data = this.data;
      
      if(data.modelReady){
        data.objectPos = data.followObj.object3D.getWorldPosition(new THREE.Vector3());
        data.lookWith.lookAt(data.objectPos.x, data.objectPos.y+0.1, data.objectPos.z);
      }

    }
    
});
