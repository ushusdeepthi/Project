class Question{
    constructor(category,question_arr,answer_arr,multiple_answer_arr,correct_answer){
        this.category=category;
        this.question_arr=question_arr;
        this.answer_arr=answer_arr;
        this.multiple_answer_arr=multiple_answer_arr;
        this.correct_answer=correct_answer;
    }
     
    displayQuestion(index){
        let header=document.getElementById("header");
        let display_space=document.createElement("div");
        display_space.setAttribute("id","display");
        let question= document.createElement("p");
        let category= document.createElement("p");
        category.textContent="Category: "+this.category[index];
        question.textContent="Question "+(index+1)+": "+this.question_arr[index];
        display_space.appendChild(category);
        display_space.appendChild(question);
        let checkbox_1=document.createElement("input");
        checkbox_1.setAttribute("type","checkbox");
        let answer1=document.createElement("p");
        answer1.textContent=this.answer_arr[index].answer_a;
        display_space.appendChild(answer1);
        answer1.prepend(checkbox_1);
        let checkbox_2=document.createElement("input");
        checkbox_2.setAttribute("type","checkbox");
        let answer2=document.createElement("p");
        answer2.textContent=this.answer_arr[index].answer_b;
        display_space.appendChild(answer2);
        answer2.prepend(checkbox_2);
        if(this.answer_arr[index].answer_c!=null){
            let checkbox_3=document.createElement("input");
            checkbox_3.setAttribute("type","checkbox");
            let answer3=document.createElement("p");
            answer3.textContent=this.answer_arr[index].answer_c;
            display_space.appendChild(answer3);
            answer3.prepend(checkbox_3);
        }
        if(this.answer_arr[index].answer_d!=null){
            let checkbox_4=document.createElement("input");
            checkbox_4.setAttribute("type","checkbox");
            let answer4=document.createElement("p");
            answer4.textContent=this.answer_arr[index].answer_d;
            display_space.appendChild(answer4);
            answer4.prepend(checkbox_4);
        }
        if(this.answer_arr[index].answer_e!=null){
            let checkbox_5=document.createElement("input");
            checkbox_5.setAttribute("type","checkbox");
            let answer5=document.createElement("p");
            answer5.textContent=this.answer_arr[index].answer_e;
            display_space.appendChild(answer5);
            answer5.prepend(checkbox_5);
        }
        header.appendChild(display_space);
    

    } 
    chosenAnswer(index){
        
        let checkbox_collection=document.getElementsByTagName("input");
        checkbox_collection=Array.from(checkbox_collection);
        console.log(checkbox_collection);
        let checkbox_check_index= [];
        for(let i=0;i<checkbox_collection.length;i++){ 
            if(document.getElementsByTagName("input")[i].checked)
            {
             checkbox_check_index.push(i);}
            }
          
        let correct_answer_arr=[this.correct_answer[index-1].answer_a_correct,
                                this.correct_answer[index-1].answer_b_correct,
                                this.correct_answer[index-1].answer_c_correct,
                                this.correct_answer[index-1].answer_d_correct,                        
                                this.correct_answer[index-1].answer_e_correct];
        console.log(correct_answer_arr);
        let correct_answer_index=[];
        for(let i=0;i<correct_answer_arr.length;i++){
            if(correct_answer_arr[i]==="true")
            {
                correct_answer_index.push(i);
            }
        }


        let score=this.gamePoints(correct_answer_index,checkbox_check_index);
        console.log(score);
        return score;
    }
    gamePoints(correct_answer_index,checkbox_check_index){
        console.log(correct_answer_index);
        console.log(checkbox_check_index);
     
        if(JSON.stringify(correct_answer_index)==JSON.stringify(checkbox_check_index))
        {
            return true
        }
        else
        {
            return false
        }
      
    }
}    