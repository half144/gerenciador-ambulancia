import { ReactNode } from "react";

interface PageWrapperProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function PageWrapper({ title, children, actions }: PageWrapperProps) {
  return (
    <div className="h-full min-h-0 flex flex-col container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 flex-none">
        <h1 className="text-3xl font-bold">{title}</h1>
        {actions && <div className="flex gap-4">{actions}</div>}
      </div>
      <div className="flex-1 min-h-0 overflow-auto">{children}</div>
    </div>
  );
}
