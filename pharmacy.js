export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach(drug => {
      if (this.isNormalDrug(drug.name)) {
        if (drug.expiresIn > 0) {
          this.decreased(drug, 1);
        } else {
          this.decreased(drug, 2);
        }
        drug.expiresIn--;

      } else {
        this[`update${drug.name.replace(/ /g, "")}`](drug);
      }
    });

    return this.drugs;
  }

  isNormalDrug(drugName) {
    return !["Herbal Tea", "Magic Pill", "Fervex", "Dafalgan"].includes(drugName);
  }

  between(value, min, max) {
    return value > min && value <= max;
  }

  decreased(drug, coefficient, max = 0) {
    drug.benefit = Math.max(max, drug.benefit - coefficient);
  }

  increased(drug, coefficient, min = 50) {
    drug.benefit = Math.min(min, drug.benefit + coefficient);
  }

  updateFervex(drug, [date_1, date_2, date_3] = [10, 5, 0]) {
    if (drug.expiresIn > date_1) {
      this.increased(drug, 1);
    } else if (this.between(drug.expiresIn, date_2, date_1)) {
      this.increased(drug, 2);
    } else if (this.between(drug.expiresIn, date_3, date_2)) {
      this.increased(drug, 3);
    } else if (drug.expiresIn <= date_3) {
      this.increased(drug, -drug.benefit);
    }
    drug.expiresIn--;
  }

  updateHerbalTea(drug) {
    if (drug.expiresIn > 0) {
      this.increased(drug, 1);
    } else {
      this.increased(drug, 2);
    }
    drug.expiresIn--;
  }

  updateMagicPill() {
    return;
  }

  updateDafalgan(drug) {
    if (drug.expiresIn > 0) {
      this.decreased(drug, 2);
    } else {
      this.decreased(drug, 4);
    }
    drug.expiresIn--;
  }
}
