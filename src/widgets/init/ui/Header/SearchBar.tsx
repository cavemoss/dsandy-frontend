import { InputGroup, InputGroupAddon, InputGroupInput } from '@shadcd/input-group';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="hidden sm:block w-full">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
