import { Bell, ChevronRight, User, Settings, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { mainNavItems, routeMap } from "../../config/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function TopNav() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Início", href: "/" },
    ...pathSegments.map((segment, index) => ({
      label: routeMap[segment] || segment,
      href: "/" + pathSegments.slice(0, index + 1).join("/"),
    })),
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Nova mensagem",
      message: "Você recebeu uma nova mensagem",
      time: "5min atrás",
      read: false,
    },
    {
      id: 2,
      title: "Atualização do sistema",
      message: "Uma nova versão está disponível",
      time: "1h atrás",
      read: true,
    },
  ];

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-primary text-primary-foreground h-full shadow-sm">
      <div className="flex items-center">
        {/* Breadcrumbs */}
        <div className="hidden sm:flex items-center space-x-2 mr-8">
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-primary-foreground/70 mx-2" />
              )}
              <NavLink
                to={item.href}
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={cn(
                "text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm",
                item.disabled && "pointer-events-none opacity-50"
              )}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-1.5 sm:p-2 hover:bg-primary-foreground/10 rounded-full transition-colors relative"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-[#2F2F33]">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Notificações
              </h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto py-1">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2F2F33] transition-colors",
                    !notification.read && "bg-blue-50 dark:bg-[#2F2F33]"
                  )}
                >
                  <div className="flex flex-col w-full text-left">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 p-1.5 sm:p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-primary-foreground">
                  Usuário
                </p>
                <p className="text-xs text-primary-foreground/70">
                  admin@exemplo.com
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 p-1">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2F2F33] rounded-md flex items-center gap-2 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </button>
            <div className="h-[1px] bg-gray-200 dark:bg-[#2F2F33] my-1" />
            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-[#2F2F33] rounded-md flex items-center gap-2 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
