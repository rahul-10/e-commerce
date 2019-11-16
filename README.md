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
  path: api/details/:variant_id