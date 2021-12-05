AFRAME.registerComponent("cursor-listener",{
    schema:{
        selectItemId:{default:"",type:"string"}
    },
    init:function(){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents()
    },
    handlePlacelistState:function(){
        const id = this.el.getAttribute("id")
        const placesId = ["taj-mahal","eiffel-tower","new-york-city","budapest"]

        if(placesId.includes(id)){
            const placeContainer = document.querySelector("#placeContainer")
            placeContainer.setAttribute("cursor-listener",{
                selectItemId:id
            })
            this.el.setAttribute("material",{
                color:"#d76b30",
                opacity:1,
            })
        }
    },
    handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlacelistState()
        })
    },
    handleClickEvents:function(){
        this.el.addEventListener("click",evt=>{
            const placeContainer = document.querySelector("#placeContainer")
            const {state} = placeContainer.getAttribute("tour")
            if(state === "places-list"){
                const id = this.el.getAttribute("id")
                const placesId = [
                    "taj-mahal",
                    "budapest",
                    "eiffel-tower",
                    "new-york-city"
                ]
                if(placesId.includes(id)){
                    placeContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard:id
                    })
                }
                
            }
            if(state === "view"){
                this.handleViewState()
            }
            if(state === "change-view"){
                this.handleViewState()
            }
            console.log(state)
        })
    
    },

    handleViewState:function(){
        console.log("handleViewState")
        const el = this.el
        const id = el.getAttribute("id")
        const placeContainer = document.querySelector("#placeContainer")
        const {selectItemId} = placeContainer.getAttribute("cursor-listener")
        const sideViewPlaceId = ["place-1","place-2","place-3","place-4"]

        if(sideViewPlaceId.includes(id)){
            placeContainer.setAttribute("tour",{state:"change-view"})
            const skyEl = document.querySelector("#main-container")
            skyEl.setAttribute("material",{
                src:`./assets/360_images/${selectItemId}/${id}.jpg`,
                color:"#fff"
            })
        }
    },

    handleMouseLeaveEvents:function(){
        this.el.addEventListener("mouseleave",()=>{
            const{selectItemId} = this.data
            if(selectItemId){
                const el = document.querySelector(`#${selectItemId}`)
                const id = el.getAttribute("id")
                
                if(id == selectItemId){
                    el.setAttribute("material",{
                        color:"#0077cc",
                        opacity:1,
                    })
                }
            }
        })
    }
})