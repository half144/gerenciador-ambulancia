import {
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router";
import { useState } from "react";
import { mainNavItems, footerNavItems } from "../../config/navigation";
import { cn } from "../../lib/utils";

const navigationData = [
  {
    category: "Menu",
    items: mainNavItems,
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function NavItem({
    href,
    icon: Icon,
    disabled,
    children,
  }: {
    href: string;
    icon: any;
    disabled?: boolean;
    children: React.ReactNode;
  }) {
    return (
      <NavLink
        to={href}
        onClick={handleNavigation}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        {!isCollapsed && <span className="ml-3">{children}</span>}
      </NavLink>
    );
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] bg-white dark:bg-[#0F0F12] transform transition-all duration-200 ease-in-out
          lg:translate-x-0 lg:static border-r border-gray-200 dark:border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-white dark:bg-[#0F0F12] border border-gray-200 dark:border-[#1F1F23] rounded-full p-1.5 hidden lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
            <div className="mb-8">
              <NavLink to="/" onClick={handleNavigation}>
                <img
                  src="/unimed.png"
                  alt="Unimed Fed"
                  className={`h-11 object-contain ${
                    isCollapsed ? "w-11" : "w-full"
                  }`}
                />
              </NavLink>
            </div>
            <div className="space-y-6">
              {navigationData.map((section, index) => (
                <div key={index}>
                  {!isCollapsed && (
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {section.category}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <NavItem
                        key={itemIndex}
                        href={item.href}
                        icon={item.icon}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </NavItem>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              {footerNavItems.map((item, index) => (
                <NavItem
                  key={index}
                  href={item.href}
                  icon={item.icon}
                  disabled={item.disabled}
                >
                  {item.label}
                </NavItem>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
