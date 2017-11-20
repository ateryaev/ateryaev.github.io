var example = 
`\
//HELLO WORLD EXAMPLE

clear()
print("Hello JSRUN!")
name = prompt("Name?")
alert("Hello " + name)

//FOR AND IF EXAMPLE

for(j=0;j<10;j++) {
  x = j*j
  if (j > 4) {
    print(j + " * " + j + " = " + x)
  }
  if (j == 7) {
    break
  }
}

//GUESS NUM EXAMPLE

num1 = random(1,3)
num2 = prompt("Guess Number 1..3")
if (num1 == num2) {
  alert("YOU WIN :)")
} else {
  alert("YOU LOOSE :(")
}
`;

var programms =  
[
`\
//PROGRAMM 00
name = "Sisu"
print("Hello " + name +"!")

`
,

`\
//PROGRAMM 01
name = "Sisu"
print("Hello " + name +"!")

`
,
`\
//PROGRAMM 02
`
,
`\
//PROGRAMM 03
`
,
`\
//PROGRAMM 04
`
,
`\
//PROGRAMM 05
//HELLO WORLD EXAMPLE

clear()
print("Hello JSRUN!")
name = prompt("Name?")
alert("Hello " + name)

//FOR AND IF EXAMPLE

for(j=0;j<10;j++) {
  x = j*j
  if (j > 4) {
    print(j + " * " + j + " = " + x)
  }
  if (j == 7) {
    break
  }
}

//GUESS NUM EXAMPLE

num1 = random(1,3)
num2 = prompt("Guess Number 1..3")
if (num1 == num2) {
  alert("YOU WIN :)")
} else {
  alert("YOU LOOSE :(")
}
`
];