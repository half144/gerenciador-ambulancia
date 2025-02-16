import {
  Home,
  Ambulance,
  Users,
  Hospital,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  disabled?: boolean;
}

export const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Ambulâncias", href: "/ambulancias", icon: Ambulance },
  { label: "Pacientes", href: "/pacientes", icon: Users, disabled: true },
  { label: "Hospitais", href: "/hospitais", icon: Hospital, disabled: true },
  { label: "Relatórios", href: "/relatorios", icon: FileText, disabled: true },
  { label: "Equipes", href: "/equipes", icon: Users, disabled: true },
];

export const footerNavItems: NavItem[] = [
  { label: "Settings", href: "#", icon: Settings },
  { label: "Help", href: "#", icon: HelpCircle },
];

export const routeMap: Record<string, string> = {
  dashboard: "Dashboard",
  ambulancias: "Ambulâncias",
  pacientes: "Pacientes",
  hospitais: "Hospitais",
  relatorios: "Relatórios",
  equipes: "Equipes",
};
