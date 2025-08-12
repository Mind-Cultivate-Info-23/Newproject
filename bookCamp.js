

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
let favoriteBooks =[];
function addFavoriteBook(){
    // an array to store favorite books added
   // let favoriteBooks =[];

    fovoriteEl.forEach((element)=>{
        element.addEventListener('click',(e)=>{

           




            const bookDiv = element.closest('.book')
    
            if(element.src.includes('icons/heart.png')){
                element.src ='icons/favorite2.png';

                updateFavoriteBooks(element, bookDiv)

               
                            /*
                        if(element.src.includes('icons/favorite2.png')){
                            element.classList.toggle('green-icon');

                            let greenHeart = document.querySelector('.green-icon');
                            console.log(greenHeart.classList);

                            greenHeart.addEventListener('click',()=>{
                                console.log(`green heart clicked${greenHeart.classList}`)
                                
                                const favoriteBookUl  = document.getElementById('favorite-booksUl');
                               let favoriteBookList = favoriteBookUl.querySelectorAll('.favorite-bookList');
                                console.log(favoriteBookUl);
                                console.log(favoriteBookList);
                                // removeFavBookBook2(greenHeart, favoriteBookUl)
                                //  favoriteBookUl.removeChild(favoriteBookListEl);

                            })
                        }
                        */

              //  const bookCover =bookDiv.querySelector('.book-image').src
               // const bookAuthor =bookDiv.querySelector('.authorName').textContent
               // const bookTitle =bookDiv.querySelector('.bookTitle').textContent
            
            
                    // book object -- contains book tittle, author name and book cover image
                let Book ={
                    coverPage: 'bookCover',
                    title: 'bookTitle',
                    author: 'bookAuthor',
                }
            
                favoriteBooks.push(Book);
               
            
                

                //  console.log(` the created list element is : ${favoriteBookListEl.classList}`);
 
                 // favorite-booksContainer   favorite-bookList
            

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

                // green icon 
                // code for removing the book from favorites list after clicking the green icon.
                
                
            }
            else{
                element.src ='icons/heart.png';
                element.style.transform='scale(0.67)'
              //  element.style.transform='translateY(-2px)'
             

               
                favoriteBooks.shift('Book');

              
                
                if(favoriteBooks.length<1){
                    favoriteBookNo.classList.replace('display-No-favorite-books','No-of-favorite-books');
                
                //styling the favorite.png image
               // element.style.transform='scale(0.8)'
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



function updateFavoriteBooks(element, bookDiv){
    let heartIcon1 = element;
    let bookdiv =  bookDiv;
                            
    const bookCover =bookdiv.querySelector('.book-image').src
    const bookAuthor =bookdiv.querySelector('.authorName').textContent
    const bookTitle =bookdiv.querySelector('.bookTitle').textContent


        


      const favoriteBookUl  = document.getElementById('favorite-booksUl');
      console.log(`Favorite book Ul : ${favoriteBookUl}`);
            
            // the favorite books list element
      let favoriteBookListEl = document.createElement('li');

      favoriteBookListEl.classList.add('favorite-bookList')

      let favoriteBookObject = document.createElement('div');

         //   favoriteBookObject.textContent = 'book object'

            favoriteBookObject.classList.add('favorite-book-object')

            // fav book img div
         let favoritBookImageDiv = document.createElement('div');
            
            // <div class="fav-book-picDiv"
            favoritBookImageDiv.classList.add('fav-book-picDiv')

            // fav-bookCover
            let favoritBookImage = document.createElement('img');
                favoritBookImage.classList.add('fav-book');

               // favoritBookImage.scr = 'images/rich-dad.png';
                favoritBookImage.setAttribute("src", bookCover);
               
               

                favoritBookImageDiv.appendChild(favoritBookImage);

                favoriteBookObject.appendChild(favoritBookImageDiv);
        

             

             let favoriteBookInfor = document.createElement('div');
                 favoriteBookInfor.classList.add('fav-book-info') 
                 

                let favoriteBookTitle = document.createElement('span');
                let favoriteBookAuthor = document.createElement('span');
                let favoriteBookYear = document.createElement('span');
                        
                        favoriteBookTitle.textContent = bookTitle;
                        favoriteBookAuthor.textContent = bookAuthor;
                        favoriteBookYear.textContent = '2021';

                    favoriteBookInfor.appendChild(favoriteBookTitle);
                    favoriteBookInfor.appendChild(favoriteBookAuthor);
                    favoriteBookInfor.appendChild(favoriteBookYear);

                 //   console.log(`FAVORITE BOOK INFO IS : ${favoriteBookInfor}`)

                    favoriteBookObject.appendChild(favoriteBookInfor);

             /*
             <div class="fav-book-info" id="fav-book-info">
                <span class="fav-book-title" id="fav-book-title">The Rich Dad</span>
                <span class="fav-book-author" id="fav-book-author">Robert Kiyosati</span>  
                <span class="fav-book-year" id="fav-book-year">2021</span>    
             </div>
            */




      let favoriteBookActions = document.createElement('div');

         //  favoriteBookActions.textContent = 'book actions'

           favoriteBookActions.classList.add('favorite-book-actions')

        let readFavBookBtn = document.createElement('button');
        let removeFavBookBtn = document.createElement('button');

        readFavBookBtn.textContent ='Read'
        removeFavBookBtn.textContent ='Remove'

        readFavBookBtn.classList.add('read-book')
        removeFavBookBtn.classList.add('remove-favorite')

        favoriteBookActions.appendChild(readFavBookBtn);
        favoriteBookActions.appendChild(removeFavBookBtn);
        
       
    //  favoriteBookListEl.textContent = 'book one'

     favoriteBookListEl.appendChild(favoriteBookObject);
     favoriteBookListEl.appendChild(favoriteBookActions);

      favoriteBookUl.appendChild(favoriteBookListEl);


// green heart

      if(heartIcon1.src.includes('icons/favorite2.png')){
        heartIcon1.classList.add('green-icon');

        let greenHeart = document.querySelector('.green-icon');
       

        greenHeart.addEventListener('click',()=>{
            
               favoriteBookUl.removeChild(favoriteBookListEl);

        })
    }






      removeFavoriteBook(heartIcon1, removeFavBookBtn, favoriteBookUl)
}

function removeFavoriteBook(heartIcon1, removeFavBookBtn, favoriteBookUl){

    removeFavBookBtn.addEventListener('click',()=>{
        const heartIcon =  heartIcon1;
       
         heartIcon.src ='icons/heart.png';
         heartIcon.style.transform='scale(0.67)'
         favoriteBooks.shift('Book');

         favoriteBookNo.textContent=favoriteBooks.length;
         if(favoriteBooks.length<1){
            favoriteBookNo.classList.replace('display-No-favorite-books','No-of-favorite-books');
        }

          
            const favoriteBookListEl = removeFavBookBtn.closest('.favorite-bookList');
            

            const favBookUl =  favoriteBookUl
            
            favBookUl.removeChild(favoriteBookListEl);
            
        })
}


function removeFavBookBook2( greenHeartIcon, favoriteBookUl){
    
        
        const favoriteBookListEl = greenHeartIcon.closest('.favorite-bookList');
        
        const favBookUl =  favoriteBookUl
     
    //    favBookUl.removeChild(favoriteBookListEl);
}

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

