import type { HttpTypes } from '@medusajs/types';
import InteractiveLink from '@modules/common/components/interactive-link';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import type { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory;
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
}) {
  const pageNumber = page ? Number.parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  if (!(category && countryCode)) notFound();

  const parents = [] as HttpTypes.StoreProductCategory[];

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category);
      getParents(category.parent_category);
    }
  };

  getParents(category);

  return (
    <div
      className="flex flex-col py-6 content-container small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList data-testid="sort-by-container" sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 flex flex-row gap-4 text-2xl-semi">
          {parents &&
            parents.map((parent) => (
              <span className="text-ui-fg-subtle" key={parent.id}>
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  data-testid="sort-by-link"
                  href={`/categories/${parent.handle}`}
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            categoryId={category.id}
            countryCode={countryCode}
            page={pageNumber}
            sortBy={sort}
          />
        </Suspense>
      </div>
    </div>
  );
}
