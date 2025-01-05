// src/models/communication.js
export default class Communication {
    constructor(id, companyId, methodId, date, notes) {
      this.id = id;
      this.companyId = companyId;
      this.methodId = methodId;
      this.date = date;
      this.notes = notes;
    }
  }