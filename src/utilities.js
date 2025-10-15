import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export function formatCurrency(num, currency = "USD", locale = "en-US") {
  return num.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}

export function formatTitle(path) {
  let fullPath = [];
  let title = "";
  if (path === "/") {
    title = "Dashboard";
    fullPath.push(title);
    return {
      title,
      fullPath,
    };
  }

  let array = path.split("/");
  title = array[1].split("-");
  title = title.map((word) => word.charAt(0).toUpperCase() + word.substring(1));
  title = title.length === 2 ? title[0] + " & " + title[1] : title[0];

  return {
    title,
    fullPath,
  };
}

export function pagination(data, pageNumber, itemsPerPage) {
  if (data) {
    let end = itemsPerPage * pageNumber;
    let start = end - itemsPerPage;
    let pagesNumber = Math.ceil(data.length / itemsPerPage);

    let items = data.slice(start, end);

    return {
      pagesNumber,
      items,
      productsCount,
    };
  }
  if (!data) {
    return {
      pagesNumber: 0,
      items: [],
    };
  }
}

export function productsCount(data) {
  let productsCount = {};
  data.map((item) => {
    if (productsCount[item.type]) {
      productsCount[item.type] = productsCount[item.type] + 1;
    } else {
      productsCount[item.type] = 1;
    }
  });
  return productsCount;
}

export function dataValidation(data) {
  let errors = {};
  if (!data.name) {
    errors.name = "Name is required";
  }
  if (!data.size) {
    errors.size = "Size is required";
  }
  if (!data.color) {
    errors.color = "Color is required";
  }
  if (!data.type) {
    errors.type = "Type is required";
  }
  if (!data.price) {
    errors.price = "Price is required";
  }
  if (!data.QTY) {
    errors.QTY = "QTY is required";
  }
  if (!data.status) {
    errors.status = "Status is required";
  }
  return errors;
}

export function convertObjectToArray(data) {
  return Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
}

export function productsFilter(data, filterProperty) {
  let filteredItems = [];
  const catigory =
    (filterProperty.catigory === "Price" && "product_price") ||
    (filterProperty.catigory === "Size" && "size") ||
    (filterProperty.catigory === "QTY" && "QTY") ||
    (filterProperty.catigory === "Sales" && "product_sales");

  filteredItems = data.filter((item) => {
    if (filterProperty.operator === ">") {
      return Number(item[catigory]) > Number(filterProperty.value);
    } else if (filterProperty.operator === "<") {
      return Number(item[catigory]) < Number(filterProperty.value);
    } else if (filterProperty.operator === "=") {
      return Number(item[catigory]) === Number(filterProperty.value);
    }
  });
  return filteredItems;
}

export function customersFilter(data, filterProperty) {
  let filteredItems = [];
  const catigory =
    (filterProperty.catigory === "Purchases" && "customer_purchases") ||
    (filterProperty.catigory === "Order QTY" && "customer_orders_QTY");

  filteredItems = data.filter((item) => {
    if (filterProperty.operator === ">") {
      return Number(item[catigory]) > Number(filterProperty.value);
    } else if (filterProperty.operator === "<") {
      return Number(item[catigory]) < Number(filterProperty.value);
    } else if (filterProperty.operator === "=") {
      return Number(item[catigory]) === Number(filterProperty.value);
    }
  });
  return filteredItems;
}

export function searchFilter(data, search) {
  let products = data;
  let searchParam = search;
  if (search) {
    products = products.filter((item) => {
      return (
        searchParam !== "" &&
        JSON.stringify(item).toLowerCase().includes(searchParam.toLowerCase())
      );
    });
    return products;
  } else {
    return data;
  }
}

export function getDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // شهور من 0-11
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formatted = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formatted;
}
