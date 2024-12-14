export namespace Player {
    export interface Info {
      rating: number;
      user: {
        name: string;
        flair: string;
        title?: string;
        patron?: boolean;
      };
    }
  
    export interface Players {
      white: Info;
      black: Info;
    }
  }