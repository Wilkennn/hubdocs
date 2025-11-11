  // src/components/ui/SearchInput.tsx

  import React from 'react';
  import { Search } from 'lucide-react';

  import { Input, type InputProps } from './Input'; // Assumindo que Input está em './Input'
  import { cn } from '../../lib/utils';

  export type SearchInputProps = InputProps;

  export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, ...props }, ref) => {
      return (
        <div className={cn('relative w-full', className)}>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <Input
            type="search"
            className="pl-10 w-full"
            ref={ref}
            {...props}
          />
        </div>
      );
    }
  );

  SearchInput.displayName = 'SearchInput';