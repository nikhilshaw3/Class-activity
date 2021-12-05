AFRAME.registerComponent("tour",{
    schema:{
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"#card1"}
    },
    init:function(){
        this.placeContainer = this.el;
        this.createCards()
    },
    tick:function(){
        const {state} = this.el.getAttribute("tour")
        if(state === "view"){
            this.hideEl([this.placeContainer])
            this.showView()
        }
    },
    update:function(){
        window.addEventListener("keydown",e=>{
            if(e.key === "ArrowUp"){
                if((this.data.zoomAspectRatio<=10 && this.data.state === "view") || 
                (this.data.zoomAspectRatio<=10 && this.data.state === "change-view")){
                    this.data.zoomAspectRatio+=0.002
                    this.cameraEl.setAttribute("zoom",this.data.zoomAspectRatio)
        }
        }

        if(e.key === "ArrowDown"){
            if((this.data.zoomAspectRatio>=1 && this.data.state === "view") || 
            (this.data.zoomAspectRatio>=1 && this.data.state === "change-view")){
                this.data.zoomAspectRatio-=0.002
                this.cameraEl.setAttribute("zoom",this.data.zoomAspectRatio)
    }
    }})

  },
    hideEl:function(elList){
        elList.map(el=>{
            el.setAttribute("visible",false)
        })
    },
    showView:function(){
        const {selectedCard} = this.data
        console.log(selectedCard)
        const skyEl = document.querySelector("#main-container")
        
        skyEl.setAttribute("material",{
            src: `./assets/360_images/${selectedCard}/place-0.jpg`,
            color: "white"
        })
    },
    createCards:function(){
        const tumbnailsRef = [
        {
            id:"taj-mahal",
            title:"Taj Mahal",
            url:"./assets/thumbnails/taj_mahal.png"
         },{
            id:"eiffel-tower",
            title:"Eiffel Tower",
            url:"./assets/thumbnails/eiffel_tower.png"
         },{
            id:"new-york-city",
            title:"New York",
            url:"./assets/thumbnails/new_york_city.png"
         },{
            id:"budapest",
            title:"Budapest",
            url:"./assets/thumbnails/budapest.jpg"
         }
        ]

        let previousXPosition = -60

        for(var item of tumbnailsRef){
            const posX = previousXPosition+25
            const posY = 10
            const posZ = -40
            const position = {x:posX , y:posY , z:posZ}
            previousXPosition = posX
            const borderEl = this.createBorder(position,item.id)
            const thumbnail = this.createThumbnail(item)
            borderEl.appendChild(thumbnail)
            const titleEl = this.createTitleEl(position,item)
            borderEl.appendChild(titleEl)
            this.placeContainer.append(borderEl)
        }
    },
    createBorder:function(position,id){
    const entityEl = document.createElement("a-entity")
    entityEl.setAttribute("id",id)
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry",{
        primitive:"ring",
        radiusInner:9,
        radiusOuter:10
    })
    entityEl.setAttribute("position",position)
    entityEl.setAttribute("material",{
        color:"#0077cc",
        opacity:1
    })

    entityEl.setAttribute("cursor-listener",{})

    return entityEl
    },

    createThumbnail:function(item){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("geometry",{primitive:"circle",radius:9})
        entityEl.setAttribute("material",{src:item.url})
        return entityEl
    },

    

    createTitleEl:function(position,item){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("text",{
            font:"exo2bold",
            align:"center",
            width:"70",
            color:"#e65100" ,
            value:item.title
        })
        const positionEl = position
        positionEl.y = -20
        entityEl.setAttribute("position",positionEl)
        entityEl.setAttribute("visible",true)

        return entityEl
    }
    
})