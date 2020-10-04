class Question{
    constructor(category,question_arr,answer_arr,multiple_answer_arr,correct_answer){
        this.category=category;
        this.question_arr=question_arr;
        this.answer_arr=answer_arr;
        this.multiple_answer_arr=multiple_answer_arr;
        this.correct_answer=correct_answer;
    }
     
    displayQuestion(index){
        let display_space=document.getElementById("display_space");
        display_space.innerHTML="Category: "+this.category[index] +"<br><br>";
        display_space.innerHTML+="Question "+(index+1)+": "+this.question_arr[index] +"<br>";
        display_space.innerHTML+=('<input type="checkbox" id="checkbox_1" > ')+this.answer_arr[index].answer_a+"<br>";
        display_space.innerHTML+=('<input type="checkbox" id="checkbox_2"> ')+this.answer_arr[index].answer_b+"<br>";
        if(this.answer_arr[index].answer_c!=null){
            display_space.innerHTML+=('<input type="checkbox" id="checkbox_3"> ')+ this.answer_arr[index].answer_c+"<br>";
        }
        if(this.answer_arr[index].answer_d!=null){
            display_space.innerHTML+=('<input type="checkbox" id="checkbox_4"> ')+ this.answer_arr[index].answer_d+"<br>";
        }
        if(this.answer_arr[index].answer_e!=null){
            display_space.innerHTML+=('<input type="checkbox" id="checkbox_5"> ')+ this.answer_arr[index].answer_b+"<br>";
        }                    
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


