'use client';

import { Sparkles } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useProductsStore } from '@/entities/products';
import ProductCard from '@/entities/products/ui/Card';
import BackChevron from '@/shared/components/BackChevron';
import { useInitStore } from '@/widgets/init';

export default function Page() {
  const initStore = useInitStore();

  const url = useParams().url as [string, string?];
  const page = initStore.getPageConfig(...url);
  const products = useProductsStore((state) => state.products.all);
  const categories = useInitStore((state) => state.subdomain.dProductCategories);

  if (!page?.config) return <></>;

  if (page.config.type === 'catalog') {
    const { ids: categoryIds = [] } = page.config;

    return (
      <>
        <BackChevron title={page.label} muted={page.subLabel} />
        {categoryIds.length > 1 ? (
          <div className="space-y-14">
            {categories
              .filter((c) => categoryIds.includes(c.id))
              .map((c, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="h-5 w-5 m-3" />
                    <div>
                      <h1 className="text-3xl font-bold">{c.title}</h1>
                      <p className="text-muted-foreground">{c.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products
                      .filter((p) => p.categoryIds.includes(c.id))
                      .map((p, idx) => (
                        <ProductCard key={idx} productId={p.id} />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter((p) => {
                if (!categoryIds.length) return true;
                return p.categoryIds.includes(categoryIds[0]);
              })
              .map((p, idx) => (
                <ProductCard key={idx} productId={p.id} />
              ))}
          </div>
        )}
      </>
    );
  }

  return <></>;
}
