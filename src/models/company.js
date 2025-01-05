// src/models/company.js
export default class Company {
    constructor(id, name, location, linkedinProfile, emails, phoneNumbers, comments, communicationPeriodicity) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.linkedinProfile = linkedinProfile;
      this.emails = emails;
      this.phoneNumbers = phoneNumbers;
      this.comments = comments;
      this.communicationPeriodicity = communicationPeriodicity;
    }
  }