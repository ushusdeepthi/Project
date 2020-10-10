class Quiz {
    constructor(data) {
        this.category=[];
        this.question_arr=[];
        this.answer_arr=[];
        this.correct_answer=[];
        this.current_qusetion=0;

        for(let i=0; i<10;i++){
            this.category.push(data[i].category);
            this.question_arr.push(data[i].question);
            this.answer_arr.push(data[i].answers);
            this.correct_answer.push(data[i].correct_answers);

        }       
    }

    loading(number,score){
        console.log(this.category);
        console.log(this.question_arr);
        console.log(this.correct_answer);
        console.log(this.answer_arr);

        
        let start_quiz=document.getElementById("start_quiz");
        start_quiz.addEventListener("click",()=>{  
            start_quiz.textContent="NEXT";
            start_quiz.className="next";  
            if(this.current_qusetion==0){
                this.displayQuestion();
            }
            if(this.current_qusetion>0 && this.current_qusetion<number){
               
                if(this.current_qusetion==(number-1)) start_quiz.textContent="FINISH";
                let a=this.chosenAnswer(this.correct_answer);
                console.log(a);
                if(a===true){
                    score=score+1;
                }else{
                    score=score+0;}
                console.log(score);
                 let display_space=document.getElementById("display");
                display_space.remove();                                
                this.displayQuestion();
                }
            if (this.current_qusetion==number){
                let answer=this.chosenAnswer();
                console.log(answer);
                if(answer===true){
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
                let result=document.createElement("div");
                result.setAttribute("id","result");
                if(score===number){
                    let top_score=document.createElement("p");
                    top_score.innerHTML="CONGRATULATIONS!!! You have the top score"
                    result.appendChild(top_score);
                }
                if(score<=(number/4)){
                    let top_score=document.createElement("p");
                    top_score.innerHTML="Your level is below Average"
                    result.appendChild(top_score);
                }
                let score_box=document.createElement("p");
                score_box.setAttribute("id","score_box");
                score_box.innerHTML+="TOTAL SCORE :"+ score;
               
                result.appendChild(score_box);
                let new_game=document.createElement("button");
                new_game.textContent="NEW GAME";
                result.appendChild(new_game);
                let header=document.getElementById("header");
                header.appendChild(result);
                new_game.addEventListener("click",function(e){
                   window.location.reload();
                })   
            }
            this.current_qusetion++;    
        })
    }
        displayQuestion(){
        let header=document.getElementById("header");
        let display_space=document.createElement("div");
        display_space.setAttribute("id","display");
        let question= document.createElement("p");
        question.className="question";
        let category= document.createElement("p");
        category.className="category";
        category.textContent="Category: "+this.category[this.current_qusetion];
        question.textContent="Question "+(this.current_qusetion+1)+": "+this.question_arr[this.current_qusetion];
        display_space.appendChild(category);
        display_space.appendChild(question);
        let answer=new Answers(this.answer_arr[this.current_qusetion]);
        console.log(answer.answer);
        for(let i=0;i<answer.answer.length;i++){
           if(answer.answer[i]!=null){
            let checkbox=document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            let answer_element=document.createElement("p");
            answer_element.className="answer";
            answer_element.textContent=answer.answer[i];
            display_space.appendChild(answer_element);
            answer_element.prepend(checkbox);
           }  
       }
       header.appendChild(display_space);    
    }
    chosenAnswer(){
        
        let checkbox_collection=document.getElementsByTagName("input");
        console.log(checkbox_collection);
        checkbox_collection=Array.from(checkbox_collection);
        console.log(checkbox_collection);
            let checkbox_check=checkbox_collection.map((value)=>{
                if (value.checked){
                    value.className="checked";
                    return true}
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
   
class Answers{
    constructor(answer_curr_question){
        this.answer=this.getAnswer(answer_curr_question);
    }
    getAnswer(answer_curr_question){
        let single_answer_arr=[ answer_curr_question.answer_a,
                                answer_curr_question.answer_b,
                                answer_curr_question.answer_c,
                                answer_curr_question.answer_d,                        
                                answer_curr_question.answer_e];
        return single_answer_arr;
    }

}    


