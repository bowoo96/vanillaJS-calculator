// 초기세팅 ////////////////////////////////////////////////////////////////////////////////////////
let input = []; // 숫자와 연산자를 담을 배열.
let beforeValue = "";
let currentValue = "";
/////////////////////////////////////////////////////////////////////////////////////////////////////




// 연산자 클릭시 /////////////////////////////////////////////////////////////////////////////////////
// 연산자가 담긴 div를 모두 변수에 담아줌
// 연산자 입장
// - currentValue에 연산자가 아닌 다른게 있다면 currentValue를 beforeValue로 옮겨주고 currentValue에 연산자를 할당. 그리고 여기서 beforeValue를 푸쉬
// - currentValue에 연산자가 있다면? 리턴
const operators = document.querySelectorAll('.operators > div');

operators.forEach(operatorClick => {
    operatorClick.addEventListener('click', (oper) => {
        
        // currentValue가 연산자라면
        if(currentValue == "+" || currentValue == "-" || currentValue == "*" || currentValue == "/"){
            return;
        
        // currentValue가 연산자가 아니라면? (숫자)
        }else if(currentValue !== "+" || currentValue !== "-" || currentValue !== "*" || currentValue !== "/"){
            beforeValue += currentValue;
            currentValue = "";
            operatorValue = oper.target.textContent;
            document.querySelector("#input").textContent += operatorValue;
            currentValue += operatorValue;
            input.push(beforeValue);
            console.log(currentValue+"current");
            console.log(beforeValue+"before");
            console.log(input);
            beforeValue ="";
        }




        // if (input.length == 0) { // 배열의 첫 번째에 연산자가 못오게 처리
        //     return

        //     // 연산자 중복 안됨 처리
        //     // input배열 마지막에 연산자가 없다면 연산자 출력 (짜증나서 * / 연산자 텍스트 바꿈)
        // } else if (input[input.length - 1] !== "+" && input[input.length - 1] !== "-" && input[input.length - 1] !== "*" && input[input.length - 1] !== "/") {
        //     let operatorValue = oper.target.textContent;
        //     input.push(operatorValue); // 배열에 연산자 추가
        //     document.querySelector("#input").textContent += operatorValue;
        //     console.log(input);
        // }
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////




// 숫자 클릭시 /////////////////////////////////////////////////////////////////////////////////////
// 숫자가 담긴 div를 모두 변수에 담아줌.
const numbers = document.querySelectorAll('.numbers > div');

let numValue = "";
numbers.forEach(numberClick => {
    numberClick.addEventListener('click', (num) => {

        // clear 버튼 클릭시 모든 변수, 배열 값 초기화.
        if(num.target == numbers[numbers.length-1]){
            input = [];
            currentValue = "";
            beforeValue = "";
            document.querySelector("#input").textContent = "";

        // clear 버튼 빼고 나머지 버튼 눌렀을 때.    
        }else{

            // currentValue가 빈태그라면..
            if(currentValue == ""){ 
                numValue = num.target.textContent;
                document.querySelector("#input").textContent += numValue;
                currentValue += numValue;
            // currentValue가 연산자가 아니라면(숫자라면) currentValue에 클릭한 숫자를 추가로 넣어줌.
            }else if(currentValue !== "+" && currentValue !== "-" && currentValue !== "*" && currentValue !== "/"){
                numValue = num.target.textContent;
                document.querySelector("#input").textContent += numValue;
                currentValue += numValue;
            // currentValue가 연산자라면 currentValue를 beforeValue에 넣어주고, currentValue를 초기화하고 다시 currentValue에 클릭한 숫자를 넣어줌.
            }else if(currentValue == "+" || currentValue == "-" || currentValue == "*" || currentValue == "/"){
                beforeValue += currentValue;
                currentValue = "";
                numValue = num.target.textContent;
                document.querySelector("#input").textContent += numValue;
                currentValue += numValue;
                input.push(beforeValue);
                beforeValue ="";
            }
        }

    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////




// = 버튼 클릭시 ////////////////////////////////////////////////////////////////////////////////////
let result = document.querySelector('#result');

result.addEventListener('click', resultAll);

// first, second 가져와서 operator가 + - / * 중 뭔지 확인하고 그에 맞는 연산

let resultNum = 0;

function resultAll() {
        // 끝까지 계산해야 하니까 for문으로 반복
    input.forEach(()=>{
        
        // currentValue에 연산자라면 그냥 리턴
        if(currentValue == "+" || currentValue == "-" || currentValue == "*" || currentValue == "/"){
            return;

        // currentValue에 연산자가 아니라면 push
        }else if(currentValue !== "+" || currentValue !== "-" || currentValue !== "*" || currentValue !== "/"){
            input.push(currentValue);
            currentValue = "";
            if(input.includes("*")){  // item 에 *가 들어갔을 때 

                let multiplIndex = input.indexOf("*"); // *가 있는 input의 index번호
                let multipl = Number(input[multiplIndex-1])*Number(input[multiplIndex+1]) // *가 있는 input의 index번호 앞 뒤 연산
                input.splice(multiplIndex-1,3,multipl); // 연산한 답을 출력하면서 연산한 내용 삭제
    
            }else if(input.includes("/")){  // item 에 /가 들어갔을 때 
    
                let divisionIndex = input.indexOf("/");
                let division = Number(input[divisionIndex-1])/Number(input[divisionIndex+1])
                input.splice(divisionIndex-1,3,division);
    
            }else if(input.includes("+")){  // item 에 +가 들어갔을 때  
                // 왜 + 가 먼저 연산될까? * 먼저 if 돌텐데..?
                // >> item === "+"를 includes로 변경해서 해결
                let plusIndex = input.indexOf("+");
                let plus = Number(input[plusIndex-1])+Number(input[plusIndex+1])
                input.splice(plusIndex-1,3,plus);
    
            }else if(input.includes("-")){  // item 에 -가 들어갔을 때 
    
                let minusIndex = input.indexOf("-");
                let minus = Number(input[minusIndex-1])-Number(input[minusIndex+1])
                input.splice(minusIndex-1,3,minus);
    
            }
            resultNum = input[0]; // 연산된 값을 출력하기 위해 resultNum에 할당.
            console.log(input);
        }
    })
    // 마지막 currentValue에 ""이 남아서 삭제.
    input.splice(1,1);
    document.querySelector('#input').textContent = resultNum; // 할당된 값을 출력.
}


// C 버튼 클릭시 ////////////////////////////////////////////////////////////////////////////////////