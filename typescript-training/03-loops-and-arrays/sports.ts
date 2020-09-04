let sportsOne: string[] = ["Golf" , "Cricket", "Tennis", "Swimming"];

console.log("It is for loop")
for (let i=0; i < sportsOne.length; i++) {
    console.log(sportsOne[i]);
}
console.log();


// Let's use the simpled for loop (foreach)
console.log("It is foreach loop")
for (let tempSport of sportsOne) {
    console.log(tempSport);
}