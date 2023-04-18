AFRAME.registerComponent('load-rig', {
    schema:{
        bone:{default:''}
    },
    
    init: function(){
      const el = this.el;
      const data = this.data;
      
        el.addEventListener('model-loaded', ()=>{
          
            const obj = el.getObject3D('mesh');
            let boneGrab = obj.getObjectByName(data.bone);// bone to use for stare-at
            let objectPickup = obj.getObjectByName('Cube');// model cube
            objectPickup.visible=false;// hide model cube
            el.setAttribute('stare-at','lookWith', boneGrab);// set properties for stare-at
            el.setAttribute('animation-list','pickedup', objectPickup);// set properties for animation-list
          
//             obj.traverse(function(node){
//                 if(node.isBone){
//                   console.log("Bone:", node.name);                  
//                 };
//             });
          
        });
    }  
});
