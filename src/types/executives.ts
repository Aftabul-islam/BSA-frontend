export interface Executive {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  }
  
  export interface ExecutiveResponse {
    status: 'success' | 'error';
    data: {
      executives: Executive[];
    }
  }