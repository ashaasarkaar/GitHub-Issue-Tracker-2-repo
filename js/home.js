
let currentTab = "all";
const allBtns = ['all', 'open', 'closed'];
const activeTab = ["bg-[#4A00FF]", "text-white"];
// const inActiveTab = ["bg-transparent", "text-neutral/50"];

  //1. Global Declare to get all the parent container id
        const AllCardsContainer = $("all-card-container");
        const openCardsContainer = $("open-card-container");
        const closeCardsContainer = $("close-card-container");

$("all-btn").classList.add(...activeTab);

//Manage Spinner START
const spinnerId = $("spinner");
const manageSpinner = (status) => {
    if (status) {
        spinnerId.classList.remove("hidden");
    } else {
        spinnerId.classList.add("hidden");
    }
};
//Manage Spinner END

//Function For Changing Tab START
const showTab = (tab) => {

    AllCardsContainer.classList.add("hidden");
    openCardsContainer.classList.add("hidden");
    closeCardsContainer.classList.add("hidden");

    if (tab === "all") {
        AllCardsContainer.classList.remove("hidden");
    }
    else if (tab === "open") {
        openCardsContainer.classList.remove("hidden");
    }
    else {
        closeCardsContainer.classList.remove("hidden");
    }
};
//Function For Changing Tab END


// Function For Remove Active Class START
const removeActiveClass = () => {
    const tabs = document.querySelectorAll(".btn");
    tabs.forEach((tab) => {
        tab.classList.remove(...activeTab);
    });
}
// Function For Remove Active Class END

//Design For Three Button START
allBtns.forEach((button) => {

    const btns = $(button + "-btn");
    btns.addEventListener("click", () => {
         currentTab = button; //for initially to set as a default button = all
        removeActiveClass();

            btns.classList.add(...activeTab);

            showTab(button);
            updateCount();

    })
})
//Design For Three Button END

//All Cards Load function START
const loadAllCards = () => {
    manageSpinner(true)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            displayAllCards(data.data)
            
            
            showTab("all")  // first a deya jabe na load card ar por j kono jaigai deya jabe ba last a  ba akhane o call kora jai
            // updateCount()
        })
}
//All Load Display function


// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

//labels Array START
    const allLabels = (array) => {
        
        return array.map((label) =>{
           return `<button class = "rounded-full ${
                 label === 'bug'
            ? 'btn btn-secondary btn-soft'
            : label === 'help wanted'
            ? 'btn btn-warning btn-soft'
            : label === 'enhancement'
            ? 'btn btn-accent btn-soft'
            : label === 'good first issue'
            ? 'btn btn-primary btn-soft'
            : 'btn btn-info btn-soft'
            }"
            >
            ${
                 label === 'bug'
            ? '<i class="fa-solid fa-bug"></i>'
            : label === 'help wanted'
            ? '<i class="fa-solid fa-life-ring"></i>'
            : label === 'enhancement'
            ? '<i class="fa-solid fa-burst"></i>'
            : label === 'good first issue'
            ? '<i class="fa-brands fa-gg"></i>'
            : '<i class="fa-solid fa-file"></i>'
            }
            ${label}
            </button>`
        })
        .join("");
    }
//labels Array END

//All Cards Display function START
const displayAllCards = (cards) =>{
    // manageSpinner(true)
    // console.log(cards)

      //1. get the parent container id
       
        //2. Empty Parent Container
        AllCardsContainer.innerHTML = '';
        openCardsContainer.innerHTML = '';
        closeCardsContainer.innerHTML = '';

    cards.forEach((card) => {
        // console.log(card)
    
        //3.create Child
        const div = document.createElement("div");

        div.innerHTML = `
             <div onclick="loadModalDetails(${card.id})" class="bg-base-100 shadow-lg rounded-2xl py-5 px-6 p-30 mt-3 space-y-3 border-t-4 
             ${card.status === 'open'
                ? 'border-green-500'
                : 'border-purple-500'
             }">

            <div class="top-part flex items-center justify-between">
                <img  src="./assets/${card.status === 'open'
                    ? 'Open-Status.png'
                    : 'Closed- Status .png'
                }">
                <button class="rounded-full btn 
                ${card.priority === 'high'
                    ? 'btn-secondary btn-soft'
                    : card.priority === 'medium'
                    ? 'btn-warning btn-soft'
                    : 'btn-soft'}">
                ${card.priority.toUpperCase()}
                </button>
            </div>

            <div class="middle-part space-y-2">
                <p class="font-semibold">${card.title}</p>
                <p class="text-[#64748B] text-sm">${card.description}</p>
            </div>

            <!-- Middle Two Button part START -->
            <div class="space-x-5 mt-5 flex items-center">
                ${allLabels(card.labels)}
            </div>
            <!-- Middle Two Button part END -->

            <div class="-mx-5">
                <div class="divider"></div>
            </div>

            
                <p class="text-[#64748B] text-sm">#1by ${card.author}</p>
                <p class="text-[#64748B] text-sm">${card.createdAt}</p>
            
        </div>
        `;
        //4.Append Child
        AllCardsContainer.append(div);

        const cloneCard = div.cloneNode(true);

        if(card.status === 'open'){
            openCardsContainer.append(cloneCard)
        }else{
            closeCardsContainer.append(cloneCard)
        }
    })
    manageSpinner(false);
    updateCount();
} 
//All Cards Display function END

//Load Modal Details START
const loadModalDetails = async(id) =>{
    const detailsUrl =  `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    console.log(detailsUrl);
    const resDetails = await fetch(detailsUrl);
    const dataDetails = await resDetails.json();
    displayModalDetails(dataDetails.data)
}
//Load Modal Details END

// "status": "success",
// "message": "Issue fetched successfully",
// "data": {
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"


//Display Modal Details START
const displayModalDetails = (details) =>{
    console.log(details)

    //1. get the parent container id
    const detailsContainer = $("modal_details_container");
    detailsContainer.innerHTML =`
                 <h1 class="text-xl font-bold">${details.title}</h1>

   <div class="flex items-center space-x-4">

    <button class="btn rounded-full text-xs h-6 text-white
        ${details.status === 'open'
            ? 'btn-success'
            : 'bg-purple-500'
        }
    ">${details.status}</button>

    <div class="flex items-center gap-1">
     <div class="bg-[#64748B] w-1 h-1 rounded-full"></div>
     <p class="text-[#64748B] text-xs">${details.status} by ${details.author}</p>   
    </div>

    <div class="flex items-center gap-1">
     <div class="bg-[#64748B] w-1 h-1 rounded-full"></div>
     <p class="text-[#64748B] text-xs">${details.updatedAt}</p>   
    </div>

   </div>

   <div class="flex space-x-3">
        ${allLabels(details.labels)}
   </div>

   <p class="text-[#64748B] text-sm">${details.description}</p>

   <div class="bg-base-200 p-5 rounded-xl">

    <div class="flex items-center justify-between">
        <p class="text-[#64748B] mb-1">Assignee:</p>
        <p class="text-[#64748B] mb-1">Priority:</p>
    </div>

    <div class="flex items-center justify-between">
        <p class="font-semibold">${details.assignee ? details.assignee : "No Author"}</p>
        <button class="text-white btn rounded-full h-6 text-md
        ${details.priority === 'high'
            ? 'btn-error'
            : details.priority === 'medium'
            ? 'btn-warning'
            : 'btn-neutral'
        }
        ">${details.priority}</button>
    </div>

   </div>
    `;
    $("modal_details").showModal();
}
//Display Modal Details END

//All Issues Count Section START
const updateCount = () =>{
const countID = $('count');
const allSectionLength = AllCardsContainer.children.length;
const openSectionLength = openCardsContainer.children.length;
const closedSectionLength = closeCardsContainer.children.length;

    const countIssue = {
        all: allSectionLength,
        open: openSectionLength,
        closed: closedSectionLength
    };
    countID.innerText = countIssue[currentTab];
}
//All Issues Count Section END



//Filter input-search Text START
const inputSearchId = $('input-search');
inputSearchId.addEventListener("keyup", (text) =>{
    const inputText = text.target.value.replace(/\s/g, "").toLowerCase();
    // console.log(inputText)
    if(inputText === ""){
        loadAllCards();
        return;
    }

    //Load Search Text API START
    const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputText}`;
    fetch(searchUrl)
    .then((searchRes) => searchRes.json())
    .then((searchData) => {
        // console.log(searchData.data)
        const titleFilterInput = searchData.data.filter((item) =>item.title.toLowerCase().replace(/\s/g, "").includes(inputText));
        //  const desFilterInput = searchData.data.filter((item) =>item.description.toLowerCase().replace(/\s/g, "").includes(inputText));
         displayAllCards(titleFilterInput)
        //  displayAllCards(desFilterInput)
    })
//Load Search Text API END
})
//Filter input-search Text END

loadAllCards();






