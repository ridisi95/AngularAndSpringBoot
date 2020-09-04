import { CricketCoach } from "./CricketCoach";
import { GolfCoach } from "./GolfCoach";
import { Coach } from "./Coach";


let myCricketCoach = new CricketCoach();
let myGolfCoach = new GolfCoach();

let theCoaches: Coach[] = [myCricketCoach, myGolfCoach];

for( let tempCoach of theCoaches) {
    console.log(tempCoach.getDailyWorkout());
}