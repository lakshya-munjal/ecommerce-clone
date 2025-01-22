import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { RadioButton, InputWithSearch, ProductCard } from "@/components";

import { useToast } from "@/hooks/use-toast";
import {
  useGetCategoriesQuery,
  useGetProductsListQuery,
  useLazyGetProductsByCategoryQuery,
} from "@/services";

export const Shop = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();
  const {
    data: allProducts,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useGetProductsListQuery();
  const [
    trigger,
    {
      data: productsByCategory,
      isLoading: isProductsByCategoryLoading,
      isFetching: isProductsByCategoryFetching,
      isError: isProductsByCategoryError,
    },
  ] = useLazyGetProductsByCategoryQuery();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const { toast } = useToast();

  const handleTryAgain = () => {
    if (isCategoriesError) refetchCategories();
    if (isProductsError) refetchProducts();
    if (isProductsByCategoryError && selectedCategory)
      trigger(selectedCategory.toLowerCase());
  };

  useEffect(() => {
    if (isCategoriesError || isProductsError || isProductsByCategoryError)
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={handleTryAgain}>
            Try again
          </ToastAction>
        ),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCategoriesError, isProductsError, isProductsByCategoryError]);

  const renderCategorySkeleton = () => {
    return isCategoriesLoading
      ? Array(4)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="w-36 h-5 mb-1" />)
      : null;
  };

  const renderCategories = () => {
    return categories?.map((item, index) => {
      return (
        <RadioButton
          key={index}
          label={item}
          id={`${item}-${index}`}
          isChecked={selectedCategory === item}
          onChange={(e) => {
            setSelectedCategory(e.target.checked ? item : null);
            if (e.target.checked) {
              trigger(item.toLowerCase());
            }
          }}
        />
      );
    });
  };

  const areProductsLoading = () => {
    return (
      isProductsLoading ||
      isProductsByCategoryLoading ||
      isProductsFetching ||
      isProductsByCategoryFetching
    );
  };

  const renderProductsSkeleton = () => {
    return areProductsLoading()
      ? Array(6)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="w-48 h-80" />)
      : null;
  };

  const getProductsList = () => {
    if (areProductsLoading()) return [];

    if (selectedCategory) {
      return productsByCategory;
    } else {
      return allProducts;
    }
  };

  const renderProductsList = () => {
    return getProductsList()?.map((item) => {
      const { id, title, price, image, rating } = item;
      return (
        <ProductCard
          key={id}
          imageUrl={image}
          rating={rating.rate}
          price={price}
          title={title}
        />
      );
    });
  };

  return (
    <div className="flex">
      <div>
        <div className="mb-4">Search</div>
        <InputWithSearch
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-6 mb-4">Categories</div>
        {renderCategorySkeleton()}
        {renderCategories()}
      </div>
      <div className="ml-12">
        <div className="text-center mb-4 text-sm">
          Showing 10 of 100 results
        </div>
        <div className="flex flex-wrap gap-4 justify-evenly">
          {renderProductsSkeleton()}
          {renderProductsList()}
        </div>
      </div>
    </div>
  );
};
