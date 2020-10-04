
document.addEventListener("DOMContentLoaded", function(e) {
   let submit_details= document.getElementById("button");
    submit_details.addEventListener("click",function(e){
        let personal_details=document.getElementById("personal_details");
        let name=document.getElementById("name");
        let number_of_questions= document.getElementById("questions");
        welcome.remove();
        personal_details.remove();
        let player=  new Player(name.value,number_of_questions.value)//add second parameter here
        console.log(player.name);
        player.newGame();
    })
})
class Player{
    constructor(name,number_of_questions){
        this.name=name;
        this.number_of_questions=number_of_questions;
        this.score=0;    
    }
    newGame(){
        let header=document.getElementById("header");
        let player_name= document.createElement("p");
        player_name.innerHTML="Name: " + this.name;
        header.appendChild(player_name)
        let number_question;
        for (let i=1; i<=this.number_of_questions;i++)
            {
                number_question=document.createElement("button");
                number_question.className="number_question";
                number_question.innerHTML=i;
                header.appendChild(number_question);
            }
        let start_quiz=document.createElement("button");
        start_quiz.setAttribute("id","start_quiz");
        start_quiz.textContent="START QUIZ";
        header.appendChild(start_quiz);
        fetch('https://quizapi.io/api/v1/questions?apiKey=l3yYIL0YelN5Oto4f09M7Qec0uVJfIHsfh6QuOw6&limit=10')
        .then(response => response.json())
        .then(data => {
            let category=[];
            let question_arr=[];
            let answer_arr=[];
            let multiple_answer_arr=[];
            let correct_answer=[];
            for(let i=0; i<10;i++){
                category.push(data[i].category);
                question_arr.push(data[i].question);
                answer_arr.push(data[i].answers);
                multiple_answer_arr.push(data[i].multiple_correct_answers);
                correct_answer.push(data[i].correct_answers);

            }       
            console.log(correct_answer); 
            let question=new Question(category,question_arr,answer_arr,multiple_answer_arr,correct_answer);
            console.log(question);    
            let index=0;
            let self=this;
            start_quiz.addEventListener("click",function(e){  
                start_quiz.textContent="NEXT";
                start_quiz.className="next";
                if(index==0){
                    question.displayQuestion(index);
                }
                if(index>0 && index<self.number_of_questions){
                    if(index==(self.number_of_questions-1)) start_quiz.textContent="FINISH";
                    let a=question.chosenAnswer(index);
                    console.log(a);
                    if(a===true){
                        self.score=self.score+1;
                    }else{
                        self.score=self.score+0;}
                    console.log(self.score);

                    question.displayQuestion(index);
                    }
                if (index==self.number_of_questions){
                    let a=question.chosenAnswer(index);
                    console.log(a);
                    if(a===true){
                        self.score=self.score+1;
                    }else{
                        self.score=self.score+0;}
                    console.log(self.score);
                    player_name.remove();
                    start_quiz.remove();
                    display_space.remove();
                    let score_box=document.createElement("p");
                    score_box.setAttribute("id","score_box");
                    score_box.innerHTML+="TOTAL SCORE :"+ self.score;
                    let header=document.getElementById("header");
                    header.appendChild(score_box);
                    let new_game=document.createElement("button");
                    new_game.textContent="NEW GAME";
                    header.appendChild(new_game);
                    new_game.addEventListener("click",function(e){
                       window.location.reload();
                    })   
                }
                index++;       
            })
        });           
    }
}


