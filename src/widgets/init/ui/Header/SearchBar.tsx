import { Search } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { Product } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import StarRating from '@/shared/components/StarRating';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@shadcd/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcd/popover';
import { Spinner } from '@shadcd/spinner';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useNavStore } from '../../model';

export default function SearchBar() {
  const productsStore = useProductsStore();
  const navStore = useNavStore();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const search = event.currentTarget.value;
    setProducts([]);

    if (search.length < 3) return;

    clearTimeout(debounceTimeout);
    setSearching(true);

    const products = productsStore.products.all.filter((p) => p.aliName.toLocaleLowerCase().includes(search));

    const timeout = setTimeout(() => {
      setSearching(false);
      setProducts(products);
      if (products.length) {
        setPopoverOpen(true);
      }
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <div className="hidden sm:block">
      <InputGroup>
        <InputGroupInput placeholder="Search..." onInput={onInput} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );

  return (
    <Popover open={popoverOpen} onOpenChange={(open) => !open && setPopoverOpen(false)}>
      <PopoverTrigger className="w-full hidden sm:block">
        <InputGroup>
          <InputGroupInput placeholder="Search..." onInput={onInput} />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {searching ? <Spinner /> : products.length > 0 && <>{products.length} results</>}
          </InputGroupAddon>
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        {products.map((product, idx) => (
          <div key={idx} className="flex gap-2 justify-between" onClick={() => navStore.push(`/product/${product.id}`)}>
            <ImageWithFallback className="h-20 brightness-95 aspect-square rounded-md" src={product.images[0]} />
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2">{product.aliName}</p>
              <div className="flex items-center gap-2">
                <StarRating rating={product.feedback.rating} withLabel />
                <span className="text-muted-foreground">({product.feedback.reviewsCount} reviews)</span>
                <span className="text-muted-foreground">{product.feedback.salesCount} sold</span>
              </div>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
