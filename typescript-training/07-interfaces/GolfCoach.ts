import { Coach } from "./Coach";

export class GolfCoach implements Coach {
    
    getDailyWorkout(): string {
        return "Hit 100 bnalls at the gold range";
    }
}