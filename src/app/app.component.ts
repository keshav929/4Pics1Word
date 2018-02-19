import { Component,
          OnInit,
          trigger,
          state,
          style,
          transition,
          animate,
          keyframes } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger("modalInOut",[
        state("In",style({
          position:"absolute",
          opacity:"1",
          top:"-5%"
        })),
        state("Out",style({
          position:"absolute",
          opacity:"0",
          top:"-125%"
        })),
        transition("In => Out",animate("400ms ease-out")),
        transition("Out => In",animate("400ms ease-in"))
      ])
  ]
})
export class AppComponent implements OnInit
{
  
  	gameLevelAll = [{images:["././assets/cat1.jpg",
  							"././assets/cat2.jpg",
  							"././assets/cat3.jpeg",
  							"././assets/cat4.jpg"], word:"CAT"},
  					{images:["././assets/plane1.jpg",
  							"././assets/plane2.jpg",
  							"././assets/plane3.jpg",
  							"././assets/plane3.jpg"], word:"PLANE"},
  					{images:["././assets/musk1.jpg",
  							"././assets/musk2.png",
  							"././assets/musk3.jpg",
  							"././assets/musk4.jpg"], word:"MUSK"},
  					{images:["././assets/zombie1.jpg",
  							"././assets/zombie2.jpg",
  							"././assets/zombie3.png",
  							"././assets/zombie4.jpg"], word:"ZOMBIE"}];

    totalLevels:number = this.gameLevelAll.length;
  	lettersArray:any = [];
  	gameLevelSingle:any = [];
  	maxLetters:number = 12;
  	currentLevel:number = 0;
  	letterIndexs:Array<any>= [];
    wordsArray:Array<any> = [];
    letterCount:number = 0;
    correctWordLenght:number = 0;
    filledIndex:Array<number> = [];
    completeClass:string = "";
    state:string = "Out";
    showLevelNumber:number = 0;
    greetmsg = "CORRECT!";
    correctMsg = "You Got It.";
    showContinueBtn:boolean = true;
  	ngOnInit() 
  	{
  		this.moveToNextLevel();
  	}

    modalDialog(){

      this.state = (this.state === "Out" ? "In":"Out");

    }

  	getLevel(levelNumber)
  	{
  		
  	}

  	makeLetters() 
  	{
  		this.lettersArray = [];
  		let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  		for (let i = 0; i < this.maxLetters; i++)
  		{
  			this.lettersArray.push(possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)));
  		}
  		this.generateLetterIndexs();
  		this.insertWordCharacter();
	}

	insertWordCharacter()
	{
		let correctWordIndexs = this.shuffleLetterIndexs(this.letterIndexs);
		let wordString = this.gameLevelAll[this.currentLevel].word;
		this.correctWordLenght = wordString.length;
    	this.initializeWordArray();
		for(let i = 0; i< this.correctWordLenght;i++)
		{
			this.lettersArray[this.letterIndexs[i]] = wordString.charAt(i);
		}
	}

  initializeWordArray()
  {
  	this.wordsArray = [];
    for(let i = 0 ; i< this.correctWordLenght; i++)
    {
      	let letterProp = {};
		    letterProp["index"] = 0;
		    letterProp["letter"] = "";
      	this.wordsArray.push(letterProp);
    }


  }

	generateLetterIndexs()
	{
		this.letterIndexs = [];
		for (let i = 0; i < this.maxLetters; i++)
  		{
  			this.letterIndexs.push(i);
  		}
	}
	shuffleLetterIndexs(a)
	{
		var j, x, i;
	    for (i = a.length - 1; i > 0; i--) 
	    {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
    	return a;
	}

	addLetter(index)
	{
		if(this.lettersArray[index] == "")
		{
			return;
		}
		if(this.letterCount < this.correctWordLenght)
		{
			for(let j=0; j<this.correctWordLenght; j++)
			{
				if(this.wordsArray[j].letter == "")
				{
					this.wordsArray[j].index = index;
					this.wordsArray[j].letter = this.lettersArray[index];
					break;
				}
			}
			this.lettersArray[index] = "";
			this.letterCount++;
		}
		if(this.letterCount == this.correctWordLenght)
		{
			let enterdWord = "";
			for(let k=0; k<this.correctWordLenght; k++)
			{
				enterdWord += this.wordsArray[k].letter;
			}
			if(enterdWord == this.gameLevelAll[this.currentLevel].word)
			{
				if(this.currentLevel <this.totalLevels-1 )
				{
          this.completeClass = "valid";
					this.currentLevel++;
          setTimeout(() => {
          this.state = "In";
          }, 500);
				}
				else
				{
          this.greetmsg ="CONGRATULATIONS!";
          this.showContinueBtn = false;
          this.correctMsg  ="You Won The Game.";
          this.state = "In";
				}
        
			}
      else
        {
          this.completeClass = "invalid";
        }
		}
		
	}
	removeLetter(index)
	{
		if(this.wordsArray[index].letter == "")
		{
			return;
		}
		if(this.letterCount > 0)
		{
      this.completeClass = "";
			this.lettersArray[this.wordsArray[index].index] = this.wordsArray[index].letter;
			this.wordsArray[index].letter = "";
			this.letterCount--;
		}

	}
	moveToNextLevel()
	{
  		this.showLevelNumber++;
      this.letterCount = 0;
      this.completeClass = "";
  		this.gameLevelSingle = this.gameLevelAll[this.currentLevel];
  		this.makeLetters();
      this.state = "Out";
	}

}
