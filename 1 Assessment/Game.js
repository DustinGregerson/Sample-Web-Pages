            //HTML and JAVASCRIPT
            //author: Dustin Gregerson
            //Date: 1/27/22
            
            /*
                This java script creates a sliding puzzle game.
            
                            First
                First, the user is prompted to select the width and the height of the grid.
                The grid must have a width or height between 3 and 6.
                Any other value entered will reset the prompt.
                
                            Second
                After the user has selected values within range.
                The Script will then build the board within the #window div.
                The script will resize the divs and imgs to fit  within the #window div of the webpage
            
                            Third
                The script will then randomize the img src values and allow the user to slide
                the images towards an empty tile.
                once the empty tile is in the top left-hand corner of the board and the rest of the images
                form a complete img then the game is done.
            
            
            */
            
                // Variable list
            
            // default grid dimensions
            var gridD=5;
            //This variable holds the file path information used for img swaps.
            var srcHold=[];
            //this variable holds the refence to the img elements on the html document
            var imgValue=[];
            //this variable holds values that are used for img swaps
            var tile=[];
            //this variable gets all the divs on the page
            var divList;
            //counter
            var count=0;
            //these two variables hold the "Empty" tiles x and y coordnates on the grid
            var emptyX;
            var emptyY; 
            //this function creats a prompt for user input
            creatBoard();
            
            /*
                This is the main function that starts the game
                It prompts the user for the gridDimensions
                It creats the html elements and resizes the elements
                depending on the users input.
            */
            function creatBoard(){
            promptBoardLayOut();
            let html="";
            
            for(let i=0;i<gridD;i++){
                imgValue.push([]);
                for(let ii=0;ii<gridD;ii++){
                   
                    //holds the path to the file
                    srcHold[count]="split/row-"+(i+1)+"-column-"+(ii+1)+".jpg";
            
                    //stores the board html strings
                    html+=`<div onclick=\"slide(${i},${ii})\"><img src=\"${srcHold[count]}\" id=\"x${i}y${ii}\"></div>`;
                    count++;
                }
            }
            document.write(html);
            writeImgStyles();
            writeDivStyles();
            randomizeValues();
            
            
            }
            //first function called in creatBoard()
            //creats the 
            function promptBoardLayOut(){
                           
                do{
                    //condition used to emptyX it the loop
                    condition=false;
                   
                    //width and height are stored in D.
                    let D=prompt("Enter a number between 3-6 for the dimensions of the board");
                    //This an attempt to parse the string to integer.
                    gridD=parseInt(D);
            
                    //is number check
                    if(isNaN(gridD)){
                        alert("You must enter a number between 3-6. \n it can not contain a letter or special character");
                    }
                    else{
                        if(gridD>6||gridD<3){
                            alert("You must enter a number between 3-6");
                        }
                        else{
                            condition=true;
                        }
                    }
                       
                }
                while(!condition);
            }
            /*
                This function is used to change the img width and height
                relative to the window and the number imgs
            */
            function writeImgStyles(){
                for(let i=0;i<gridD;i++){
                    for(let ii=0;ii<gridD;ii++){
                        imgValue[i][ii]= document.getElementById("x"+i+"y"+ii);
                        imgValue[i][ii].style.width="100%";
                        imgValue[i][ii].style.height="100%";
                    }
                }
            }
            /*
                This function is used to change the div width and height
                the width and height are changed according to the the grid width and height values
            
                future note: I may need to be more selective in the future with my div elements
                and merge writeImgStyles() with writeDivStyles()
            */
            function writeDivStyles(){
                divList=document.getElementsByTagName("div");
                for(let i=1;i<divList.length;i++){
                    let SingleD=100/gridD;
                   divList[i].style.width=SingleD+"%"
                   divList[i].style.height=SingleD+"%"
                }
            }
            /*
                This function creates a temporary array this array is assigned a length of width*height of the board
                and a value equal to it's index.

                A second array is created, and random index from the first array is selected and added to it
                Until the first array is empty.
                
                Finally the second array values are added to the tile
                then the images are changed to the value in the tile depending on its x and y coordnets and value

            */
            function randomizeValues(){
                let tempA=[];
                count=0;
                for(let i=0;i<gridD*gridD;i++){
                    tempA[count]=count;
                    count++;
                }
                let tempB=[];
                count=0;
                while(tempA.length>0){
                    let number=Math.floor(Math.random()*tempA.length);
                    tempB[count]=tempA[number];
                    tempA.splice(number,1);
                    count++;
                }
                count=0;
                for(let i=0;i<gridD;i++){
                    tile.push([]);
                    for(let ii=0;ii<gridD;ii++){
                        tile[i][ii]=tempB[count];
                        if(tile[i][ii]==0){
                            emptyX=i;
                            emptyY=ii;
                        }
                        count++;
                    }
                }
                for(let i=0;i<gridD;i++){
                for(let ii=0;ii<gridD;ii++){
                    changeImg(i,ii,tile[i][ii]);
                }
                }
            
            }
            
            //performs the img swaps and tracks the "empty tile"
            function changeImg(x,y,value){
            if(value==0){
            emptyX=x;
            emptyY=y;
            }
            imgValue[x][y].src=srcHold[value];
            
            
            }
            /*
                This is the function called by the onlick event of each div on the board
                the x and y value of the div are passed to the function
            
                emptyX and emptyY are the coordinates of the empty tile
                x and y are the clicked divs coordinates
            
                the function checks to see if emptyX==x and emptyY!=y
                or
                the function checks to see if emptyX!==x and emptyY=y
                this is done to determine if the empty tile and the clicked div share only one axis
            
                if themptyY share an axis, then the other axis is compared to determine direction.
            
                Depending on that direction, a swap function is called.

                
            */
            function slide(x,y){
                if(x!=emptyX&&y==emptyY){
                    //check left
                    if(x>emptyX){
                        swapLeftToRight(x,y);
                    }
                
                    //check right
                    else{
                        swapRightToLeft(x,y);
                    }
                }
                else if(x==emptyX&&y!=emptyY){
                    //check up
                    if(y>emptyY){
                        swapUpToDown(x,y);
                    }
                    //check down
                    else{
                        swapDownToUp(x,y);
                    }
                }
                win();
            }
            //All these functions check the a tile in the direction of the empty tile "Integer value 0".
            //if the tile checked does not contain a zero then the function calls on it's self again.
            //if it does contain a zero, the zero is swaped back to the original tile that was clicked for each call of the function.
            // as it swaps the tile values, it changes the img elements src value to the the srchold[tile value].
            
            function swapLeftToRight(x,y){
                if(tile[x-1][y]==0){
                    tile[x-1][y]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x-1,y,tile[x-1][y]);
                }
                else{
                    swapLeftToRight(x-1,y);
                    tile[x-1][y]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x-1,y,tile[x-1][y]);
                }
                
            }
            function swapRightToLeft(x,y){
               
                if(tile[x+1][y]==0){
                    tile[x+1][y]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x+1,y,tile[x+1][y]);
                }
                else{
                    swapRightToLeft(x+1,y);
                    tile[x+1][y]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x+1,y,tile[x+1][y]);
                }
              
                
            }
            function swapUpToDown(x,y){
                if(tile[x][y-1]==0){
                    tile[x][y-1]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x,y-1,tile[x][y-1]);
                }
                else{
                    swapUpToDown(x,y-1);
                    tile[x][y-1]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x,y-1,tile[x][y-1]);
                }
                
            }
            function swapDownToUp(x,y){
                if(tile[x][y+1]==0){
                    tile[x][y+1]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x,y+1,tile[x][y+1]);
                }
                else{
                    swapDownToUp(x,y+1);
                    tile[x][y+1]=tile[x][y];
                    tile[x][y]=0;
                    changeImg(x,y,tile[x][y]);
                    changeImg(x,y+1,tile[x][y+1]);
                }
                
            }
            //this sets all tile value from 0 to gridD * griD
            function cheat(){
                count=0;
                for(let ii=0;ii<gridD;ii++){
                    for(let i=0;i<gridD;i++){
                        tile[i][ii]=count;
                        changeImg(i,ii,count);
                        count++;
                    }
                }
                count=0;
            }
            var winner=false;
            
            // the target index for tile is set backwards because the page is displayed in flex direction column.
            // this means the values are in column form as well.

            //GridD =5*5

            //0, 1, 2, 3 , 4
            //5, 6, 7, 8 , 9
            //10,11,12,13,14
            //15,16,17,18,19
            //20,21,22,23,24

            //when I pass i as x and ii as y to tile[x][y]
            //im actualy targeting 0 5 10 15 and 20
            //so i flip the i and ii for the for loops so i target 1,2,3,4,5 and so on till i get the end of the array.
            //if the counter is == tile[ii][i] till the end of the board then the imgs are all lined up.


            var winBan=document.getElementById("WinBanner");
            function win(){
                count=0;
                for(let ii=0;ii<gridD;ii++){
                    for(let i=0;i<gridD;i++){
                    if(tile[i][ii]==count){
                        winner=true;
                    }
                    else{
                        winner=false;
                        break;
                    }
                    count++;
                }
                if(!winner){
                    break;
                }
            }
            if(winner){
                winBan.style.display="fleX";
            }
            }
            //this function is used when the winBanner displays after a win condition is met and the user clicks the button
            function playAgain(){
            winBan.style.display="none";
            randomizeValues();
            }