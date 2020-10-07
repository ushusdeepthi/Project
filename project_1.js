document.addEventListener("DOMContentLoaded", function(e) {
    let submit_details= document.getElementById("button");
     submit_details.addEventListener("click",()=>{
        let player= new Player();//creating a new player Object for specifiying properties of the player
        player.playerData();//calling the method.
 })
})
class Player{
    constructor(){
         this.name="";
         this.number_of_questions=0;
         this.score=0;    
    }  
    playerData(){
     let personal_details=document.getElementById("personal_details");
     this.name=document.getElementById("name").value;
     console.log(this.name);
     this.number_of_questions= document.getElementById("questions").value;
     console.log(this.number_of_questions);
     let welcome=document.getElementById("welcome");
     welcome.remove();
     personal_details.remove();
     this.newGame();
 
    }  
    async newGame(){
         let header=document.getElementById("header");
         let player_name= document.createElement("p");
         player_name.innerHTML="Name:" + this.name;
         header.appendChild(player_name)
         let number_question;
         for (let i=1; i<=this.number_of_questions;i++)
         {
             number_question=document.createElement("button");
             number_question.setAttribute("id","number_question"+i);
             number_question.innerHTML=i;
             header.appendChild(number_question);
         }
         let start_quiz=document.createElement("button");
         start_quiz.setAttribute("id","start_quiz");
        start_quiz.textContent="START QUIZ";
         header.appendChild(start_quiz);
         await fetch('https://quizapi.io/api/v1/questions?apiKey=l3yYIL0YelN5Oto4f09M7Qec0uVJfIHsfh6QuOw6&limit=10')
         .then(response => response.json())
         .then(data => {
 
             let quiz = new Quiz(data);
             quiz.loading(this.number_of_questions,this.score);
         })
 
                 }
              }       