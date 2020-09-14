const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = 3001;

function getAmount(price){
    if (!price.toString().includes('.')) {       
        return price
    }
    return parseInt(price.toString().split(".")[0]);
}

function getDecimal(price){
    if (!price.toString().includes('.')) {       
        return 0
    }
    return parseInt(price.toString().split(".")[1].slice(0,2));
}

function mapItemsResult(mlResponseObject) {
  return mlResponseObject.results.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: { 
            currency: product.currency_id, 
            amount: getAmount(product.price),
            decimals: getDecimal(product.price)
        },
        picture: product.thumbnail,
        condition: product.condition,
        free_shipping: product.shipping.free_shipping,
      }
  }).slice(0,4);
}

function mapCategoriesResult(mlResponseObject) {
  if (mlResponseObject.filters.length > 0) {
    return mlResponseObject.filters
      .filter((filter) => filter.id === "category")[0]
      .values[0].path_from_root.map((category) => category.name);
  } else if (mlResponseObject.available_filters.length > 0) {
    return mlResponseObject.available_filters
      .filter((filter) => filter.id === "category")[0]
      .values.map((category) => category.name);
  } else {
    return [];
  }
}

app.get("/api/items", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  req.query; // search query param
  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`)
    .then(async (mlRespomse) => {
      if (!mlRespomse.ok) {
        res.json({ status: mlRespomse.status, error: mlRespomse.statusText });
      }

      const mlResponseObject = await mlRespomse.json();

      if (mlResponseObject.error) {
        res.json({ status: 500, error: "Server error" });
      }

      const responseItemsResult = {
        author: {
          name: "Mailen",
          lastname: "Havela",
        },
        categories: mapCategoriesResult(mlResponseObject),
        items: mapItemsResult(mlResponseObject),
      };

      res.json(responseItemsResult);
    })
    .catch((error) => {
      res.json({ status: 500, error: error.message });
    });  
});

app.get("/api/items/:id", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  Promise.all([
    fetch(`https://api.mercadolibre.com/items/${req.params.id}`),
    fetch(`https://api.mercadolibre.com/items/${req.params.id}/description`),
  ])
    .then(async ([resItem, resdescription]) => {
      const resItemObject = await resItem.json();
      const resdescriptionObject = await resdescription.json();

      if (!resItem.ok) {
        res.json({ status: resItem.status, error: resItem.statusText });
      }

      if (!resdescription.ok) {
        res.json({ status: resdescription.status, error: resdescription.statusText });
      }

      if (resItemObject.error) {
        res.json({ status: 500, error: "Server error" });
      }
      if (resdescriptionObject.error) {
        res.json({ status: 500, error: "Server error" });
      }
       
      const responseItemsResult = {
        author: {
          name: "Mailen",
          lastname: "Havela",
        },
        item: {
          id: resItemObject.id,
          title: resItemObject.title,
          price: { 
              currency: resItemObject.currency_id, 
              amount: getAmount(resItemObject.price),
              decimals: getDecimal(resItemObject.price)
          },
          picture: resItemObject.thumbnail,
          condition: resItemObject.condition,
          free_shipping: resItemObject.shipping.free_shipping,
          sold_quantity: resItemObject.sold_quantity,
          description: resdescriptionObject.plain_text
        }
      };

      res.json(responseItemsResult);
    })
    .catch((error) => {
      res.json({ status: 500, error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
