import { FileText, User } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Hub<span className="text-primary">Docs</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/contracts" className="text-gray-700 hover:text-primary font-medium">
              Contratos
            </a>
            <a href="/templates" className="text-gray-700 hover:text-primary font-medium">
              Templates
            </a>
            <a href="/clauses" className="text-gray-700 hover:text-primary font-medium">
              Cláusulas
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}