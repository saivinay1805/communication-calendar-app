// src/models/communicationMethod.js
export default class CommunicationMethod {
    constructor(id, name, description, sequence, mandatoryFlag) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.sequence = sequence;
      this.mandatoryFlag = mandatoryFlag;
    }
  }