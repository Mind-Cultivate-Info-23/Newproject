

const bookCollectionEl = document.getElementById('collectionDiv');
const trendingBooksEl = document.getElementById('trendingBooksDiv');


const fovoriteEl  = document.querySelectorAll('.fovorite');

const favoriteBookNo = document.getElementById('No-of-favorite-books');




// a function to handle menu display
function displayMenuContents(){


    //  A FUNCTION TO DISPLAY THE CONTAINER WHEN CORRESPONDING CONTAINER MENU IS CLICKED
          
        // select menu list items
    const menuList = document.querySelectorAll('.menu-list');
       
    // select all menu containers
    const contentContainer = document.querySelectorAll('.menuContainer');

    menuList.forEach((item)=>{
            item.addEventListener('click',(e)=>{

                // remove all the container when a certain menu item is clicked --- this prevents displaying a menu container on top of the other
                contentContainer.forEach((container)=>{
                    container.classList.replace('display-menuContainer','menuContainer')
                });

                // display the clicked menu item
                const targetContent = item.getAttribute('data-target');
                const targetContainer = document.getElementById(targetContent);
                
                 targetContainer.classList.replace('menuContainer','display-menuContainer');

                // remove the shadow border from all the menu  items when a particular item is clicked  --- helps to show only one active menu
                menuList.forEach((list)=>{
                    list.classList.remove('active-menu-item')
                });

                // add the shadow border to the active menu 
                e.target.classList.add('active-menu-item');
                
            });
    });
    
    // A BUTTON TO CLOSE MENU ITEM CONTAINER ON CURRENT DISPLAY
    const closeBtn = document.querySelectorAll('.close-menuBtn');
     
    closeBtn.forEach((button)=>{
             button.addEventListener('click',(e)=>{

                const targetBtn = button.getAttribute('data-target');
                const targetContainer = document.getElementById(targetBtn);
                // close the opened menu container
                targetContainer.classList.replace('display-menuContainer','menuContainer')

                // remove the shadow border from all the menu  items close menu button is  --- helps to show that all menu are closed
                menuList.forEach((list)=>{
                    list.classList.remove('active-menu-item')
                });
             })
    });

    // A FUNCTION TO KEEP THE DISPLAYED MENU ITEM ACTIVE (by shadowing its border)

}
displayMenuContents();


// a function to handle favorite books --- when heart icon on the book is clicked
function addFavoriteBook(){
    // an array to store favorite books added
    let favoriteBooks =[];

    fovoriteEl.forEach((element)=>{
        element.addEventListener('click',(e)=>{
    
            if(element.src.includes('heart.png')){
                element.src ='icons/favorite2.png';
                
                favoriteBooks.push('favorite2.png')

                 let favBooksNo =favoriteBooks.length;

                 if(favBooksNo>=1){
                    favoriteBookNo.classList.replace('No-of-favorite-books','display-No-favorite-books');
                    favoriteBookNo.textContent=favoriteBooks.length;
                 }

                //styling the favorite.png image

                element.style.width='20px'
                element.style.height='20px'
                element.style.transform='translateY(-3px)'
                element.style.transition='0.3s ease-in-out'
                element.style.position='absolute'
            }
            else{
                element.src ='icons/heart.png';
                
                favoriteBooks.shift('favorite2.png');
                if(favoriteBooks.length<1){
                    favoriteBookNo.classList.replace('display-No-favorite-books','No-of-favorite-books');
                
                //styling the favorite.png image
                element.style.transform='scale(0.8)'
                }
                else{
                    favoriteBookNo.textContent=favoriteBooks.length;
                
                //styling the favorite.png image
                element.style.transform='scale(0.8)'
                }
            }
       })
    });
}
addFavoriteBook();


function favoriteBookObject(){
    let Book ={
        coverPage: 'science.png',
        title:'The way to salvation',
        author: 'ishmael smart',
    }
    console.log(`The book cover page is : ${Book.coverPage}, the title is : ${Book.title}, and the author is : ${Book.author}`);
    
}

favoriteBookObject();


//  a function to handle scroll the book collection and trending books to the left and right

function scrollBookCollections(){
    // grab scroll buttons
    const scrollBtn  = document.querySelectorAll('.scrollBtn');

    scrollBtn.forEach((button)=>{
        
        button.addEventListener('click',()=>{
       
        if(button.classList.contains('scrollLeft')){
            bookCollectionEl.scrollBy({
                left: -30,
                behavior: 'smooth'
            });
            
        }
        else if(button.classList.contains('scrollRight')){
            bookCollectionEl.scrollBy({
                left: 30,
                behavior: 'smooth'
            });
            }
        else if(button.classList.contains('back-arrow')){

            trendingBooksEl.scrollBy({
                left: -30,
                behavior: 'smooth'
            });
        }
        else if(button.classList.contains('next-arrow')){
            trendingBooksEl.scrollBy({
                left: 30,
                behavior: 'smooth'
            });     
        }
        });
    });
}
scrollBookCollections();

