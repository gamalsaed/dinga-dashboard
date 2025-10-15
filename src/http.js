// Products API
export async function fetchProducts() {
  try {
    const response = await fetch(
      "https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

export async function fetchProductApi(id) {
  try {
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products/${id}.json`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    if (data === null) {
      throw new Error(
        "Invalid path we cannot find the product you are looking for! "
      );
    }
    return await data;
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

export async function deleteProductApi(id) {
  try {
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products/${id}.json`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      "There was a problem deleting the product: " + error.message
    );
  }
}

export async function addProductApi(product) {
  try {
    const id = product.id;
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [id]: product }),
      }
    );
    return await response.json();
  } catch (error) {
    throw new Error("Error adding product: " + error.message);
  }
}

export async function updateProductApi(product) {
  try {
    const id = product.id;
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [id]: product }),
      }
    );
    return await response.json();
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
}

// Customers API
export async function fetchCustomersApi() {
  try {
    const response = await fetch(
      "https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

export async function fetchCustomerApi(id) {
  try {
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers/${id.toUpperCase()}.json`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch customer");
    }

    const data = await response.json();

    if (data === null) {
      throw new Error("Cannot find the customer you are looking for!");
    }

    return data;
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

export async function addCustomerApi(customer) {
  try {
    const id = customer.id;
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [id]: customer }),
      }
    );
    return await response.json();
  } catch (error) {
    throw new Error(
      "Something went wrong while adding customer: " + error.message
    );
  }
}

export async function updateCustomerApi(customer) {
  try {
    const id = customer.id;
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [id]: customer }),
      }
    );
    return await response.json();
  } catch (error) {
    throw new Error("Error updating customer: " + error.message);
  }
}

export async function deleteCustomerApi(id) {
  try {
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers/${id}.json`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      "There was a problem deleting the product: " + error.message
    );
  }
}

// Transactions API

export async function fetchTransactionsApi() {
  try {
    const response = await fetch(
      "https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Transactions");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

export async function fetchTransactionApi(id) {
  try {
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions/${id}.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Transaction");
    }

    const data = await response.json();
    if (data === null) {
      throw new Error("Cannot find the transaction you are looking for");
    }
    return data;
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

export async function updateTransactionStatus(object) {
  try {
    const response = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions/${object.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: object.status }),
      }
    );

    return await response.json();
  } catch (error) {
    throw new Error("Error updating Transaction's Status: " + error.message);
  }
}

export async function addTransactionApi(transaction) {
  try {
    const transactionId = transaction.id || crypto.randomUUID();
    const isEdit = !!transaction.id;

    let QTY = [];
    let oldData = null;

    // جلب بيانات الفاتورة القديمة لو تعديل
    if (isEdit) {
      const oldResponse = await fetch(
        `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions/${transaction.id}.json`
      );
      oldData = await oldResponse.json();

      if (!oldData || !oldData.transaction_products) {
        console.warn("Old transaction not found. Proceeding as new.");
      }
    }

    // تحضير التغييرات على الكميات والمبيعات
    const newProducts = transaction.transaction_products || [];
    const oldProducts = oldData?.transaction_products || [];

    const allProductIds = new Set([
      ...newProducts.map((p) => p.id),
      ...oldProducts.map((p) => p.id),
    ]);

    allProductIds.forEach((id) => {
      const newItem = newProducts.find((p) => p.id === id);
      const oldItem = oldProducts.find((p) => p.id === id);

      const newCount = Number(newItem?.count || 0);
      const oldCount = Number(oldItem?.count || 0);
      const price = Number(
        newItem?.product_price || oldItem?.product_price || 0
      );

      QTY.push({
        id,
        num: oldCount - newCount,
        price,
        oldCount,
        newCount,
      });
    });

    // تحديث بيانات المنتجات (نتجاهل المنتجات اللي اتحذفت)
    const productUpdates = await Promise.all(
      QTY.map(async (item) => {
        const res = await fetch(
          `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products/${item.id}.json`
        );
        const data = await res.json();

        if (!data) {
          console.warn(`Product with ID ${item.id} not found, skipping...`);
          return null; // تجاهل
        }

        const updatedQty = Number(data?.QTY || 0) + item.num;
        const updatedSales =
          Number(data?.product_sales || 0) +
          (item.newCount - item.oldCount) * item.price;

        return {
          id: item.id,
          update: {
            QTY: updatedQty,
            product_sales: updatedSales,
          },
        };
      })
    );

    // الفلترة علشان نستبعد null
    const validProductUpdates = productUpdates.filter(Boolean);

    const updateProductPromises = validProductUpdates.map((product) =>
      fetch(
        `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products/${product.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product.update),
        }
      )
    );

    // حساب قيمة الفاتورة الجديدة
    const newTotal = newProducts.reduce(
      (sum, p) => sum + Number(p.count) * Number(p.product_price),
      0
    );

    // جلب وتحديث بيانات العميل
    const customerRef = `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers/${transaction.customer_id}.json`;
    const customerRes = await fetch(customerRef);
    const customerData = await customerRes.json();

    let updatedCustomer = {
      customer_orders_QTY: Number(customerData?.customer_orders_QTY || 0),
      customer_purchases: Number(customerData?.customer_purchases || 0),
    };

    if (isEdit && oldData) {
      const oldTotal = oldProducts.reduce(
        (sum, p) => sum + Number(p.count) * Number(p.product_price),
        0
      );
      updatedCustomer.customer_purchases += newTotal - oldTotal;
    } else {
      updatedCustomer.customer_orders_QTY += 1;
      updatedCustomer.customer_purchases += newTotal;
    }

    const updateCustomerPromise = fetch(customerRef, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    });

    // حفظ الفاتورة
    const transactionRef = `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions/${transactionId}.json`;
    const transactionPromise = fetch(transactionRef, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...transaction, id: transactionId }),
    });

    const [transactionResponse, customerResponse, ...productResponses] =
      await Promise.all([
        transactionPromise,
        updateCustomerPromise,
        ...updateProductPromises,
      ]);

    if (
      !transactionResponse.ok ||
      !customerResponse.ok ||
      productResponses.some((res) => !res.ok)
    ) {
      throw new Error("Failed to save transaction or update related data");
    }

    return await transactionResponse.json();
  } catch (error) {
    throw new Error(
      "Something went wrong while saving transaction: " + error.message
    );
  }
}

export async function deleteTransactionApi(id) {
  try {
    // 1. جيب بيانات الفاتورة القديمة
    const oldResponse = await fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions/${id}.json`
    );
    const oldData = await oldResponse.json();

    if (!oldData || !oldData.transaction_products || !oldData.customer_id) {
      throw new Error("Transaction not found or missing critical data");
    }

    const transactionProducts = oldData.transaction_products;
    const customerId = oldData.customer_id;

    // 2. تحديث المنتجات (ترجع الكمية وتخصم من المبيعات)
    const productUpdates = await Promise.all(
      transactionProducts.map(async (item) => {
        const res = await fetch(
          `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products/${item.id}.json`
        );
        const data = await res.json();

        if (!data) {
          console.warn(
            `Product with id ${item.id} not found. Skipping update.`
          );
          return null; // المنتج اتحذف - تجاهله
        }

        const updatedQty = Number(data.QTY || 0) + Number(item.count);
        const productSales = Number(data.product_sales || 0);
        const amountToSubtract =
          Number(item.count) * Number(item.product_price);
        const updatedSales = Math.max(productSales - amountToSubtract, 0);

        return {
          id: item.id,
          update: {
            QTY: updatedQty,
            product_sales: updatedSales,
          },
        };
      })
    );

    const validProductUpdates = productUpdates.filter((p) => p !== null);

    const updateProductPromises = validProductUpdates.map((product) =>
      fetch(
        `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/products/${product.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product.update),
        }
      )
    );

    // 3. تحديث بيانات العميل (لو موجود فقط)
    const customerRef = `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/customers/${customerId}.json`;
    const customerRes = await fetch(customerRef);
    const customerData = await customerRes.json();

    let updateCustomerPromise = Promise.resolve({ ok: true }); // Default dummy promise

    if (customerData !== null) {
      const oldTotal = transactionProducts.reduce(
        (sum, p) => sum + Number(p.count) * Number(p.product_price),
        0
      );

      const updatedCustomer = {
        customer_orders_QTY: Math.max(
          Number(customerData.customer_orders_QTY || 0) - 1,
          0
        ),
        customer_purchases: Math.max(
          Number(customerData.customer_purchases || 0) - oldTotal,
          0
        ),
      };

      updateCustomerPromise = fetch(customerRef, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      });
    } else {
      console.warn("Customer not found. Skipping customer update.");
    }

    // 4. حذف الفاتورة
    const deletePromise = fetch(
      `https://admin-dashboard-bec9a-default-rtdb.firebaseio.com/transactions/${id}.json`,
      { method: "DELETE" }
    );

    const [deleteResponse, customerResponse, ...productResponses] =
      await Promise.all([
        deletePromise,
        updateCustomerPromise,
        ...updateProductPromises,
      ]);

    if (
      !deleteResponse.ok ||
      !customerResponse.ok ||
      productResponses.some((res) => !res.ok)
    ) {
      throw new Error("Failed to delete transaction or update related data");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error(
      "There was a problem deleting the transaction: " + error.message
    );
  }
}
