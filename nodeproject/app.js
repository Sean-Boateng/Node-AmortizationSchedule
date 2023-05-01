const XLSX = require('xlsx')
const data = [
    {},
]

const convertJsonToExcel=()=>{
    
  const prompt = require("prompt-sync")();


let input1 = prompt("What is the loan amount? ")
let loanAmount = parseInt(input1)
console.log(loanAmount)
let input2 = prompt("What is the term, in years, of the this loan? ")
let loanTerm = (parseInt(input2)*12)
console.log(loanTerm)
let input3 = prompt("What is the rate of this loan? ")
let rate = (parseInt(input3)/100)
console.log(rate)

let currentLoan = loanAmount
console.log(currentLoan)
let monthlyRate = rate/12
console.log((monthlyRate).toFixed(2))
let payment = ((monthlyRate * loanAmount)/(1-(1+monthlyRate)**(-loanTerm))).toFixed(2)
console.log("Monthly payment is $"  + payment)
data.push({MonthlyPay: "$"+payment})
counter = 0
for (let i = 0;i < loanTerm;i++){
    let interest = ((currentLoan * rate)/12).toFixed(2)
    let principal = (payment - interest).toFixed(2)
    counter +=1
    console.log("Month "+ (i+1) + ": Interest: $" + interest + ": Principal: $" + principal + ": Balance: $" + currentLoan.toFixed(2))
    data.push({Month: counter, Interest: "$"+interest, Principal: "$"+principal, Balance: "$"+currentLoan.toFixed(2)})
    currentLoan -= principal;
     
}
    




const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook,workSheet,"AmortizationSchedule")
      //Generate buffer
      XLSX.write(workBook,{bookType:'xlsx', type:"buffer"})

      //Binary string
      XLSX.write(workBook,{bookType:"xlsx", type:"binary"})
  
      XLSX.writeFile(workBook,"Data.xlsx")



    
    

    

  
    
}

convertJsonToExcel()

