class Quiz { // class with properties like question answer etc as parameters
    constructor(data) {
        this.category=[];
        this.question_arr=[];
        this.answer_obj_arr=[];
        this.correct_answer_obj=[];
        this.current_qusetion=0;
        //pushing values into the respective arrays(properties)
        for(let i=0; i<10;i++){
            this.category.push(data[i].category);
            this.question_arr.push(data[i].question);
            this.answer_obj_arr.push(data[i].answers);
            this.correct_answer_obj.push(data[i].correct_answers);
        }  
        console.log(this.category);
        console.log(this.question_arr);  
        console.log(this.answer_obj_arr);  
        console.log(this.correct_answer_obj);  
    }
    //method controlling the loading of the contents using click event.
    loading(number,score){
        let start_quiz=document.getElementById("start_quiz");
        start_quiz.addEventListener("click",(e)=>{  
            e.preventDefault();
            start_quiz.textContent="NEXT";
            start_quiz.className="next";  
            if(this.current_qusetion==0){
                this.displayQuestion();//method to diaplay question
                let question_number=document.getElementById("number_question"+(this.current_qusetion+1));
                
                question_number.className="question_no";
            }
            if(this.current_qusetion>0 && this.current_qusetion<=number){
                let correct=new Correct(this.correct_answer_obj,this.current_qusetion);
                if(correct.correct===true){
                    score=score+1;
                }else{
                    score=score+0;}
                console.log(score);
                let display_space=document.getElementById("display");
                display_space.remove();                                
                if (this.current_qusetion==number){
                    for(let i=1;i<=number;i++){
                    document.getElementById("number_question"+i).remove()};
                    start_quiz.remove();
                    let result=document.createElement("div");
                    result.setAttribute("id","result");
                    let top_score=document.createElement("p");
                    if(score==number)top_score.innerHTML="CONGRATULATIONS!!! You have the top score";
                    else if(score<number/2)top_score.innerHTML="Your level is Below Average";
                    else if(score==number/2) top_score.innerHTML="Your level is Average";
                    else if(score>number/2)top_score.innerHTML="Your level is Above Average";  
                    result.appendChild(top_score);
                    let score_box=document.createElement("p");
                    score_box.setAttribute("id","score_box");
                    score_box.innerHTML+="TOTAL SCORE :"+ score;
                    result.appendChild(score_box);
                    let new_game=document.createElement("button");
                    new_game.textContent="NEW GAME";
                    new_game.className="new_game";
                    result.appendChild(new_game);
                    let header=document.getElementById("header");
                    header.appendChild(result);
                    new_game.addEventListener("click",function(e){
                       window.location.reload();
                    })   
                }else{
                    if(this.current_qusetion==(number-1)) start_quiz.textContent="FINISH";
                    let question_number=document.getElementById("number_question"+(this.current_qusetion+1));
                    question_number.className="question_no";
                    this.displayQuestion();//method to display question
                }
            }
            this.current_qusetion++; //increase the value of current question to go to next question
        })
    }
    //Method where elements are created to display category,question  and answer alternative
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
        let answer=new Answers(this.answer_obj_arr[this.current_qusetion]);//creates a new object of class Answers
        console.log(answer.answer);
        for(let i=0;i<answer.answer.length;i++){
           if(answer.answer[i]!=null){//displays answer alternative which are not null
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
    
} 
//Class which takes object array as parameter and returns the array with answer alternative for the current question.
class Answers{
    constructor(answer_curr_question){
        this.answer=this.getAnswer(answer_curr_question);
    }
    getAnswer(answer_curr_question){
        let single_answer_arr=[ answer_curr_question.answer_a,
                                answer_curr_question.answer_b,
                                answer_curr_question.answer_c,
                                answer_curr_question.answer_d,                        
                                answer_curr_question.answer_e,
                                answer_curr_question.answer_f];
        return single_answer_arr;
    }

}
//class checks if chosen answer by checkboxes is same as correct answer from API
class Correct{
    constructor(correct_answer,current_question){
        this.correct=this.chosenAnswer(correct_answer,current_question);
    }
    chosenAnswer(correct_answer,current_question){
        let checkbox_collection=document.getElementsByTagName("input");
        checkbox_collection=Array.from(checkbox_collection);
        let checkbox_check=checkbox_collection.map((value)=>{ //Goes through checkbox array by map function
            if (value.checked){
                value.className="checked";
                return true}
            else return false;
            });
            
        let correct_answer_arr=[correct_answer[current_question-1].answer_a_correct,
                                correct_answer[current_question-1].answer_b_correct,
                                correct_answer[current_question-1].answer_c_correct,
                                correct_answer[current_question-1].answer_d_correct,                        
                                correct_answer[current_question-1].answer_e_correct,
                                correct_answer[current_question-1].answer_f_correct];
        let correct_answer_check=[];
        for(let i=0;i<checkbox_collection.length;i++){
            if(correct_answer_arr[i]==="true")correct_answer_check.push(true);
            else correct_answer_check.push(false);
            
        }

        let points=this.gamePoints(correct_answer_check,checkbox_check);
        console.log(points);
        return points;
    }
    //method takes checkbox array and correct answer array as parameters and compare answers
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