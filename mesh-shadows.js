AFRAME.registerComponent('mesh-shadows', {
    init: function(){
        this.el.addEventListener('model-loaded', ()=>{
            const el = this.el;
            const obj = el.getObject3D('mesh');
          obj.traverse(function(node){
                if(node.isMesh){
                    node.castShadow = true;
                    node.receiveShadow=true;
                    node.material.shadowSide = 1;
                    node.material.roughness = 0;

                    if(node.material.map){
                        node.material.map.encoding = THREE.LinearEncoding;// prevents dark rendering of mesh
                    };
                  
                  if(node.name==='Cube'){
                    node.material.color=new THREE.Color( 0x4488DD );
                  }
                }
            });
        });
    },
});
