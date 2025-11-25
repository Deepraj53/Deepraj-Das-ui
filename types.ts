export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: number;
  client: string;
  title: string;
  image: string;
  year: string;
  category: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  image?: string;
}