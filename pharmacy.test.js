import { Drug, Pharmacy } from "./pharmacy";
import fs from "fs";

describe("Pharmacy", () => {
  it("should generate same file as output.txt", () => {
    const drugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 5, 40),
      new Drug("Magic Pill", 15, 40)
    ];

    const trial = new Pharmacy(drugs);
    const results = [];

    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
      results.push(JSON.stringify(trial.updateBenefitValue()));
    }

    fs.writeFileSync("test-output.txt", results.join(","));

    expect(fs.readFileSync("output.txt")).toEqual(
      fs.readFileSync("test-output.txt")
    );
  });

  it("should decrease the benefit and expiresIn of Dafalgan", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 20, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 19, 28)]);
  });
});
