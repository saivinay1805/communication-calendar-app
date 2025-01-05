// src/models/company.model.ts (or .js)
interface Company {
    id: string; // You can use a UUID generator
    name: string;
    location?: string;
    linkedinProfile?: string;
    emails: string[];
    phoneNumbers: string[];
    comments?: string;
    communicationPeriodicity: string; // e.g., "2 weeks"
  }
  
  export default Company;