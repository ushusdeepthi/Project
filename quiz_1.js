//Class has all the properties of quiz, question, answers etc.
class Quiz {
    constructor(data) {
       this.category=[];
            this.question_arr=[];
            this.answer_arr=[];
            this.correct_answer=[];
            this.current_qusetion=0;
        //pushing data from API into specific arrays
        for(let i=0; i<10;i++){
            this.category.push(data[i].category);
            this.question_arr.push(data[i].question);
            this.answer_arr.push(data[i].answers);
            this.correct_answer.push(data[i].correct_answers);

        }       
    }
    //Methos explaining and overview of what to do, when we reach a specific question-DOM manipulation.
    loading(number,score){
        console.log(this.category);
        console.log(this.question_arr);
        console.log(this.correct_answer);
        console.log(this.answer_arr);
        let start_quiz=document.getElementById("start_quiz");
        start_quiz.addEventListener("click",()=>{  
            start_quiz.textContent="NEXT";
            start_quiz.className="next";
            //let a=this.current_qusetion+1;
            //let b=document.getElementById("number_question"+a);
            //b.className="trial";
            if(this.current_qusetion==0){
                this.displayQuestion();
            }
            if(this.current_qusetion>0 && this.current_qusetion<number){
               
                if(this.current_qusetion==(number-1)) start_quiz.textContent="FINISH";
                let answer=this.chosenAnswer(this.correct_answer);
                console.log(answer);
                if(answer===true){
                    score=score+1;
                }else{
                    score=score+0;}
                console.log(score);
                 let display_space=document.getElementById("display");
                display_space.remove();                               
                this.displayQuestion();
                }
            if (this.current_qusetion==number){
                let a=this.chosenAnswer();
                console.log(a);
                if(a===true){
                    score=score+1;
                }else{
                    score=score+0;}
                console.log(score);
                let display_space=document.getElementById("display");
                let start_quiz=document.getElementById("start_quiz");
                for(let i=1;i<=number;i++){
                    document.getElementById("number_question"+i).remove()};
                display_space.remove();                                
               
                start_quiz.remove();
                display_space.remove();
                let score_box=document.createElement("p");
                score_box.setAttribute("id","score_box");
                score_box.innerHTML+="TOTAL SCORE :"+ score;
                let header=document.getElementById("header");
                header.appendChild(score_box);
                let new_game=document.createElement("button");
                new_game.textContent="NEW GAME";
                header.appendChild(new_game);
                new_game.addEventListener("click",function(e){
                   window.location.reload();
                })   
            }
            this.current_qusetion++;    
        })
    }
        //method to display category, questions & set of answers
        displayQuestion(){
        let header=document.getElementById("header");
        let display_space=document.createElement("div");
        display_space.setAttribute("id","display");
        let question= document.createElement("p");
        let category= document.createElement("p");
        category.textContent="Category: "+this.category[this.current_qusetion];
        question.textContent="Question "+(this.current_qusetion+1)+": "+this.question_arr[this.current_qusetion];
        display_space.appendChild(category);
        display_space.appendChild(question);
        let checkbox_1=document.createElement("input");
        checkbox_1.setAttribute("type","checkbox");
        
        let answer1=document.createElement("p");
        answer1.textContent=this.answer_arr[this.current_qusetion].answer_a;
        display_space.appendChild(answer1);
        answer1.prepend(checkbox_1);
        let checkbox_2=document.createElement("input");
        checkbox_2.setAttribute("type","checkbox")
        let answer2=document.createElement("p");
        answer2.textContent=this.answer_arr[this.current_qusetion].answer_b;
        display_space.appendChild(answer2);
        answer2.prepend(checkbox_2);
        if(this.answer_arr[this.current_qusetion].answer_c!=null){
            let checkbox_3=document.createElement("input");
            checkbox_3.setAttribute("type","checkbox");
            let answer3=document.createElement("p");
            answer3.textContent=this.answer_arr[this.current_qusetion].answer_c;
            display_space.appendChild(answer3);
            answer3.prepend(checkbox_3);
        }
        if(this.answer_arr[this.current_qusetion].answer_d!=null){
            let checkbox_4=document.createElement("input");
            checkbox_4.setAttribute("type","checkbox");
            let answer4=document.createElement("p");
            answer4.textContent=this.answer_arr[this.current_qusetion].answer_d;
            display_space.appendChild(answer4);
            answer4.prepend(checkbox_4);
        }
        if(this.answer_arr[this.current_qusetion].answer_e!=null){
            let checkbox_5=document.createElement("input");
            checkbox_5.setAttribute("type","checkbox");
            let answer5=document.createElement("p");
            answer5.textContent=this.answer_arr[this.current_qusetion].answer_e;
            display_space.appendChild(answer5);
            answer5.prepend(checkbox_5);
        }
        header.appendChild(display_space);
    

    } 
    //Method gets data from checkboxes, and correct answers to respective arrays
    chosenAnswer(){
        
        let checkbox_collection=document.getElementsByTagName("input");
        console.log(checkbox_collection);
        checkbox_collection=Array.from(checkbox_collection);
        console.log(checkbox_collection);
            let checkbox_check=checkbox_collection.map((value)=>{
                if (value.checked)return true;
                else return false;
            });
            
        let correct_answer_arr=[this.correct_answer[this.current_qusetion-1].answer_a_correct,
                                this.correct_answer[this.current_qusetion-1].answer_b_correct,
                                this.correct_answer[this.current_qusetion-1].answer_c_correct,
                                this.correct_answer[this.current_qusetion-1].answer_d_correct,                        
                                this.correct_answer[this.current_qusetion-1].answer_e_correct];
        console.log(correct_answer_arr);
        let correct_answer_check=[];
        for(let i=0;i<checkbox_collection.length;i++){
            if(correct_answer_arr[i]==="true")correct_answer_check.push(true);
            else correct_answer_check.push(false);
            
        }
       


        let points=this.gamePoints(correct_answer_check,checkbox_check);
        console.log(points);
        return points;
    }
    //Method taking parameters of correct answer array and checkbox checked and comparing both
    gamePoints(correct_answer_check,checkbox_check){
        console.log(correct_answer_check);
        console.log(checkbox_check);
     
        if(JSON.stringify(correct_answer_check)==JSON.stringify(checkbox_check))
        {
            return true
        }
        else
        {
            return false
        }
      
    }
} 