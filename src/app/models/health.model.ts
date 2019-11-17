export interface User {
  points: number;
  categories: string[];
}

export interface Category {
  color: string;
  title: string;
}

export interface Activity {
  category: string;
  content: string;
}

export interface Data {
  activities: Activity[];
  points: number;
}
