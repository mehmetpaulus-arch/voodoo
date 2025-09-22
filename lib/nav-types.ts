export interface NavSubItem {
  title: string;
  href: string;
}

export interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  href?: string;
  subItems?: NavSubItem[];
}

export function getSubItems(item: NavItem): NavSubItem[] {
  return Array.isArray(item?.subItems) ? item.subItems : [];
}