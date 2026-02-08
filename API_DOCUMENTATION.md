## API POSTMAN TESTING


**Base URL**: `http://localhost:8000`

---

## 1. Suppliers

### **GET All Suppliers**
*   **Method**: `GET`
*   **URL**: `{{base_url}}/api/suppliers`
*   **SCREENSHOT** ![get/suppliers](docs/get/suppliers.png)

### **ADD a New Supplier**
*   **Method**: `POST`
*   **URL**: `{{base_url}}/api/suppliers`
*   **Body** (Select `raw` -> `JSON`):
    ```json
    {
      "name": "Green Earth Exports",
      "email": "contact@greenearth.com",
      "country": "India",
      "contact_person": "Ravi Kumar",
      "phone": "+91-9876543210"
    }
    ```
     **SCREENSHOT** ![post/supplier](docs/post/supplier.png)

### **GET Supplier by ID**
*   **Method**: `GET`
*   **URL**: `{{base_url}}/api/suppliers/YOUR_SUPPLIER_ID_HERE`
     **SCREENSHOT** ![get/suppliers_id](docs/get/suppliers_id.png)
   

---

## 2. Products

### **GET All Products**
*   **Method**: `GET`
*   **URL**: `{{base_url}}/api/products`
    **SCREENSHOT** ![get/products](docs/get/products.png)

### **GET Products (With Pagination & Filters)**
*   **Method**: `GET`
*   **URL**: `{{base_url}}/api/products?page=1&limit=3&category=Organic Food`
    **SCREENSHOT** ![get/products_p_c](docs/get/products_p_c.png)

### **ADD a New Product**
*   **Method**: `POST`
*   **URL**: `{{base_url}}/api/products`
*   **Body** (JSON):
    ```json
    {
      "name": "Organic Turmeric Powder",
      "supplier_id": "YOUR_SUPPLIER_ID_HERE",  
      "category": "Organic Food",
      "price": 25,
      "stock_quantity": 100,
      "unit": "kg",
      "certification_status": "Certified",
      "certification_expiry_date": "2026-12-31",
      "description": "High quality organic turmeric sourced from Kerala."
    }
    ```
    **SCREENSHOT** ![post/product](docs/post/product.png)


### **UPDATE field (PUT)**
*   **Method**: `PUT`
*   **URL**: `{{base_url}}/api/products/YOUR_PRODUCT_ID_HERE`
*   **Body** (JSON):
    ```json
    {
      "price": 28,
      "stock_quantity": 95,
      "certification_status": "Pending"
    }
    ```
    **SCREENSHOT** ![put/product](docs/put/update_pr.png)


### **DELETE Product**
*   **Method**: `DELETE`
*   **URL**: `{{base_url}}/api/products/YOUR_PRODUCT_ID_HERE`
    **SCREENSHOT** ![delete/product](docs/delete/del_pr.png)

---

## 3. Analytics (Dashboard)

### **GET Dashboard Summary**
*   **Method**: `GET`
*   **URL**: `{{base_url}}/api/analytics/summary`
    **SCREENSHOT** ![get/dashboard](docs/get/dashboard.png)
