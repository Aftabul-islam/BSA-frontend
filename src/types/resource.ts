export type ResourceCategory = 
  | "Housing"
  | "Jobs"
  | "Healthcare" 
  | "Education"
  | "Immigration"
  | "Legal"
  | "Other";

export interface Resource {
  id: string;
  category: ResourceCategory;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  contacts: {
    phone?: string;
    email?: string;
    website?: string;
  };
  socials?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  createdAt: Date;
}