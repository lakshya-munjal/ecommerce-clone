import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { Checkbox, InputWithSearch, ProductCard } from "@/components";

import { useToast } from "@/hooks/use-toast";
import {
  useGetCategoriesQuery,
  useGetProductsListQuery,
  useLazyGetProductsByCategoryQuery,
} from "@/services";
import { ProductResponse } from "@/services/types";

interface ICheckboxItem {
  label: string;
  isSelected: boolean;
}

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
      isLoading: isProductsByCategoryLoading,
      isFetching: isProductsByCategoryFetching,
      isError: isProductsByCategoryError,
    },
  ] = useLazyGetProductsByCategoryQuery();

  const [selectedCategories, setSelectedCategories] = useState<
    Array<ICheckboxItem>
  >([]);
  const [title, setTitle] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const { toast } = useToast();

  useEffect(() => {
    // populate the checkbox state on initial render
    const initialCheckboxState = categories?.map((item) => ({
      label: item,
      isSelected: false,
    }));
    setSelectedCategories(initialCheckboxState || []);
  }, [categories]);

  const handleTryAgain = () => {
    if (isCategoriesError) refetchCategories();
    if (isProductsError) refetchProducts();
    if (isProductsByCategoryError && selectedCategories) {
      const newProductsList: ProductResponse[] = [];
      selectedCategories.forEach(async (item) => {
        if (item.isSelected) {
          const response = await trigger(item.label.toLowerCase()).unwrap();
          newProductsList.push(...response);
        }
      });
      setFilteredProducts(newProductsList);
    }
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

  const handleCheckboxChange = (label: string) => {
    const list = [...selectedCategories];
    const selectedItem = list.find((item) => item.label === label);

    if (selectedItem) {
      selectedItem.isSelected = !selectedItem.isSelected;
    }
    setSelectedCategories(list);

    const newProductsList: ProductResponse[] = [];
    list.forEach(async (item) => {
      if (item.isSelected) {
        const response = await trigger(item.label.toLowerCase()).unwrap();
        newProductsList.push(...response);
      }
    });
    setFilteredProducts(newProductsList);
  };

  const renderCategories = () => {
    return selectedCategories?.map((item, index) => {
      return (
        <Checkbox
          key={index}
          label={item.label}
          id={`${item.label}-${index}`}
          isChecked={item.isSelected}
          onChange={() => {
            handleCheckboxChange(item.label);
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

    if (filteredProducts?.length) {
      return filteredProducts;
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
        <div className="flex flex-wrap gap-4 justify-evenly">
          {renderProductsSkeleton()}
          {renderProductsList()}
        </div>
      </div>
    </div>
  );
};
