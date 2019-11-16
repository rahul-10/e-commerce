# e-commerce

Steps to run project:
  1. Clone the project
  2. install dependencies using npm install
  2. change database variables in src/configs/vars.js
  3. Run migrations using "npm run migrate:up"

Apis: 

1. To Get Product/Variant List
  path: /api/list
  ptional query params: search=apple&color=white&storage=128&limit=55&offset=0

2. To Get Variant details
  path: /api/details/:variant_id

3. Internal API (to add variant of a product)
    path : /api/internal/add/variant
    Method: POST
    body when product has variant: { 
      "product_id": product_id,
      "is_varient": true,
      "variant": "variant name",
      "options": [option_id, option_id], // all the option ids of that variant
      "price": "price"
    }
    body when product doesn't have variant: { 
      "product_id": "product_id",
      "is_varient": false,
      "price": "price"
    }